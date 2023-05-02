let {Router} = require(`express`);
let checkSession = require(`../middleware/checkSession`);
let Posts = require(`../models/miniPosts`);
let User = require(`../models/user`);

let router = Router();

//! Загрузка постов пользователя в личьный кабинет
router.get(`/`, checkSession, async(req,res)=>{
 
  let check = await User.findOne({_id: req.session.user._id}) // Проверка на существования пользователя
  
  if(check){
    let checkPost = await Posts.find({createUserId: req.session.user._id}) // Проверка на наличиия постов у пользователя
    if(checkPost.length == 0){
      console.log(`У пользователя нету постов`);
      res.send(JSON.stringify({success: false}))
    } else {
      res.send(JSON.stringify({success: true, posts: checkPost}))
    }
  }


})

module.exports = router;