let {Router} = require(`express`);
let checkSession = require(`../middleware/checkSession`);
let ImageSave = require(`../middleware/fileImg`);
let ImageTitle = require(`../middleware/titleImg`);
let fs = require(`fs`);
let User = require(`../models/user`);
let Posts = require(`../models/miniPosts`);
let sharp = require('sharp');
let {validationResult} = require(`express-validator/check`);
let {article} = require(`../utils/validator`);
let nowTime = require(`../public/timeForPost`); 
let mongoose = require(`mongoose`);

let router = Router();


//! Загрузка аватарки на профиль прользователя
router.post(`/avatar`, checkSession, ImageSave.single(`image`), async(req,res)=>{

   
    // Проверка на получения обеих нужных файлов на сервере
    if(req.file){
      console.log(`Файл image загружен`);
          console.log(req.file);
         // fs.unlinkSync(req.file.path); - удаления файла

         let user = await User.findById(req.session.user._id);
        // 1. Удаляю прошлую аватарку профиля
        
        
        if(user.avatarName){ // Если аватарка ранее не была установления пользователем - то мы ее не удаляем
          fs.unlinkSync(user.avatarName);
        }
        
        
      
        
         
         // 2. Отбрасиваем формат файла (нового) и берем чисто его название
          let regular = /\..*/g;
          let clearName = req.file.filename.replace(regular, "");
          
        // 3. Сжимаем файл и превращаем в формат .webp  
          await sharp(req.file.path)
          .webp({ quality: 20 })  // от 1 до 20
          .toFile("./public/images/" + clearName + `.webp`);  // Название файла

        // 4. Удаляю не сжетую картинку  
        fs.unlinkSync(req.file.path);

        // 5. В базе данных сохраняем название картинки
          user.avatarName = `public/\\images/\\${clearName}.webp`;
          await user.save()
          
        
          
          
          req.session.user = user;
          await req.session.save();

        // 6. Генерирую ссылку на аватарку
         let avatarUrl = srcAvatar(user,req) ;
         
          res.send(JSON.stringify({succes: true, text: `Успешная смена аватарки`, url: avatarUrl}))

          return;
          
        

    } else {
      console.log(`Файл image НЕ загружен`);
      // Удаления файла image если он загружен но не прошол проверку
      if(req.file){
        fs.unlinkSync(req.file.path)
      }
      res.send(JSON.stringify({succes: false, text: `Файл не имеет одного из форматов JPG/JPEG/PNG/WEBP, или слишком большой`}))
      return; 
    }


  

})


// Функция генерирует ссылку на файл аватарки пользователя хранящейся на сервере node.js
function srcAvatar(user, req){
          // req.headers.host
          // Делаю ссылку на сервер для загрузки аватарки
          let regular1 = /public\//g;

          let src = user._doc.avatarName.replace(regular1, ``);
          
          let src1 = src.replace(/\\/g, ``);
          // this.$store.state - ip текущего сервера
          // src1 - путь к файлу
          let srcAvatar = `http://${req.headers.host}/${src1}`;
          return srcAvatar
}


//! Загрузка нового поста на сервер
router.post(`/imageTitle`, checkSession, ImageTitle.single('imageTitle'), article, async(req,res)=>{

  // Запускаем валидацию полей отправленых клиентом
  let errors = validationResult(req);

  // Проверка на пройденую валидацию
  if(!errors.isEmpty()){
    if(req.file){
      fs.unlinkSync(req.file.path); // Удаляю не сжатую картинку
    }
    res.send(JSON.stringify({text: errors.array()[0].msg, succes: false}))
    console.log(errors.array()[0].msg);
    return;
  }  


    // Проверка на получения обеих нужных файлов на сервере
    if(req.file){
      console.log(`Файл image загружен`);
        //  console.log(req.file);

          let user = await User.findById(req.session.user._id);
        
         // 1. Отбрасиваем формат файла (нового) и берем чисто его название
         let regular = /\..*/g;
         let clearName = req.file.filename.replace(regular, "");
         
         // 2. Сжимаем файл и превращаем в формат .webp  
          await sharp(req.file.path)
          .webp({ quality: 20 })  // от 1 до 20
          .toFile("./public/imageTitle/" + clearName + `.webp`);  // Название файла

          // 3. Удаляю не сжатую картинку  
          fs.unlinkSync(req.file.path);

          console.log(`СОЗДАНИЯ ЕБУЧЕГО ПОСТА`)
          // 4. Создаю пост в базе данных
          const MyObjectId = mongoose.Types.ObjectId;
          await new Posts({
            authorName: req.session.user.login,
            title: req.body.title,
            description: req.body.description,
            createUserId: user._id,
            createTime: nowTime(),
            srcCover: `public/\\imageTitle/\\${clearName}.webp`,
          })
          .save()
          .then((s)=>{
            console.log(s);
          })
          

    } else {
      console.log(`Файл image НЕ загружен`);
      // Удаления файла image если он загружен но не прошол проверку
      if(req.file){
        fs.unlinkSync(req.file.path)
      }
      res.send(JSON.stringify({succes: false, text: `Файл не имеет одного из форматов JPG/JPEG/PNG/WEBP, или слишком большой`}))
      return; 
    }




    // ПОСТ УСПЕШНО СОХРАНЕН
    res.send(JSON.stringify({succes: true, text: `Пост успешно добавлен на главную страницу`})) 
})


//! Редактирования готового поста на сервере
router.post(`/editPost`, checkSession, article, async(req,res)=>{


    // Запускаем валидацию полей отправленых клиентом
    let errors = validationResult(req);

    // Проверка на пройденую валидацию
    if(!errors.isEmpty()){
      res.send(JSON.stringify({text: errors.array()[0].msg, succes: false}))
      console.log(errors.array()[0].msg);
      return;
    }  

    let check = await User.findOne({_id: req.session.user._id})

  // Проверка на существования такой пользователя в базе данных
  if(check){
    let check2 = await Posts.findOne({
      createUserId: check._id,
      _id: req.body.hash
    })
    // Проверка на совпадения текущего id аккаунта с создавшим его пользователем
    if(check2){
      
      check2.title = req.body.title;
      check2.description = req.body.description;
      await check2.save();

      res.send(JSON.stringify({success: true, text: `Изменения успешно вступили в силу`}))
    } else {
      res.send(JSON.stringify({success: false}))
    }

  } else {
    res.send(JSON.stringify({success: false}))
  }


})



module.exports = router;