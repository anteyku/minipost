import { createStore } from "vuex"

let store = createStore({
  state() {
    return {
      // Активная текущая страница
      pageActive: {
        important: false,
        cabinet: false,
        posts: false,
        auth: false,
        register: false,
        edit: false
      },
      // Язык сайта
      multilingualism: {
        ru: true,
        en: false
      },
      // Пользователь не авторизован (по умолчанию)
      logout: false,
      // Данные пользователя
      user: ``,
      // Ip:port сервера с которого мы будем брать картинки
      serverAdress: ``,
      CSRF: ``,
      langArr: {
        "navigation-important": {
          "ru": `Главная`,
          "en": `Home`
        },
        "navigation-posts": {
          "ru": `Посты`,
          "en": `Posts`         
        },
        "navigation-auth": {
          "ru": `Авторизация`,
          "en": `Auth`           
        },       
      }
    }
  }
})

export default store