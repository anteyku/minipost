let {Router} = require(`express`);
let {validationResult} = require(`express-validator/check`);
let {authUser} = require(`../utils/validator`);
let User = require(`../models/user`);
// Шифрования пароля
let bcrypt = require(`bcrypt`);

let router = Router();

//! Авторизация пользователя
router.post(`/`, authUser, async(req,res)=>{
  // Запускаем валидацию полей отправленые клиентом
  let errors = validationResult(req);

  // Проверка на пройденую валидацию
  if(!errors.isEmpty()){
    res.send(JSON.stringify({succes: false}))
    console.log(errors.array()[0].msg);
    return;
  }

  let check = await User.findOne({email: req.body.email})  
  // 1. Проверка существования email
  if(check){
    
    let check2 = await bcrypt.compare(req.body.password, check.password);
    // 2. Проверка правельного пароля
    if(check2){
      // Проверка на подтвержденный email
      if(check.emailAccept){
        req.session.accept = true;
        req.session.user = check;
        await req.session.save();
        console.log(`ВЫ ПРОШЛИ ТРЕХ ЕТАПНУЮ ПРОВЕРКУ`);
        res.send(JSON.stringify({succes: true}));
        return;
      } else {
        console.log(`Почта не подтверждена`)
        res.send(JSON.stringify({succes: false}));
        return;
      }

    } else {
      console.log(`Не верный пароль к аккаунту`);
      res.send(JSON.stringify({succes: false}));
      return;
    }

  } else {
    res.send(JSON.stringify({succes: false}));
    console.log(`Акккаунта не существует`);
  }

 
  res.send(JSON.stringify(`Парампапа`))
})

module.exports = router;