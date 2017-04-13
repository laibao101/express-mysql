var express = require('express');
var post = require('../mutual/post');
var router = express.Router();

// create
router.post('/posts', function(req, res, next) {
  post.add(req, res, next);
});

// new
router.get('/posts/new', function(req, res, next) {
  res.render('posts_new');
});


// index
router.get('/posts', function(req, res, next) {
    console.log('come in');
  // post.queryAll((req, res, next), function (err, posts) {
  //   if (err) {
  //     posts = [];
  //   }
  //   res.render('post_index', {
  //     title: '文章',
  //     posts: posts
  //   });
  // });
});

module.exports = router;
