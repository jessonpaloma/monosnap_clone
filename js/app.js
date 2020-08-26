(
  function() {
      "use strict";
      require('dotenv/config')

      const AWS = require('aws-sdk')
      const { v4: uuid } = require('uuid')
      //const uuid = require('uuid/v4')
      const fs = require('fs')
      const express =   require("express");
      const multer  =   require('multer');
      const app     =   express();
      
      const S3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      })
      
      const storage =   multer.memoryStorage({
        destination: function (req, file, callback) {
          callback(null, '');
        }
      });
      
      const upload = multer({storage}).single('file');
      
      app.get('/',function(req,res){
        res.sendFile(__dirname + "/upload.html");
      });
      
      app.post('/upload', upload, (req, res) => {
      
        let monoFile = req.file.originalname.split(".")
        const fileType = monoFile[monoFile.length -1]
      
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${uuid()}.${fileType}`,
          Body: req.file.buffer
        }
      
        S3.upload(params, (error, data)=> {
          if (error) {
            res.status(500).send(error)
          }
      
          /*res.status(200).send(data)*/
          
          res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Upload Sucess</title>
        <style> body { background-color: #2a333c; color: white; 
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; }  
        </style></head>
        <body><center><br><h1 style="color:darkorange; -webkit-app-region:drag;}">UPLOAD SUCCESS</h1>
        <buttton id="done" style="background-color: rgb(51, 47, 47);
        border-radius: 10px;
        box-shadow: black;
        color: white;
        padding: 7px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;"> &nbsp RETURN &nbsp </button></center>
        <script> 
        const done = document.getElementById('done')
        done.addEventListener('click', function(){
          const { remote } = require('electron')
          var window = remote.getCurrentWindow()
          window.close()
        })
        </script></body></html>
        `)
        })
      })
      
      app.listen(3000,function(){
          console.log("Working on port 3000");
      });        

  }()
);