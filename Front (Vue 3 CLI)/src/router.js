import { createRouter, createWebHashHistory } from "vue-router";


export default createRouter({
  history: createWebHashHistory(),
  routes: [
    // Главная страница
    {
      path: `/`,
      name: `important`,
      component: ()=> import(`@/views/TheImportant.vue`)
    },
    // Страницы всех мини постов
    {
      path: `/post`,
      name: `post`,
      component: ()=> import(`@/views/ThePosts.vue`)
    },
    // Подтверждения почьты
    {
      path: `/auth/acceptEmail/:token`,
      name: `accepted`,
      meta: {layout: `register`},
      component: ()=> import(`@/views/TheAuth.vue`)
    }, 
    // Страница авторизации
    {
      path: `/auth`,
      name: `authorization`,
      meta: {layout: `register`},
      component: ()=> import(`@/views/TheAuth.vue`)
    },
    // Личьный кабинет
    {
      path: `/cabinet`,
      name: `cabinet`,
      component: ()=> import(`@/views/TheCabinet.vue`)
    },
    // Страница регистрации
    {
      path: `/register`,
      name: `register`,
      meta: {layout: `register`},
      component: ()=> import(`@/views/TheRegister.vue`)
    },
    // Страница создания постов
    {
      path: `/createPost`,
      name: `create`,
      component: ()=> import(`@/views/TheCreatePost.vue`)
    },
    // Редактирования поста
    {
      path: `/editPost/:token`,
      name: `editPost`,
      component: ()=> import(`@/views/TheEdit.vue`)
    },
    // Страница открытого поста
    {
      path: `/openPost/:token`,
      name: `openPost`,
      component: ()=> import(`@/views/TheOpenPost`)
    }
  ]
})