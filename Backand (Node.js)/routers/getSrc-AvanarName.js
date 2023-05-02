let {Router} = require(`express`);

let Users = require(`../models/user`)

let router = Router();

//! Отправка ссылки на картинку пользователя
router.get(`/:token`, async(req,res)=>{
  
  let NeedSec = await Users.findOne({_id: req.params.token});
  res.send(JSON.stringify({avatarKek: NeedSec}))

})

module.exports = router;