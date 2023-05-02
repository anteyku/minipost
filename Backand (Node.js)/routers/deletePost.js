let {Router} = require(`express`);
let checkSession = require(`../middleware/checkSession`);
let User = require(`../models/user`);
let Posts = require(`../models/miniPosts`);
let fs = require(`fs`);

let router = Router();

router.get(`/:token`, checkSession, async(req,res)=>{
  let check = await User.findOne({_id: req.session.user._id});
  let posts = await Posts.find({});
  //console.log(req.params.token);

  // Проверка на существования аккаунта пользователя
  if(check){
    
    let check2 = await Posts.findOne({
      _id: req.params.token, // Есть ли пост с запрашиваемым id ?
      createUserId: req.session.user._id // Создан ли пост текущим пользователем ?
    })
    
    // Вторая проверкка на существования поста с таким id и создал ли данный пост текущий пользователь ?
    if(check2){
      // Удаления из базы данных
      await Posts.findByIdAndDelete(req.params.token)
      // Удаления самой картинки
      fs.unlinkSync(check2.srcCover)
      
      res.send(JSON.stringify({success: true}))
    } else {
      res.send(JSON.stringify({success: false}))
    }
  
  } else {
    res.send(JSON.stringify({success: false}))
  }
})

module.exports = router;