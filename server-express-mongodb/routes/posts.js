var express = require("express");
var router = express.Router();
var PostModel = require("../models/posts.model");
const requireLogin = require('../middleware/requireLogIn');

// get all post 
router.get('/posts', requireLogin, async (req, res) => {
  try{
 const posts = await PostModel.find().sort({date:'descending'})
 res.status(200).json(posts)
  }
  catch(err){
    res.status(400).json({"Error": err})
  }

})

router.post('/createpost', requireLogin, (req, res) => {
  const { content, title, picture, date, postedBy,video } = req.body
  if (!content || !title) {
    return res.status(422).json({ error: "Plase add all the fields" })
  }

  const post = new PostModel({
    title,
    content,
    picture,
    video,
    date,
    postedBy
  })
  post.save().then(result => {
    res.json({ post: result })
  })
    .catch(err => {
      console.log(err)
    })
})


router.put('/like', requireLogin, (req, res) => {
  PostModel.findByIdAndUpdate(req.body.postId, {
    $push: { likes: req.body.likedBy}
  }, {
    new: true
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    } else {
      res.json(result)
    }
  })
})

router.put('/unlike', requireLogin, (req, res) => {
  PostModel.findByIdAndUpdate(req.body.postId, {
    $pull: { likes: req.body.likedBy}
  }, {
    new: true
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    } else {
      res.json(result)
    }
  })
})


router.delete('/:id', requireLogin, (req, res) => {
  PostModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.put("/editpost", requireLogin, async (req, res) => {
  try{
  const post = await PostModel.findByIdAndUpdate(req.body.postId,
    {
      title: req.body.title,
      content: req.body.content,
      picture: req.body.picture,
      video:req.body.video,
      date: req.body.date
    },
    { new: true })
    res.status(200).json({post})
  }catch(err){
     res.status(400).send(err);
      
    }
});


router.put('/comment', requireLogin, async (req, res) => {
  try {
    const comment = {
      text: req.body.comment,
      postedBy: req.body.postedBy
    }
    const newComment = await PostModel.findByIdAndUpdate(req.body.postId, {
      $push: { comments: comment }
    }, { new: true })
    const comments = await PostModel.findById(newComment._id)
    res.status(200).json(comments)
    
  } catch (err) {
    return res.status(422).json({ error: err })
  }
})

router.put('/deleteComment', requireLogin, async (req, res) => {
  try {
    
    const newComment = await PostModel.findByIdAndUpdate(req.body.postId, {
      $pull: { comments: {_id: req.body.commentId }}
    }, { new: true })
    const comments = await PostModel.findById(newComment._id)
    res.status(200).json(comments)
    
  } catch (err) {
    return res.status(422).json({ error: err })
  }
})

module.exports = router;
