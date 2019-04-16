const express = require('express');
var router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Users = require('../models/users');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;



router.use(morgan('dev'));

router.use(session({
    secret: '@l!',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 6000000
    }
}));

router.use(passport.initialize());
router.use(passport.session());






router.use(bodyParser.urlencoded({ 'extended': 'false' }));            // parse application/x-www-form-urlencoded
router.use(bodyParser.json());                                      // parse application/json




passport.use('local-login', new LocalStrategy(function (username, password, done) {

    Users.findOne({username : username}, function (err, users) {
    
        if (err){
            console.log('>>>>>>>>>>>>>>>>>>>>>>err');
            return done(err);
        }
    
        if (!users) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>!user');
            return done(null, false, {})
        }
    
        if (users.password !== password) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>pass');
            return done(null, false, {})
        }
    
        console.log('+++++++++++++++++++++user');
        return done(null, users)
    })
}));

passport.serializeUser(function (users, done) {
    done(null, users.id);
});

passport.deserializeUser(function (id, done) {
    Users.findById(id, function (err, users) {
        done(err, users);
    });
});

function isLogedIn (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.send('نمیتونی بیای');
    }
}

router.get('/login', function(req, res){
    res.render('login')
})

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('login');
  });

router.post('/authentication', passport.authenticate('local-login', {
    failureRedirect: 'coming-soon'
}), function (req, res) {
        console.log(req.body);
        res.render('/dashboard');
});

router.get('/coming-soon', function (req, res) {
    res.send('comming soon')
})


router.get('/dashboard', isLogedIn, function(req,res){
    res.render('dashboard')
})


router.get('/', function (req, res) {
    res.render('login')
})

router.get('/add-user', function(req, res){
    res.render('signup')
  })
  
  router.post('/add-user', function(req, res){
    console.log(req.body);
  
     let fName= req.body.fName;
     let  lName= req.body.lName;
      // age: req.body.age,
     let password=req.body.password;
     let username=req.body.username;
     let createDate =new Date();
  
     let users= new Users ({
      fName : fName,
      lName:lName,
      password : password,
      username: username
  
    })
    users.save(function(err, users){
      if(err){
        res.send(err)
      }
      res.render('myadmin', {fName:fName , createDate:createDate});
    })
  })

module.exports = router;