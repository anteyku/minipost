let {Router} = require(`express`);
let checkSession = require(`../middleware/checkSession`);

let router = Router();

//! Запрос на проверку сессии
router.get(`/`, checkSession, async(req,res)=>{
  //console.log(res.locals);
  res.send(JSON.stringify(
    {
      text: `Отправка сообщения из бкенда на клиент`,
      authSession: true,
      user: req.session.user,
      csrf: res.locals.csrf,
      ipServer: req.headers.host
    }
    ));
})

module.exports = router;