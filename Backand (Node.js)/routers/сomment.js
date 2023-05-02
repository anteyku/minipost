let {Router} = require(`express`);
let {validationResult} = require(`express-validator/check`);
let {comment} = require(`../utils/validator`);
let checkSession = require(`../middleware/checkSession`);
let Posts = require(`../models/miniPosts`);
let createTime = require(`../public/timeForPost`);
const { forever } = require("request");

let router = Router();

router.post(`/:token`, checkSession, comment, async(req,res)=>{

    // Запускаем валидацию полей отправленые клиентом
    let errors = validationResult(req);

    // Проверка на пройденую валидацию
    if(!errors.isEmpty()){
      res.send(JSON.stringify({succes: false, text: errors.array()[0].msg}))
      return;
    }

    let check = await Posts.findById(req.params.token);

    // Существует ли пост с таким id ?
    if(check){

      // Проверка на максимальное количество коментариев под постомм
      let checkComent = 0;
      for(let elem of check.comments){
        if(String(elem.createUserId) == String(req.session.user._id)){
          checkComent++;
        }
      }

      if(checkComent < 3){
        // Добавления коментария
        check.comments.push({
          createTime: createTime(),
          createAuthorName: req.session.user.login,
          description: req.body.description,
          authorAvatarSrc: req.session.user.avatarName,
          createUserId: req.session.user._id
        })
        check.save().then((s)=>{
          console.log(s);
        })

        res.send(JSON.stringify({succes: true, text: `Комментарий успешно добавлен`, coment: {
          createTime: createTime(),
          createAuthorName: req.session.user.login,
          description: req.body.description,
          authorAvatarSrc: req.session.user.avatarName
        }}))
        return
      } else {
        res.send(JSON.stringify({succes: false, text: `Максимальное количество коментариев пользователя под одним постом - 3`}))
        return
      }
   
      
      


      
    } else {
      res.send(JSON.stringify({succes: false, text: `Поста с таким id не существует`}))
      return
    }

    
  

  console.log(`ЗАПРОС НА ДОБАВЛЕНИЯЯ КОМЕНТОВ`)
  
})

module.exports = router;