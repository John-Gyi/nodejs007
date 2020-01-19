var express = require('express');
var router = express.Router();
var bcrypt=require('bcryptjs');
var User=require('../model/User');
var Post=require('../model/Post');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/user_add',function(req,res,next){
  res.render('user/user_add',{p:'Morning Clever Developer'});
});
router.post('/user_add',function(req,res,next){
  // res.send("Calling");
  var user=new User();
  user.name=req.body.name;
  user.email=req.body.email;
  user.password=req.body.password;
  user.save(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/');
  })

  // res.send(req.body.name);
});

router.get('/user-list',function(req,res,next){
  User.find(function(err,rtn){
    if (err) throw err;
    console.log(rtn);
    res.render('user/user-list',{users:rtn});
  });
});

router.get('/userdetail/:id',function(req,res,next){
  console.log(req.params.id);
  User.findById(req.params.id,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    Post.find({author:req.params.id},function(err2,rtn2){
      if(err2) throw err2;
      res.render('user/user-detail',{user:rtn,post:rtn2});
    })

  });
});

router.get('/userupdate/:uid',function(req,res,next){
  User.findById(req.params.uid,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('user/user_update',{user:rtn});
  });
});

router.post('/userupdate',function(req,res,next){
  var update={
    name:req.body.name,
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8),null)
  };
  User.findByIdAndUpdate(req.body.id,{$set:update},function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/user-list');
  });
});
router.get('/userdelete/:id',function(req,res,next){
  User.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err) throw err;
    res.redirect('/users/user-list');
  });
});
router.post('/duemail',function(req,res){
  User.findOne({email:req.body.email1},function(err,rtn){
    if(err) throw err;
    // if(rtn==null){
    //   res.json({status:false})
    // }else {
    //   res.json({status:true})
    // }
    (rtn ==null)? res.json({status:false}):res.json({status:true});

  })
})

module.exports = router;
