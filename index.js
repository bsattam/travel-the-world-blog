const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const multer = require('multer');
const path = require('path'); 
const fs = require('fs');
const { uploadFile, getFileStream } = require('./s3.js');

dotenv.config();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, "/images")));


mongoose.connect(
   process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        //useFindAndModify: true,
        //useCreateIndex: true
    }
).then(console.log('connected to mongodb atlas')).catch(err => console.log(err));

/*
const storage = multer.diskStorage({
    destination: (req, file, callback) =>{          // callback handles the errors
        callback(null, "images")
    }, 
    filename: (req, file, callback) => {
        console.log(req.body.name);
        callback(null, req.body.name)
    }
})

console.log(storage);
/*
const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res)=> {
    res.status(200).json("file has been uploaded");
})
*/

const upload = multer({dest: 'images/'});

app.post('/api/upload', upload.single('file'), async (req, res)=>{
    const file = req.file;
    const result = await uploadFile(file);
    res.send(result);
})

app.get('/api/image/:key', (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    console.log(readStream);

    readStream.pipe(res);
})


app.post("/api/deleteOldImage", async (req, res)=> {
    try{
        const img = req.body.oldImage;
        if (img)
            fs.unlinkSync(path.join(__dirname, "/images/") + img);
        res.status(200).json(req.body);
    }catch(err){
        console.log(err);
    }
    
})

app.use('/api/auth', authRoute); 
app.use('/api/users', usersRoute); 
app.use('/api/posts', postsRoute); 
app.use('/api/categories', categoryRoute);


// serve static assets if we are in production
if (process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.port || 5050;

app.listen(port, () => {
    console.log("server is running on port 5050");
})