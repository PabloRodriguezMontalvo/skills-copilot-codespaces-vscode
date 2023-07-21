// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');
var User = require('../models/user');
var mongoose = require('mongoose');

// Create a new comment
router.post('/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment) {
    if (err) { return next(err); }
    res.json(comment);
  });
});

// Get all comments
router.get('/comments', function(req, res, next) {
  Comment.find(function(err, comments) {
    if (err) { return next(err); }
    res.json(comments);
  });
});

// Get a comment by ID
router.get('/comments/:comment', function(req, res) {
  res.json(req.comment);
});

// Get a comment by ID
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment) {
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }
    req.comment = comment;
    return next();
  });
});

// Update a comment by ID
router.put('/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

// Update a comment by ID
router.put('/comments/:comment/downvote', function(req, res, next) {
  req.comment.downvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

// Delete a comment by ID
router.delete('/comments/:comment', function(req, res) {
  req.comment.remove();
  res.sendStatus(200);
});

module.exports = router;