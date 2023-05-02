let {Router} = require(`express`);
let Post = require(`../models/miniPosts`);

let router = Router();

//! Отправка информации о посте
router.get(`/:token`, async(req,res)=>{

    let check2 = await Post.findOne({
      _id: req.params.token
    })

  

    // Проверка наличия поста с таким токен и проверка на совпадения текущего id аккаунта с создавшим его пользователем
    if(check2){
      res.send(JSON.stringify({success: true, post: check2}))
    } else {
      res.send(JSON.stringify({success: false}))
    }

 

})

module.exports = router;