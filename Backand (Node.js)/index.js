let express = require(`express`);
let Register = require(`./routers/register`);
let cors = require(`cors`);
let mongoose = require(`mongoose`);
let keys = require(`./keys/key`);
let Auth = require(`./routers/auth`);
let session = require(`express-session`);
let MongoStore = require(`connect-mongodb-session`)(session);
let checkSession = require(`./routers/checkSession`);
let Logout = require(`./routers/logout`);
let emailAccept = require(`./routers/emailAccept`);
// Подключения csrf токена
let csrf = require(`csurf`);
let csrfMidle = require(`./middleware/csrf`); // Отправляю csrf токен на клиент
let editSave = require(`./routers/saveEdit`); // Сохранения изминений аккаунта пользователя
let Upload = require(`./routers/upload`); // Сохранения аватарок профиля
let compression = require(`compression`); // Модуль для сжатия загружаемых данных на клиент
let postCabinet = require(`./routers/postsCabinet`); // Получения всех постов пользователя
let deletePost = require(`./routers/deletePost`); // Удаления поста
let getReadPost = require(`./routers/getReadPost`);  // Чтения поста
let newPost = require(`./routers/getNewPost`) // Запрос на получения самых новых постов
let getAvatarNamePost = require(`./routers/getSrc-AvanarName`) // Запрос на получения аватарки автора поста
let comment = require(`./routers/сomment`) // Добавления коментариев к посту

// Подключения сессий к базе данных
let store = new MongoStore({
  collection: `sessions`,
  uri: keys.mongoURL
})
let sessionMiddleware = session({
  secret: `this is my shit`,
  resave: true,
  saveUninitialized: true,
  cookie: { // Автоудаления сессии через 1 час
    maxAge: 3600000,
    sameSite: "strict",
    secure: false,
    httpOnly: true
  }, 
  store: store
})

let app = express();
app.use(express.static(`public`));
app.use(`/avatar`, express.static(`images`)); // Папка в которой будут храниться картинки аватарки
app.use(`/imageTitle`, express.static(`imageTitle`)); // Папка в которую будет сохраняться картинки постеры
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
app.use(sessionMiddleware); // Проверка пользователя на авторизацию
app.use(compression()); // Модуль для сжатия ответов клиенту
//! ВНИМАНИЕ: ОБЯЗАТЕЛЬНО НУЖНО ИСПОЛЬЗОВАТЬ ПОСЛЕ sessionMiddleware подключения csrf
app.use(csrf()); // Защита от csrf атак
app.use(csrfMidle)



//! Регистрация пользователя
app.use(`/register`, Register);
//! Авторизация пользователя
app.use(`/auth`, Auth);
//! Проверка наличии сессии у пользователя
app.use(`/checkSession`, checkSession);
//! Выход из аккаунта
app.use(`/logout`, Logout);
//! Подтверждения аккаунта
app.use(`/emailAccept`, emailAccept);
//! Сохранения изминений аккаунта пользователя
app.use(`/edit`, editSave);
//! Сохранения аватарок профиля
app.use(`/upload`, Upload);
//! Загрузка постов пользователя
app.use(`/getPosts`, postCabinet);
//! Удаления поста пользователя
app.use(`/deletePost`, deletePost);
//! Чтения поста
app.use(`/getReadPost`, getReadPost);
//! Запрос на чтения самых новых постов
app.use(`/getNewPost`, newPost)
//! Запрос на получения аватарки пользователя создавшего пост
app.use(`/getAvatarNamePost`, getAvatarNamePost)
//! Добавления коментариев к посту
app.use(`/addComment`, comment)

let PORT = process.env.PORT || 3001;
let start = async ()=>{

  await mongoose.connect(keys.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>{
    console.log(`База данных успешно подключена`);
  })


  app.listen(PORT, ()=>{
    console.log(`Сервер запущен`);
  })
}
start();












