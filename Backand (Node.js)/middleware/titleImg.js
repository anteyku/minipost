let multer = require(`multer`);
let timeFile = require(`../public/timeFile`); // Время сохранения файла
let path = require(`path`);
// МОДУЛЬ ДЛЯ ТОГО ЧТОБЕ ГЕНЕРИРОВАТЬ УНИКАЛЬНЫЙ ID НАЗВАНИЯ ФАЙЛА
// ЧТОБЕ ПОЛЬЗОВАТЕЛЬ САМ НЕ МОГ ЕГО НАЗВАТЬ, так как там он сможет
// прописать пути к файлу другим или чтото короче сделать
var uuid = require('uuid');



let storage = multer.diskStorage({
  destination(req,file,cb) {
    
    // Если файл загружаеться из input с name="imageTitle" то сохранняем его в папку images
      if (file.fieldname === "imageTitle") {
        cb(null, `public/imageTitle`)
      }
  },
  filename(req,file,cb) {

    // Как я сохраняю файл ? Чтобе файлы не заменялись при сохранении похожего файла я делаю вот так -
    // 1. id аккаунта который сохраняет
    // 2. время с текущей датой вплоть до секунды
    // 3. названия самого файла
    // Используя такой алгоритм сохранения файлов - похожый файл может только 
    // сохраниться и замениться если пользователь одновременно с двух форм 
    // сохранит адинаковые файлы по названию в туже сикунду


   
    if (file.fieldname === "imageTitle") {
      cb(null,`Image ` + req.session.user._id.toString() + ` ` + timeFile() + uuid.v1() + path.extname(file.originalname))      
   }

  }
})

let allowedTypes = [`image/jpg`, `image/jpeg`, `image/png`, `image/webp`];

let fileFilter = (req,file,cb) => {

 
  // Если формат загружаемого файла есть в массиве allowedTypes то идем дальше
  if(allowedTypes.includes(file.mimetype)){
    // Если файл загружаеться из name="imageTitle"
    if(file.fieldname === `imageTitle`){
      if(file.mimetype == `image/jpg` || file.mimetype == `image/jpeg` || file.mimetype == `image/webp` || file.mimetype == `image/png`){
        // console.log(`Файл это картинка ` + file.mimetype);
        cb(null, true)
      } else {
        cb(null, false)
      }
    }  
  } else {
    cb(null, false)
  }
  


}




module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    files: 1, // allow up to 5 files per request,
    fieldSize: 2 * 1024 * 1024 // 2 MB (max file size)
  }
})