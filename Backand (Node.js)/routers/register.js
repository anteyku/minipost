let {Router} = require(`express`);
// Модель пользователя
let User = require(`../models/user`);
// Шифрования пароля
let bcrypt = require(`bcrypt`);
let {validationResult} = require(`express-validator/check`);
let {regUser} = require(`../utils/validator`);
let nodemailer = require(`nodemailer`);
// Встроенная библиотека node.js для генерации ключей
let crypto = require(`crypto`);
let Email = require(`../emails/acceptEmail`);



// Настраиваем почту с которой отправлять будем письмо
let transporter = nodemailer.createTransport({
  service: `gmail`,
  auth: {
    user: `1nonamehack@gmail.com`,
    pass: `zjbrdckxwpgpevsa`
  }
})

let router = Router();

//! Регистрация пользователя
router.post(`/`, regUser, async (req,res)=>{

  // Запускаем валидацию полей отправленые клиентом
  let errors = validationResult(req);

  // Проверка на пройденую валидацию
  if(!errors.isEmpty()){
    res.send(JSON.stringify({succes: false}))
    console.log(errors.array()[0].msg);
    return;
  }

  let check = await User.findOne({email: req.body.email});

  // Проверка на существования такого аккаунта
  if(!check){

    // Шифрования пароля
    req.body.password = await bcrypt.hash(req.body.password, 10);

    await new User({
      login: req.body.login,
      password: req.body.password,
      age: req.body.Age,
      email: req.body.email,
      description: req.body.description,
      emailAccept: false
    })
    .save()
    .then((s)=>{
      console.log(s);
    })

    
    check = await User.findOne({email: req.body.email});

        // Генерирую токен и отправляю на почту
        crypto.randomBytes(32, async (err, buffer) => {
          if (err) {
              console.log(err);
          } else {

              let token = buffer.toString(`hex`);
           
              check.emailToken = token;
              check.emailTokenExp = Date.now() + 60 * 60 * 1000;

              await check.save();

              // Нам необходимо сгенерировать пароль на основе двух параметров
              await transporter.sendMail(Email(req.body.email, token));
          }
      })
      
    
    

    res.send(JSON.stringify({succes: true}))
    return;
  } else {
    console.log(`Аккаунт с таким Email уже существует`);
    return;
  }


})

module.exports = router;