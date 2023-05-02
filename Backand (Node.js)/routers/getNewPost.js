let {Router} = require(`express`);
let Post = require(`../models/miniPosts`);

let router = Router();

//! Отправка самых новых постов на страницу постов
router.get(`/`, async(req,res)=>{

  let Posts = await Post.find({});

  console.log(Posts[0].srcAuthorAvatar)

  res.send(JSON.stringify({posts: Posts}));
  return;
})

module.exports = router;