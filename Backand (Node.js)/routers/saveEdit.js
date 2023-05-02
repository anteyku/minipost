let { Router } = require(`express`);
let {validationResult} = require(`express-validator/check`);
let {description} = require(`../utils/validator`);
let Users = require(`../models/user`);
let checkSession = require(`../middleware/checkSession`);
let {age} = require(`../utils/validator`);
let {password} = require(`../utils/validator`);
let bcrypt = require(`bcrypt`);

let router = Router();

//! Редактирования описания пользователя
router.post(`/description`, checkSession, description, async(req,res)=>{
  // Запускаем валидацию полей отправленые клиентом
  let errors = validationResult(req);

  // Проверка на пройденую валидацию
  if(!errors.isEmpty()){
    res.send(JSON.stringify({succes: false, text: errors.array()[0].msg}))
    console.log(errors.array()[0].msg);
    return;
  }

  // Проверка на существования аккаунта
  let check = await Users.findOne({email: req.session.user.email});

  if(check){
    try {
      check.description = req.body.description;
      await check.save()
      .then((s)=>{
        console.log(s);
      })   
      req.session.user = check;
      await  req.session.save();
      res.send(JSON.stringify({succes: true}))
    } catch (error) {
      console.log(`Чтото пошло не так... повторите попытку`);
    }

  } else {
    console.log(`Пользователь не авторизован или аккаунт с таким email не существует.`)
  }
 
})

//! Редактирования возраста пользователя
router.post(`/age`, age, async(req,res)=>{
  // Запускаем валидацию полей отправленые клиентом
  let errors = validationResult(req);

  // Проверка на пройденую валидацию
  if(!errors.isEmpty()){
    res.send(JSON.stringify({succes: false, text: errors.array()[0].msg}))
    console.log(errors.array()[0].msg);
    return;
  }

  // Проверка на существования аккаунта
  let check = await Users.findOne({email: req.session.user.email});

  if(check){
    try {
      check.age = req.body.age;
      await check.save()
      .then((s)=>{
        console.log(s);
      })   
      req.session.user = check;
      await  req.session.save();
      res.send(JSON.stringify({succes: true}))
    } catch (error) {
      console.log(`Чтото пошло не так... повторите попытку`);
    }

  } else {
    console.log(`Пользователь не авторизован или аккаунт с таким email не существует.`)
  }
})

//! Редактирования password пользователя
router.post(`/password`, checkSession, password, async(req,res)=>{
    // Запускаем валидацию полей отправленые клиентом
    let errors = validationResult(req);

    // Проверка на пройденую валидацию
    if(!errors.isEmpty()){
      res.send(JSON.stringify({succes: false, text: errors.array()[0].msg}))
      console.log(errors.array()[0].msg);
      return;
    }

    let check = await Users.findOne({email: req.session.user.email});

    if(check){
      check.password = await bcrypt.hash(req.body.password, 10);
      await check.save();
      res.send(JSON.stringify({succes: true}))
    } else {
      res.send(JSON.stringify({succes: false, text: `Упс.. чтото пошло не так`}))
    }
})

module.exports = router;