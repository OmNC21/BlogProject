//jshint esversion:6

// Express Declarations
const express = require("express");
const app = express();
app.use(express.static("public"));

// Body Parser Declarations
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// EJS Declarations
const ejs = require("ejs");
app.set('view engine', 'ejs');

// Lodash Declarations
const _ = require("lodash");

//Mongoose Declarations
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://OmNC501:webprojects@cluster0.w0b9oii.mongodb.net/blogDB")

// Get data from other js files
const truncate100 = require(__dirname + "/truncate.js")


// Global Variable Declarations
var posts = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const postSchema = {
  name: String,
  stuff: String
}

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  Post.find({})
    .exec()
    .then(postsArray => {
      console.log(postsArray);
      res.render("home", { homeContentEjs: homeStartingContent, posts: postsArray });
    })

})

app.get("/about", (req, res) => {
  res.render("about", { aboutContentEjs: aboutContent });
})

app.get("/contact", (req, res) => {
  res.render("contact", { contactContentEjs: contactContent });
})

app.get("/compose", (req, res) => {
  res.render("compose");
})
app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent
  };

  posts.push(post);
  console.log(posts[posts.length - 1].title);

  const newTitle = posts[posts.length - 1].title;
  const newContent = posts[posts.length - 1].content;

  const newPost = new Post({
    name: newTitle,
    stuff: newContent
  });

  newPost.save()
    .then(newStuff => {
      res.redirect("/")

    })

})

app.get("/posts/:id", (req, res) => {
  // let _requestedTitle = _.lowerCase(req.params.topic);
  let _requestedTitle = req.params.id;


  Post.findOne({ _id: _requestedTitle })
    .exec()
    .then(post => {
      if (post) {
        res.render("post", {
          postTitle: post.name,
          postContent: post.stuff
        });
      }
    })
})















app.listen(3000, function () {
  console.log("Server started on port 3000");
});
