const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const download = require('image-downloader');
const Booking = require("./Models/Booking")
const User = require("./Models/User");
const Place = require("./Models/PlaceModel");
const multer = require('multer');
const fs = require('fs');


const cookieParser = require('cookie-parser');



app.use(express.json());


app.use('/uploads', express.static(__dirname+'/uploads'));


app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173' 
}));


// markaa cockie isticmaalyso ubaahnthay 
app.use(cookieParser());


// tdtabase connection 

mongoose.connect("mongodb+srv://abdrhmaanyre:OaWZMvVJFB24tALJ@cluster0.o6w7dqv.mongodb.net/?retryWrites=true&w=majority")
.then((res) => {
  console.log("connexted")
})
.catch((e) => 
console.log(e))





// registar
app.post('/api/register', async (req,res) => {

  const {name,email,password} = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password:bcrypt.hashSync(password, 10),
    });

    res.json(userDoc)
  } catch (e) {
    res.status(422).json(e);
  }

});


// login
app.post('/api/login', async (req,res) => {
  const {email,password} = req.body;
  const userDoc = await User.findOne({email});

  if  (userDoc) {
    const passOk = bcrypt.compare(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email:userDoc.email,
        id:userDoc._id,
        name : userDoc.name
      }, 'jwtSecret', {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      
      });
     
    } else {
      res.status(422).json(userDoc);
    }
  } else {
    res.json('not found');
  }
});


// hubi user inu login yhaya

app.get('/api/profile', (req,res) => {

  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, 'jwtSecret', {}, async (err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  } else {
    res.json(null);
  }
});



// logout 
app.post('/api/logout', (req,res) => {
  res.cookie('token', '').json(true);
});





// upload image downloader from node js express 

app.post('/api/upload-by-link', async (req,res) => {
  const {link} = req.body;

  const newName = "photo" + Date.now() + '.jpg';
  
  await download.image({
    url: link,
    dest: __dirname  + "/uploads/" + newName,
  });


  res.json(newName);


});



// middlwre from multer


const photosMiddleware = multer({dest:'/uploads'});


 // upload photo

app.post('/uploads', photosMiddleware.array('photos', 100), async (req,res) => {
 
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path,originalname} = req.files[i];
  const parts =  originalname.split("-")
  const ext  = parts[parts.length -1]
  const newPath = path + "-" + ext
  fs.renameSync(path ,newPath)
  uploadedFiles.push(newPath.replace('uploads/', ""));
  }
  res.json(uploadedFiles);
  console.log (uploadedFiles);
});



 // plced pots


 app.post('/api/places', (req,res) => {
 
  const {token} = req.cookies;
  const {
    title,address,addedPhotos,description,price,
    perks,extraInfo,checkIn,checkOut,maxGuests,
  } = req.body;
  jwt.verify(token, "jwtSecret", {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner:userData.id,price,
      title,address,photos:addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,
    });
    res.json(placeDoc);
  });
});



app.get('/api/user-places', (req,res) => {

  const {token} = req.cookies;
  jwt.verify(token, "jwtSecret", {}, async (err, userData) => {
    const {id} = userData;
    res.json( await Place.find({owner:id}) );
  });
});




app.get('/api/places/:id', async (req,res) => {
 
  const {id} = req.params;
  res.json(await Place.findById(id));
});



app.put('/api/places', async (req,res) => {

  const {token} = req.cookies;

  const {
    id, title,address,addedPhotos,description,
    perks,extraInfo,checkIn,checkOut,maxGuests,price,
  } = req.body;

  jwt.verify(token, "jwtSecret", {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);

    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,address,photos:addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,price,
      });
      await placeDoc.save();
      res.json('ok');
    }
  });
});


app.get('/api/places', async (req,res) => {
 
  res.json( await Place.find() );
});





app.post('/api/bookings', async (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, "jwtSecret", {}, async (err, userData) => {

  const {
    place,checkIn,checkOut,numberOfGuests,name,phone,price,
  } = req.body;
  Booking.create({
    place,checkIn,checkOut,numberOfGuests,name,phone,price,
    user:userData.id,
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
})
});




 // user booking ---
app.get('/api/bookings', async (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, "jwtSecret", {}, async (err, userData) =>{

  
  res.json( await Booking.find({user:userData.id}).populate('place') );
});
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
