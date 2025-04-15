var passport = require ('passport')
var mongoose = require('mongoose')
var express = require('express');
var router = express.Router();
const userModel = require('./users')

const localStrategy = require('passport-local')
passport.use(new localStrategy(userModel.authenticate()))



const postsModel = require('./posts')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/feed', function (req, res, next) {
  res.render('feed');
});


router.get("/profile", isLoggedIn, function(req, res, next){
  res.render('profile')
})

router.post("/register", function (req, res, next) {
  const userData = new userModel({
    username: req.body.username,
    // password : req.body.password,
    email: req.body.email,
    fullname: req.body.fullname
  })
  //we can shorten the code by
  // const {username,email,fullname} = req.body;
  // const userData = new userModel({username, email, fullname})

  userModel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile')
      })
    })
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login"
}), function (req, res) { })

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err) }
    res.redirect("/")
  })
})

function isLoggedIn(req,res,next){
   if (req.isAuthenticated()){
    return next()
   }
   res.redirect('/login')
}

// router.get('/createuser', async function (req, res, next) {
//   let createdUser = await userModel.create({
//     username: "Anant",
//     password: "Tirupati",
//     posts: [],
//     email: "anant@gmail.com",
//     fullname: "Anant Tirupati"
//   })
//   console.log("New User is created")
//   res.send(createdUser)
// })

// router.get("/createpost", async function (req, res, next) {
//   let createdPost = await postsModel.create({
//     postText: "First Post",
//     users: new mongoose.Types.ObjectId("67fe1859880b3097d7cbf5e3")
//   });
//   //?
//   let user = await userModel.findOne({ _id: "67fe1859880b3097d7cbf5e3" })
//   user.posts.push(createdPost._id)
//   await user.save()
//   //this will push the post id into the usermodel
//   res.send("Post Created")
// })


// router.get("/alluserposts", async function (req, res, next) {
//   let user = await userModel.findOne({ id_: "" }).populate("posts")
//   //this will populate(display) the posts array with the post data
//   res.send(user)
// })

module.exports = router;
