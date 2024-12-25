const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require ('../models/user');
const catchAsync = require('../utils/CatchAsync'); // Adjust the path as necessary
const passport = require('passport');
const { storeReturnTo } = require('../middleware');


router.get('/register' , (req ,res)=>{
 res.render('users/register');
})


router.post('/register' , catchAsync(async(req ,res)=>{
  try{
 const { email ,username, password} = req.body;
 const user = new User({email , username });
 const registerUser = await User.register(user , password);
 req.login(registerUser , err => {
  if(err) return next(err);
 req.flash('success' , 'welcome to the app');
 res.redirect('/campgrounds');
  })
}
  catch(e){
    req.flash('error',e.message);
    res.redirect('register');
  }
}));


router.get('/login', (req, res) => {
    res.render('users/login'); // Ensure you have a login view
});

router.post('/login',storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success' , 'welcome back to the app');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
})



router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
      if (err) {
          return next(err);
      }
      req.flash('success', 'Goodbye!');
      res.redirect('/campgrounds');
  });
}); 


module.exports = router;