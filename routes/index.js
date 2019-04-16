var express = require('express');
const multer = require("multer");
const fs = require('fs');
const Articles = require ('../models/articles');
var router = express.Router();

const upload = multer({
  dest: process.cwd() + "/public/images"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/form', function(req, res){
  // console.log(process.cwd())
  res.render('form');
})

router.post('/get-form', upload.single("file"), function (req, res) {
  console.log(req.body);
  console.log(req.file);
  fs.rename(req.file.path, req.file.destination + "/" + req.file.originalname, function(err){
    if(err)
      res.send(err)
  })
  res.send('i got your form')
})
router.post('/users/add-article' , function(req,res){
  const postBody = req.body;
  console.log(postBody);
  let title = postBody.title;
  let description = postBody.description;
  let author = postBody.author;
  
  let articles= new Articles ({
    title : title,
    description:description,
    author : author,

  })
  articles.save(function(err,articles){
    if (err)
       return console.log (err)//vaghty faghat if migzarim va bedoone {} faghaaat va faghat khat paiin ro mikhonad
       res.render('posts', {title:title, description:description, author:author});
     
});

});
module.exports = router;
