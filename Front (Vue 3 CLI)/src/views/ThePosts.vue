<template>
<teleport to="body">
    <vue3-snackbar style="font-family: sans-serif" bottom left :duration="3000"></vue3-snackbar>
</teleport>
  <b-container>
    <b-row class="post"> 
      <b-col v-if="posts.length > 0"  lg="6" class="post__left">
          <img v-lazy="posts[0].srcCover" alt="" class="post__left__post-mini__img">
          <div class="post__left__post-mini__description">
            <div class="post__left__post-mini__description__create-time">
              <i class="material-icons">access_time</i>
               {{posts[0].createTime}}
            </div>
              <router-link :to="`/openPost/`+posts[0]._id" class="post__left__post-mini__description__title van-multi-ellipsis--l2">
                {{posts[0].title}}
              </router-link>
            <div class="post__left__post-mini__description__author">
              <span>by</span>
               {{posts[0].authorName}}
            </div>
          </div>
      </b-col>
      <b-col lg="6" class="post__right">
        <b-row>
          <b-col v-if="posts.length > 1"  lg="6" class="post__left">
              <img v-lazy="posts[1].srcCover" alt="" class="post__left__post-mini__img">
              <div class="post__left__post-mini__description">
                <div class="post__left__post-mini__description__create-time">
                  <i class="material-icons">access_time</i>
                  {{posts[1].createTime}}
                </div>
                  <router-link :to="`/openPost/`+posts[1]._id" class="post__left__post-mini__description__title van-multi-ellipsis--l2">
                    {{posts[1].title}}
                  </router-link>
                <div class="post__left__post-mini__description__author">
                  <span>by</span>
                  {{posts[1].authorName}}
                </div>
              </div>
          </b-col>       
          <b-col v-if="posts.length > 2"  lg="6" class="post__left">
              <img v-lazy="posts[2].srcCover" alt="" class="post__left__post-mini__img">
              <div class="post__left__post-mini__description">
                <div class="post__left__post-mini__description__create-time">
                  <i class="material-icons">access_time</i>
                  {{posts[2].createTime}}
                </div>
                  <router-link :to="`/openPost/`+posts[2]._id" class="post__left__post-mini__description__title van-multi-ellipsis--l2">
                    {{posts[2].title}}
                  </router-link>
                <div class="post__left__post-mini__description__author">
                  <span>by</span>
                  {{posts[2].authorName}}
                </div>
              </div>
          </b-col>   
          <b-col v-if="posts.length > 3"  lg="6" class="post__left">
              <img v-lazy="posts[3].srcCover" alt="" class="post__left__post-mini__img">
              <div class="post__left__post-mini__description">
                <div class="post__left__post-mini__description__create-time">
                  <i class="material-icons">access_time</i>
                  {{posts[3].createTime}}
                </div>
                  <router-link :to="`/openPost/`+posts[3]._id" class="post__left__post-mini__description__title van-multi-ellipsis--l2">
                    {{posts[3].title}}
                  </router-link>
                <div class="post__left__post-mini__description__author">
                  <span>by</span>
                  {{posts[3].authorName}}
                </div>
              </div>
          </b-col>      
          <b-col v-if="posts.length > 4"  lg="6" class="post__left">
              <img v-lazy="posts[4].srcCover" alt="" class="post__left__post-mini__img">
              <div class="post__left__post-mini__description">
                <div class="post__left__post-mini__description__create-time">
                  <i class="material-icons">access_time</i>
                  {{posts[4].createTime}}
                </div>
                  <router-link :to="`/openPost/`+posts[4]._id" class="post__left__post-mini__description__title van-multi-ellipsis--l2">
                    {{posts[4].title}}
                  </router-link>
                <div class="post__left__post-mini__description__author">
                  <span>by</span>
                  {{posts[4].authorName}}
                </div>
              </div>
          </b-col>                                                
        </b-row>
      </b-col>
    </b-row>
    <b-row class="post-description" align-v="center">
      <b-col lg="8">
        <div class="post-description__title">СПИСОК <span>ПОСТОВ</span> </div>
      </b-col>
      <b-col v-if="$store.state.logout" lg="4">
        <router-link to="/createPost" class="post-description__button">СОЗДАТЬ ПОСТ</router-link>
      </b-col>
    </b-row>
    <b-row class="mini-post">
      <b-col v-for="elem of frontBasa" :key="elem" lg="4" class="post__mini-post">
                  <div class="post__mini-post__img">
                      <img v-lazy="elem.srcCover"  alt="poster">
                      <div class="post__mini-post__img__time">
                        <i class="material-icons">access_time</i>
                         {{ elem.createTime }}
                      </div>
                    </div>
                    <div class="post__mini-post__shadow">
                      <router-link :to="`/openPost/`+elem._id" class="post__mini-post__title">{{ elem.title }}</router-link>
                      <div class="post__mini-post__description van-multi-ellipsis--l2"></div>
                      <div class="post__mini-post__line"></div>
                      <div class="post__mini-post__author">
                        <!--
                        <img v-lazy="elem.srcAuthorAvatar" alt="author">
                        -->
                        <van-image
                          round
                          width="40px"
                          height="40px"
                          lazy-load
                          :src="elem.srcAuthorAvatar"
                        />
                      <span>by </span> {{$store.state.user.login}}
                      </div>
                    </div>
      </b-col>
       
    </b-row>

    <b-row class="pagination">
      <b-col lg="12" class="example-one"> 
<!-- 
    :total-items="50" - количество контента в базе данных
    :items-per-page="5" - количество контента загружаемого на одну страницу
    :max-pages-shown="5" - количество видемых страниц для перелистывания (в навигации)
    :current-page="1" - номер загружаемой страницы по дефолту
    :on-click="onClickHandler" - при клике на одну из страниц вызов метода onClickHandler который в аргументе передаст номер страницы
-->        

          <vue-awesome-paginate
            :total-items="posts.length"
            :items-per-page="itemsPerPage"
            :max-pages-shown="5"
            v-model="currentPage"
            :on-click="onClickHandler"
          />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
 async mounted(){
    console.log(`Постов страница`)
    for(let elem in this.$store.state.pageActive){
      this.$store.state.pageActive[elem] = false
    }
    this.$store.state.pageActive.posts = true;


  await this.axios.get(`http://${this.$store.state.serverAdress}/getNewPost/`)
  .then((response)=>{
    // Преобразовываю каждую ссылку на картинку в посте - на валидную ссылку которая будет загружать картинку с нашего сервера
    for(let elem of response.data.posts){
      let regular = /public\//g;
      let src = elem.srcCover.replace(regular, ``);
      let src1 = src.replace(/\\/g, ``);



      let regularA = /public\//g;
      let srcA = elem.srcAuthorAvatar.replace(regularA, ``);
      let src1A = srcA.replace(/\\/g, ``);


      elem.srcCover = `http://${this.$store.state.serverAdress}/${src1}`;
      elem.srcAuthorAvatar = `http://${this.$store.state.serverAdress}/${src1A}`
    }
    this.posts = response.data.posts;

   

  })




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


        // Первую страницу заполняю контентом
        for (var i = (this.nowPage-1) * this.itemsPerPage; i < (this.nowPage * this.itemsPerPage) && i < this.posts.length; i++){
          this.frontBasa.push(this.posts[i]);
        }
      


 },
 data(){
  return {
    posts: [],
    srcAvatar: ``,
    nowPage: 1,
    itemsPerPage: 3,
    // Фронтенд база данных
    frontBasa: [],
    // Номер текущей активной страницы
    currentPage: 1
  }
 },
 methods: {


      // page - номер страницы на которую перешли
      onClickHandler(page){
      // Здеьс кароче мы должны будем отправлять запрос на сервер и получать нужные нам обекты, после чего записыват в frontBasa
        this.nowPage = page;

        this.frontBasa = [];

   
       // Заполняем контентом в зависимости от выбранной текущей страницы
        for (var i = (this.nowPage-1) * this.itemsPerPage; i < (this.nowPage * this.itemsPerPage) && i < this.posts.length; i++){
          this.frontBasa.push(this.posts[i]);
        }

      },
      // Переход на страницу выбранного поста
      
      openPost(id){
        console.log(`ОТКРЫТЬ ПОСТ ${id}`)
        this.$router.push('openPost')
      }

  
 }
 
}
</script>

<style lang="less" >
  @roboto: 'Roboto', sans-serif;
  @inter: 'Inter', sans-serif;


// Пагинация на странице
.pagination{
  margin-top: 93px;

    .example-one .pagination-container {
      column-gap: 10px;
    }
    .example-one .paginate-buttons {
      height: 40px;
      width: 40px;
      border-radius: 20px;
      cursor: pointer;
      background-color: rgb(242, 242, 242);
      border: 1px solid rgb(217, 217, 217);
      color: black;
    }
    .example-one .paginate-buttons:hover {
      background-color: #d8d8d8;
    }
    .example-one .active-page {
      background-color: #3498db;
      border: 1px solid #3498db;
      color: white;
    }
    .example-one .active-page:hover {
      background-color: #2988c8;
    }
    .example-one .back-button:active,
    .example-one .next-button:active {
      background-color: #c4c4c4;
    }


}




// Мини посты
  .mini-post{
    margin-top: 49px;

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
          display: block;
          color: black;
          cursor: pointer;
          &:hover{
            color: #1976D2;
          }
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

  // Описание перед мини постами
  .post-description{
    margin-top: 76px;
    .post-description__title{
      text-align: left;
      font-family: @inter;
      font-weight: 500;
      font-size: 22px;
      span{
        color:#1976D2;
      }
    }
    .post-description__button{
      border-style: solid;
      font-family: @inter;
      font-size: 20px;
      font-weight: 400;
      background-color: #1976D2;
      color: white;
      padding-top: 12px;
      padding-bottom: 10px;
      border-color:#1976D2;
      border-width: 2px;
      margin-top: 10px;
      cursor: pointer;
      display: block;
      &:hover{
        background-color: white;
        color:#1976D2;
      }
    }
  }

  // Стили для пяти главных мини постов
  .post{
    margin-top: 74px;
    .post__left{
      min-height: 350px;
      position: relative;
      padding: 0px;
      overflow: hidden;
      background-color: black;

        .post__left__post-mini__img{
          position: absolute;
          top: 0;
          left: 0;
          width: auto;
          height: 100%;
          filter: brightness(53%);
          
        }
        .post__left__post-mini__description{
          width: 90%;
          position: absolute;
          bottom: 0;
          left: 5%;
          margin-bottom: 20px;
          .post__left__post-mini__description__create-time{
            width: 100%;
            color: white;
            text-align: left;
            font-family: @roboto;
            font-weight: 300;
            display: flex;
            i{
              font-size: 1rem;
              margin-right: 5px;
              color: rgb(179, 179, 179);
            }
          }
          .post__left__post-mini__description__title{
            color: white;
            font-family: @roboto;
            text-align: left;
            font-weight: 500;
            font-size: 25px;
            margin-top: 8px;
          }
          .post__left__post-mini__description__author{
            color: white;
            text-align: left;
            margin-top: 10px;
            font-weight: 300px;
            font-size: 1rem;
            span{
              color: rgb(179, 179, 179);
            }
          }
        }
    }
    .post__right{
     
        .post__left{
      
          position: relative;
          padding: 0px;
          overflow: hidden;
          min-height: 175px;
          background-color: black;

            .post__left__post-mini__img{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: auto;
              filter: brightness(63%);
            }
            .post__left__post-mini__description{
              width: 90%;
              position: absolute;
              bottom: 0;
              left: 5%;
              margin-bottom: 23px;
              .post__left__post-mini__description__create-time{
                width: 100%;
                color: white;
                text-align: left;
                font-family: @roboto;
                font-weight: 300;
                display: flex;
                i{
                  font-size: 1rem;
                  margin-right: 5px;
                  color: rgb(179, 179, 179);
                }
              }
              .post__left__post-mini__description__title{
                color: white;
                font-family: @roboto;
                text-align: left;
                font-weight: 500;
                font-size: 25px;
                margin-top: 8px;
              }
              .post__left__post-mini__description__author{
                color: white;
                text-align: left;
                margin-top: 10px;
                font-weight: 300px;
                font-size: 1rem;
                span{
                  color: rgb(179, 179, 179);
                }
              }
            }
        }      
    }
  }

</style>