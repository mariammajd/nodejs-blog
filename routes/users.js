var express = require('express');
var router = express.Router();
const Users = require('../models/users');
const Article = require('../models/articles');
const Comment = require('../models/comments');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/add-article', function (req, res) {
  res.render('articles')
})

router.post('/add-article', function (req, res) {
  console.log(req.body);
  let users1 = new User({
    username:req.body.username,
    
  })
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    createDate: new Date()
  })

  article.save(function (err, article) {
    if (err) {
      res.send(err)
    }
    res.json(article);
  })
})

router.post('/add-comment', function (req, res) {
  console.log(req.body);
  let comment = new Comment({
    comment: req.body.comment,
    article: req.body.article,
    createDate: new Date()
  })

  comment.save(function (err, comment) {
    if (err) {
      res.send(err)
    }
    res.json(comment);
  })
})

// router.get('/result', function(req, res){
//   Article.find({author: 'alavi'}, function(err, articles){
//     if(err) 
//       res.send(err)
      
//     let result = [];

//       articles.forEach(function(article, index){
//         Comment.find({article: article.title}, function(err, comments){
//           if (err)
//             res.send(err)
          
//           comments.forEach(function(comment){
//             result.push(comment)
//           })
//           // res.json(result)
//           if(index === articles.length-1){
//             res.json(result)
//           }
//         })
//       })
//   })
// })
router.get('/findmohammad',function(req,res){
  Article.find({author: "mohammad"}, function(err, articles) {
    if (err) throw err;
  
    // object of all the users
    console.log(articles);
    res.json(articles)
  });
})



module.exports = router;





















