var express = require('express');
var router = express.Router();
var Post=require('../model/Post');
var User=require('../model/User');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('posts/index', { title: 'Posting' });
// });
router.get('/postadd',function(req,res,next){
  User.find(function(err,rtn){
    if(err) throw err;
    res.render('posts/post_add',{users:rtn});
  })
  // res.render('posts/post_add',{p:'Morning John Gyi'});

});
router.get('/posthome',function(req,res,next){
  res.render('posts/post_home',{p:'John Gyi'});
});

router.post('/postadd',function(req,res,next){
  // res.send("cena");
  var pos=new Post();
  pos.title=req.body.title;
  pos.content=req.body.content;
  pos.author=req.body.author;

  pos.save(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/');

  });
});

router.get('/postlist',function(req,res,next){
  Post.find({}).populate('author').exec(function(err,rtn){
    if(err) throw err;
    console.log('callll',rtn);
    res.render('posts/post_list',{posting:rtn});
  });
});

router.get('/postdetail/:pid',function(req,res,next){
  Post.findById(req.params.pid).populate('author').exec(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
        res.render('posts/post_detail',{postDetail:rtn});
  });
});

router.get('/postupdate/:UpId',function(req,res,next){

  Post.findById(req.params.UpId,function(err,rtn){
    if(err) throw err;
    User.find(function(err2,rtn2){
      if(err2) throw err2;
      console.log(rtn2);
      res.render('posts/post_update',{postupd:rtn,users:rtn2});

    })    // console.log(rtn);
  });
});

router.post('/postupdate',function(req,res,next){

  var update={
    title:req.body.title,
    content:req.body.content,
    author:req.body.author
  };
  Post.findByIdAndUpdate(req.body.id,{$set:update},function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/posts/postlist');
  });
});

router.get('/postdelete/:delId',function(req,res,next){
  Post.findByIdAndRemove(req.params.delId,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/posts/postlist');
  });
});
module.exports = router;
