var express = require('express');
var router = express.Router();
var bcrypt=require('bcryptjs');
var User=require('../../model/User');
var Post=require('../../model/Post');
var checkAuth=require('../middleware/check-auth');

router.get('/list',checkAuth,function(req,res){
  Post.find(function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(200).json({
        posts:rtn
      })
    }
  })
})

router.post('/add',function(req,res){
  var post=new Post();
  post.title=req.body.title;
  post.content=req.body.content;
  post.author=req.body.author;

  post.save(function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(201).json({
        message:"Post Account Created",
        posts:rtn

      })
    }
  })
})
router.get('/:id',function(req,res){
Post.findById(req.params.id,function(err,rtn){
  if(err){
    res.status(500).json({
      message:"Internal Server Error",
      error:err
    })
  }else {
    res.status(200).json({
      posts:rtn
    })
  }
})
})

router.patch('/:id',function(req,res){
  var update={};
  for(var p of req.body){
    update[p.proName]=p.proValue
  }
  console.log(update);

  Post.findByIdAndUpdate(req.params.id,{$set:update},function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(200).json({
        message:"Post Upadated"
      })
    }
  })
})

router.delete('/:id',function(req,res){
  Post.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err

      })
    }else {
      res.status(200).json({
        message:"Post Deleted"
      })
    }
  })
})

module.exports=router;
