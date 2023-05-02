let { body } = require(`express-validator/check`);
let User = require(`../models/user`);

// Регистрация пользователя
exports.regUser = [
  body(`login`, `Минимальная длинна логина 6 символов, макс 12`)
  .isLength({min: 6, max: 12})
  .isAlphanumeric()
  .trim(),
  body(`password`, `Пароль должен содержат минимум 6 символов, макс 60`)
  .isLength({min: 6, max: 32})
  .isAlphanumeric()
  .trim(),
  body(`Age`, `Минимальный возраст 14 лет, максимальный - 110`)
  .isInt({min: 14, max: 110}),
  body(`email`, `Email указан не верно`)
  .normalizeEmail()
  .isEmail()
  .custom(async (value, {req})=>{

    let check = await User.findOne({email: value})

    if(check){
      return Promise.reject(`Аккаунт с таким email уже существует`);
    }

  }),
  body(`description`, `Минимальная длина описания - 6 символов, максимальная - 120`)
  .isLength({min: 6, max: 120})
  .trim()
]


exports.authUser = [
  body(`email`, `Email указан не верно`)
  .normalizeEmail()
  .isEmail()
  .custom(async (value, {req})=>{

    let check = await User.findOne({email: value})

    if(!check){
      return Promise.reject(`Аккаунт с таким email не существует`);
    }

  }),
  body(`password`, `Пароль должен содержат минимум 6 символов, макс 60`)
  .isLength({min: 6, max: 32})
  .isAlphanumeric()
  .trim()
]

exports.description = [
  body(`description`, `Минимальная длина описания - 6 символов, максимальная - 120`)
  .isLength({min: 6, max: 120})
  .trim()
]

exports.age = [
  body(`age`, `Минимальный возраст 14 лет, максимальный - 110`)
  .isInt({min: 14, max: 110}),
]

exports.password = [
  body(`password`, `Пароль должен содержат минимум 6 символов, макс 60`)
  .isLength({min: 6, max: 32})
  .isAlphanumeric()
  .trim()
]

exports.article = [
  body(`title`, `Минимальная длина заголовка 6 символов, максимальная - 120`)
  .isLength({min: 6, max: 120})
  .trim(),  
  body(`description`, `Минимальная длина описания - 6 символов, максимальная - 3000`)
  .isLength({min: 6, max: 3000})
  .trim()
]

exports.comment = [
  body(`description`, `Минимальная длина описания - 6 символов, максимальная - 2000`)
  .isLength({min: 6, max: 2000})
  .trim()  
]