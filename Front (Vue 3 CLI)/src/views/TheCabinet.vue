<template>
<teleport to="body">
    <vue3-snackbar style="font-family: sans-serif" bottom left :duration="3000"></vue3-snackbar>
</teleport>
  <b-container class="cab">
    <b-row>
      <b-col lg="3">
        <div class="cab__left">
          <div class="cab__left__avatar">
            <van-image
                lazy-load
                :src="srcAvatar"
              />
            
          </div>
          <input name="image" ref="file" @change="changeAvata()" style="display: none" type="file" id="avatar">
          <label for="avatar" class="cab__left__btn-edit">
            СМЕНИТЬ АВАТАРКУ
          </label>
          <div class="cab__left__name">
            {{ $store.state.user.login }}
          </div>
          <div class="cab__left__age">
          Возраст - {{ textarea.age.descText }}
          </div>
        </div>
      </b-col>
      <b-col lg="9">
        <div class="cab__right">

          <div class="cab__right__info">
            <div class="cab__right__title">Про меня</div>
            <div v-if="!textarea.description.editToggle" class="cab__right__description">
              {{ textarea.description.descText }}
            </div>
            <textarea v-else class="cab__right__description" v-model="textarea.description.editText" id="" cols="30" rows="10"></textarea>
            <div class="cab__right__value">
              <i v-if="!textarea.description.editToggle" @click="textarea.description.editToggle = !textarea.description.editToggle" class="material-icons">edit</i>
              <button v-if="textarea.description.editToggle" @click="textarea.description.editToggle = !textarea.description.editToggle" id="cancel">Отмена</button>
              <button v-if="textarea.description.editToggle" @click="saveEdit(`description`)" id="save">Сохранить</button>
            </div>
          </div>

          <div class="cab__right__info">
            <div class="cab__right__label">
              Возраст
            </div>
            <div v-if="!textarea.age.editToggle" class="cab__right__description">
              {{ textarea.age.descText }}
            </div>
            <input min="14" max="110" type="number" v-else class="cab__right__description" v-model="textarea.age.editText">
            <div class="cab__right__value">
            
              <i v-if="!textarea.age.editToggle" @click="textarea.age.editToggle = !textarea.age.editToggle" class="material-icons">edit</i>
              <button v-if="textarea.age.editToggle" @click="textarea.age.editToggle = !textarea.age.editToggle" id="cancel">Отмена</button>
              <button v-if="textarea.age.editToggle" @click="saveEdit(`age`)" id="save">Сохранить</button>
            </div>
          </div>

          <div class="cab__right__info">
            <div class="cab__right__label">E-mail</div>
            <div v-if="!textarea.email.editToggle" class="cab__right__description">
              {{ textarea.email.descText }}
            </div>
          </div>

          <div class="cab__right__info">
            <div class="cab__right__label">Пароль</div>
            <div class="cab__right__description">
              ***************
            </div>
            <textarea v-if="textarea.password.editToggle" v-model="textarea.password.editText" class="cab__right__description" id="" cols="30" rows="10"></textarea>
            <div class="cab__right__value">
              <i v-if="!textarea.password.editToggle" @click="textarea.password.editToggle = !textarea.password.editToggle" class="material-icons">edit</i>
              <button v-if="textarea.password.editToggle" @click="textarea.password.editToggle = !textarea.password.editToggle" id="cancel">Отмена</button>
              <button v-if="textarea.password.editToggle" @click="saveEdit(`password`)" id="save">Сохранить</button>
            </div>
          </div>

          

        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col offset-lg="8" lg="4">
        <router-link to="/createPost" class="cob__btn-create-post">СОЗДАТЬ ПОСТ</router-link>
      </b-col>
    </b-row>
  </b-container>

  <b-container class="post">
    <b-row>
      <b-col lg="12">
        <div class="post__title">Мои посты</div>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-for="elem of myPosts" :key="elem" lg="4">
        <div class="post__mini-post">
          <div class="post__mini-post__img">
            <img v-lazy="elem.srcCover" alt="poster">
            <div class="post__mini-post__img__time">
               <i class="material-icons">access_time</i>
              {{ elem.createTime }}
            </div>
          </div>
          <div class="post__mini-post__shadow">
            <div class="post__mini-post__title">{{ elem.title }}</div>
            <div v-html="elem.description" class="post__mini-post__description van-multi-ellipsis--l2"></div>
            <div class="post__mini-post__line"></div>
            <div class="post__mini-post__author">
              <!--
                <img :src="srcAvatar" alt="author">
              -->
              <van-image
                round
                width="35px"
                height="35px"
                lazy-load
                :src="srcAvatar"
              />
            <span>by </span> {{$store.state.user.login}}
            </div>
            <div @click="deletePost(elem._id)" class="post__mini-post__btn-delete">УДАЛИТЬ</div>
            <router-link :to="`/editPost/`+elem._id" class="post__mini-post__btn-edit">РЕДАКТИРОВАТЬ</router-link>
          </div>
        </div>
      </b-col>
                         
    </b-row>
  </b-container>
</template>
<script>
export default {
  async mounted(){
    for(let elem in this.$store.state.pageActive){
      this.$store.state.pageActive[elem] = false
    }
    this.$store.state.pageActive.cabinet = true;


    // Делаю ссылку на сервер для загрузки аватарки
    if(this.$store.state.user.avatarName){
      let regular = /public\//g;
      let src = this.$store.state.user.avatarName.replace(regular, ``);
      let src1 = src.replace(/\\/g, ``);
      // this.$store.state - ip текущего сервера
      // src1 - путь к файлу
      this.srcAvatar = `http://${this.$store.state.serverAdress}/${src1}`;
    } else {
      this.srcAvatar = `anime-girl-sunset-glow-loneliness-3c-3840x2160.jpg`
    }

  // Получения всех постов пользователя
  await this.axios.get(`http://localhost:3001/getPosts/`).then((response)=>{
    if(response.data.success == false){
      console.log(`У пользователя нету постов`);
    } else if(response.data.success == true){
      for(let elem of response.data.posts){
        let regular = /public\//g;
        let src = elem.srcCover.replace(regular, ``);
        let src1 = src.replace(/\\/g, ``);
        elem.srcCover = `http://${this.$store.state.serverAdress}/${src1}`;
        this.myPosts.push(elem)


      }
    }
  })
                

   
  },
  data(){
    return {
      textarea: {
        description:
        {
          editToggle: false, 
          descText: this.$store.state.user.description,
          editText: this.$store.state.user.description
        },
        age:
        {
          editToggle: false,
          descText: this.$store.state.user.age,
          editText: this.$store.state.user.age,
        },
        email:
        {
          editToggle: false,
          descText:this.$store.state.user.email,
          editText: this.$store.state.user.email,
        },
        password:
        {
          editToggle: false,
          descText:this.$store.state.user.password,
          editText: ``
        }
      },
      srcAvatar: ``,
      myPosts: []
    }
  },
  methods: {
    // Изминения данных в личном кабинете
   async saveEdit(input){
      await this.axios.post(`http://localhost:3001/edit/${input}`, {[input]:this.textarea[input].editText}).then((response) => {
                  if(response.data.succes == false){
                    console.log(`Чтото пошло не так`);
                    this.$snackbar.add({
                        type: 'error',
                        title: "Ошибка",
                        text: response.data.text
                    })
                  } else if(response.data.succes == true){
                    this.textarea[input].editToggle = false;
                    this.textarea[input].descText = this.textarea[input].editText;
 
                   this.$snackbar.add({
                        type: 'success',
                        title: "Сохранено",
                        text: 'Изминения успешно вступили в силу'
                    })

                  

                  }        
      })      
    },
    // Смена ватарки
    async changeAvata(){

      // 1. Выбор картинки
      let formData = new FormData();
      formData.append('image', this.$refs.file.files[0])
    
      //console.log(formData.get(`image`));
      
      // 2. Отправка картинки на сервер

      await this.axios.post("http://localhost:3001/upload/avatar", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }
      ).then((response) => {
          if(!response.data.succes){
                   this.$snackbar.add({
                        type: 'error',
                        title: "Ошибка",
                        text: `${response.data.text}`
                    })
                    return
          }
                    this.$snackbar.add({
                        type: 'success',
                        title: "Сохранено",
                        text: 'Изминения успешно вступили в силу'
                    })

                    // Устанавливаю ссылку на аватарку
                    this.srcAvatar = response.data.url;
      })
       
    },
    async deletePost(value){
      //"`http://`+ $store.state.serverAdress + `/deletePost/` + elem._id"
      
    

      await this.axios.get(`http://`+ this.$store.state.serverAdress + `/deletePost/` + value)
      .then((response)=>{
        if(response.data.success == true){
                    this.$snackbar.add({
                        type: 'success',
                        title: "Удалено",
                        text: 'Успешное удаления поста'
                    })          
                    // Удаления данного поста со страницы
                            for(let i = 0; i < this.myPosts.length; i++){
                              if(this.myPosts[i]._id == value){
                                this.myPosts.splice(i, 1);
                              }
                            }
        } else if(response.data.success == false){{
                      this.$snackbar.add({
                        type: 'error',
                        title: "Ошибка",
                        text: 'Упс... чтото пошло не так'
                    })                  
        }}
      })      
      
    }
  }
}
</script>

<style lang="less" scoped>
  @roboto: 'Roboto', sans-serif;
  @inter: 'Inter', sans-serif;





  .post{
    margin-top: 115px;
    .post__title{
      font-family: @roboto;
      font-size: 22px;
      font-weight: 600;
      color:#999999;
      text-align: left;
    }
    .post__mini-post{
      margin-top: 40px;

      .post__mini-post__img{
        position: relative;
        max-height: 230px;
        overflow: hidden;

        img{
          z-index: 0;
        }

        .post__mini-post__img__time{
          position: absolute;
          bottom: 12px;
          right: 12px;
          z-index: 1;
          color: white;
          font-family: @roboto;
          font-weight: 300;
          font-size: 1rem;
          background-color:rgba(0, 0, 0, 0.34);
          padding: 4px;
          padding-top: 6px;
          padding-right: 14px;
          padding-left: 14px;
          border-radius: 40px;
          display: flex;
          align-items: center;
          i{
            font-size: 1rem;
            margin-right: 7px;
          }
        }
      }

      .post__mini-post__shadow{
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        padding-bottom: 29px;
        .post__mini-post__title{
          margin-top: 17px;
          text-align: left;
          font-family: @roboto;
          font-size: 22px;
          font-weight: 500;
          padding-left: 16px;
          padding-right: 16px;
          line-height: 23.44px;
        }
        .post__mini-post__description{
          margin-top: 13px;
          text-align: left;
          font-family: @roboto;
          font-size: 18px;
          font-weight: 300;
          padding-left: 16px;
          padding-right: 16px;
          line-height: 20.75px;
        }
        .post__mini-post__line{
          margin-top: 38px;
          background: #D9D9D9;
          margin-left: 16px;
          margin-right: 16px;
          height: 2px;
        }
        .post__mini-post__author{
          margin-top: 12px;
          padding-left: 16px;
          padding-right: 16px;
          text-align: left;
          font-size: 1rem;
          display: flex;
          align-items: center;

          span{
            color: rgba(0, 0, 0, 0.49);
            margin-left: 14px;
            margin-right: 10px;
          }
          img{
            width: 35px;
            height: 35px;
            border-radius: 100%;
          }
        }     
        .post__mini-post__btn-delete{
          border-style: solid;
          margin-left: 16px;
          margin-right: 16px;
          border-width: 2px;
          margin-top: 26px;
          padding: 8px;
          padding-top: 10px;
          font-family: @inter;
          font-size: 1rem;
          font-weight: 500;
          border-color: #F44336;
          color: #F44336;
          cursor: pointer;
          display: block;

          &:hover{
            background-color: #F44336;
            color: white;
          }
        }   
        .post__mini-post__btn-edit{
          border-style: solid;
          margin-left: 16px;
          margin-right: 16px;
          border-width: 2px;
          margin-top: 18px;
          padding: 8px;
          padding-top: 10px;
          font-family: @inter;
          font-size: 1rem;
          font-weight: 500;
          border-color: #1976D2;
          color: #1976D2;
          cursor: pointer;
          display: block;

          &:hover{
            background-color: #1976D2;
            color: white;
          }
        }  
      }






    }
  }
  // Блок личного кабинета верхний
  .cab{

    .cob__btn-create-post{
      background-color:#1976D2;
      color: white;
      font-family: @inter;
      font-size: 1rem;
      padding: 12px;
      font-weight: 400;
      margin-top: 29px;
      display: block;
      text-decoration: none;
      cursor: pointer;
        border-style: solid;
        border-color:#1976D2;
        border-width: 1px;
      &:hover{
        background-color: white;
        color:#1976D2;

      }
    }
    
    .cab__left{
      padding: 24px;
      margin-top: 87px;
      background-color: #1976D2;
      .cab__left__avatar{
        position: relative;
        overflow: hidden;
        margin: 0 auto;
        max-height: 222px;
        border-radius: 10px;
        img{
         width: 150%;
         margin-left: -60px;
        }
      }
      .cab__left__btn-edit{
        border-style:solid;
        border-color: white;
        border-width: 1px;
        color: white;
        font-size: 16px;
        padding: 8px;
        margin-top: 23px;
        cursor: pointer;
        font-weight: 400px;
        display: block;

        &:hover{
          background-color: white;
          color:#1976D2;
        }
      }
      .cab__left__name{
        margin-top: 20px;
        font-family: @roboto;
        color: white;
        font-size: 20px;
        font-weight: 600px;
      }
      .cab__left__age{
        font-family: @inter;
        color: white;
        font-size: 16px;
        font-weight: 400;
        margin-top: 11px;
      }
    }
    .cab__right{
      margin-top: 87px;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
      padding: 27px;
      padding-bottom: 32px;
      font-family: @roboto;
      .cab__right__info{
        .cab__right__title{
          font-size: 22px;
          color: #999999;
          font-weight: 600;
          text-align: left;
        }
        .cab__right__description{
          text-align: left;
          margin-top: 16px;
          font-weight: 300;
        }
        .cab__right__label{
          text-align: left;
          font-weight: 400;
          font-size: 20px;
          margin-top: 30px;
        }
        .cab__right__value{
          text-align: left;
          font-weight: 300;
          font-size: 16px;
          margin-top: 16px;
          display: flex;
         
         button{
          background-color: white;
          border-style: none;
          background-color: black;
          color: white;
          margin-left: 10px;
          margin-right: 10px;
          padding: 5px;
          padding-left: 10px;
          padding-right: 10px;
          cursor: pointer;

          &:hover{
            background-color:#1976D2;
          }
         }
         button#cancel{
          background-color: #ef5350;
                    &:hover{
            background-color:#1976D2;
          }
         }

          i{
            margin-left: auto;
            display: block;
            width: 5%;
            line-height: 0px;
            cursor: pointer;
            &:hover{
              color:#1976D2;
            }
          }
        }
      }

      

    }
  }
</style>