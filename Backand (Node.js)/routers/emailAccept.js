let {Router} = require(`express`);
let Users = require(`../models/user`);

let router = Router();

//! Подтверждения почьты
router.get(`/:token`, async(req,res)=>{
  
  let check = await Users.findOne({
    emailToken: req.params.token,
    emailTokenExp: {$gt: Date.now()}
  })

  console.log(req.params.token);

  if(check){
    console.log(`Прошли проверку`);

    check.emailAccept = true;
    check.emailToken = undefined;
    check.emailTokenExp = undefined;

    await check.save();

    res.send(JSON.stringify({succes: true}))
    return;
  } else {
    console.log(`Время действия токена истекло или токен не валиден`);
    res.send(JSON.stringify({succes: false}))
    return;
  }


})



module.exports = router;