let {Router} = require(`express`);
let checkSession = require(`../middleware/checkSession`);

let router = Router();

//! Деавторизация
router.get(`/`, checkSession, async(req,res)=>{
  req.session.destroy(()=>{
    console.log(`Пользователь деавторизован`);
    res.send(JSON.stringify({logout: true}))
  })
})

module.exports = router;



