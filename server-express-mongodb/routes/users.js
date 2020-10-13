const express = require('express');
const router = express.Router();
const UserModel = require('../models/users.model');
const requireLogin = require('../middleware/requireLogIn');

//FETCH all other users excludes who is logged in
router.post("/community", requireLogin, function (req, res, next) {
  UserModel.find({_id:{$ne:req.body._id}}).select('username _id email following followers picture')
    .then(users => res.json(users))
});


// FETCH user and posts by user
router.get('/user', requireLogin, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select('-password');
    if (!user) throw Error('User does not exist');
    const members = await UserModel.find({_id:{$ne:user._id}}).select('-password')
    res.status(200).json({user, members});
  } catch (e) {
    res.status(400).json({ error: e});
  }
});
     
// DELETE user by id sent in body of request
router.delete("/delete",requireLogin,(req, res, next) => {
    UserModel.findByIdAndRemove(req.body._id)
      .then(users => {
        res.json(users)
        console.log('user successfully deleted')
      });
});


//GET member by params id
router.get('/user/:id', requireLogin, async (req, res) => {
  try{
  const memberProfile = await UserModel.findById(req.params.id).select('-password')
  res.status(200).json({memberProfile})
  }catch(err) {
      return res.status(422).json({ error: err })
  }
});

// UPDATE user following and member followers 
router.put('/follow', requireLogin, async (req, res) => {
  const {followId, _id} = req.body.followIds;
  try{
    const followed= await UserModel.findByIdAndUpdate(followId, {
      $push: { followers: _id}}, {new: true}
    );
    const user = await UserModel.findByIdAndUpdate(_id, {
        $push: { following: followId }}, { new: true }
    );
    res.status(200).json({  
        followed,
        user
      });
  } catch(err) {
      return res.status(422).json({ error: err })
  }
})


// UPDATE user profile detials
router.put("/updateprofile",requireLogin, function (req, res, next) {
  UserModel.findByIdAndUpdate(
    req.body._id,
    { 
      picture: req.body.picture,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      aboutme: req.body.aboutme,
      categories: req.body.categories,
      location: req.body.location
    },
    { new: true },
    (err, user) => {
      if (err) return res.status(400).send(err);
      res.send(user);
    }
  );
});
// UPDATE unfollowers and unfollowing
router.put('/unfollow',requireLogin, async (req,res)=>{
  const{unfollowId, _id} = req.body.unfollowIds
  try{
    const unfollowed = await UserModel.findByIdAndUpdate(unfollowId,{
          $pull:{followers:_id}},{ new:true});
    const user = await UserModel.findByIdAndUpdate(_id,{
          $pull:{following: unfollowId}},{new:true}).select("-password");
    res.status(200).json({  
        unfollowed,
          user
    });  
  } catch(err) {
    return res.status(422).json({ error: err })
  }
})

module.exports = router;
