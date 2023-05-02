module.exports = function (req,res,next){
  // Если сессия не имеет клюса accept то true
  if(!req.session.accept){
    res.send(JSON.stringify({
      authSession: false,
      csrf: res.locals.csrf,
      ipServer: req.headers.host
    }))
    console.log(`Пользователь НЕ АВТОРИЗОВАН`)
   // res.send(JSON.stringify({ipServe: req.headers.host}))
    return;
  } 
 // console.log(req.session);

  next();
}