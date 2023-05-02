<template>
<teleport to="body">
    <vue3-snackbar style="font-family: sans-serif" bottom left :duration="3000"></vue3-snackbar>
</teleport>
  <b-container class="post">
    <b-row>
        <b-col lg="12">
          <div class="post__top">
            <div class="post__top__img">
              <!--
                <img :src="srcCoverAvatar" alt="картинка">
              -->     
              <van-image
                round
                width="40px"
                height="40px"
                lazy-load
                :src="srcCoverAvatar"
              />
            </div>
            <div class="post__top__author">by <span> {{ author }} </span></div>
            <div class="post__top__createTime"> {{ createTime }} </div>
          </div>
        </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <div class="post__title">
          {{ title }}
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <div class="post__back-image">
          <img v-lazy="srcCover" alt="главная картинка">
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <div v-html="description" class="post__description"></div>
      </b-col>
    </b-row>

    <b-row class="comment">
      <b-col lg="12">
        <div class="comment__title">Комментарии <span> {{ comments.length }} </span> </div>
      </b-col>
      <b-col v-for="elem of comments" :key="elem" lg="12">
        <div class="comment__mini-com">
          <b-row>
            <b-col lg="12" >
              <div class="comment__mini-com__top">
                <div class="comment__mini-com__top__avatar">
                  <van-image
                    round
                    width="40px"
                    height="40px"
                    :src="elem.authorAvatarSrc"
                  />
                </div>
                <div class="comment__mini-com__top__author">{{ elem.createAuthorName }}</div>
                <div class="comment__mini-com__top__createTime">{{ elem.createTime }}</div>
              </div>
            </b-col>
            <b-col lg="12">
              <div class="comment__mini-com__description">
                  {{ elem.description }}
              </div>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col lg="12" v-if="$store.state.logout" class="comment__add-comment">
        <van-form @submit="addComment">
          <van-cell-group inset>
            <van-field
              v-model="message"
              rows="2"
              autosize
              label="Ваш коментарий"
              type="textarea"
              maxlength="2000"
              placeholder="Message"
              show-word-limit
              name="description"
            />
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button block type="primary" native-type="submit">
              Оставить отзыв
            </van-button>
          </div>
        </van-form>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>

import { ref } from 'vue';
  export default {
   async mounted(){

      let regular = /#\/openPost\//g;
      let hash = window.location.hash.replace(regular, ``);

        this.hash = hash;
      
      if(hash.length < 12){
       this.$router.push({ name: 'cabinet', query: { redirect: '/cabinet' } });
        return;
      }

      
      // Получения информации о посте
       await this.axios.get(`http://${this.$store.state.serverAdress}/getReadPost/${hash}`)
       .then( (response)=>{
          if(response.data.success == false){
            console.log(`Упс.. чтото пошло не так`)
          } else if(response.data.success == true){
            this.author = response.data.post.authorName;
            this.createTime = response.data.post.createTime;
            this.title = response.data.post.title;
            this.description = response.data.post.description;

              // Переделываю ссылку на картинку под валидную
              let regular = /public\//g;
              let src = response.data.post.srcCover.replace(regular, ``);
              let src1 = src.replace(/\\/g, ``);     
              response.data.post.srcCover = `http://${this.$store.state.serverAdress}/${src1}`;
              this.srcCover = response.data.post.srcCover;

              this.createUserId = response.data.post.createUserId;

            //  console.log(response.data.post);
              // Беру коминтарии постаа
              this.comments = response.data.post.comments;

              for(let elem of this.comments){
                let regular1 = /public\//g;
                let src1 = elem.authorAvatarSrc.replace(regular1, ``);
                
                let src2 = src1.replace(/\\/g, ``);     
                elem.authorAvatarSrc = `http://${this.$store.state.serverAdress}/${src2}`;    
              }

              

              this.getAvatarSrc()

          }
       })




    },
    data(){
      return {
        author: ``,
        createTime: ``,
        title: ``,
        description: ``,
        srcCover: ``,
        createUserId: ``,
        srcCoverAvatar: ``,
        comments: []
      }
    },
    methods:{
      async getAvatarSrc(){



              // Получения ссылки на картинку автора данного поста
              await this.axios.get(`http://${this.$store.state.serverAdress}/getAvatarNamePost/${this.createUserId}`)
              .then((response)=>{
   

              // Переделываю ссылку на картинку под валидную
              let regular = /public\//g;
              let src = response.data.avatarKek.avatarName.replace(regular, ``);
              let src1 = src.replace(/\\/g, ``);     
              this.srcCoverAvatar = `http://${this.$store.state.serverAdress}/${src1}`;
               
              })



      },
      async addComment(values){

        console.log(values);


        let comment = values;

        let regular = /#\/openPost\//g;
        let hash = window.location.hash.replace(regular, ``);

        await this.axios.post(`http://${this.$store.state.serverAdress}/addComment/${hash}`, comment)
        .then((response)=>{
          if(response.data.succes == false){
            console.log(`Упс.. чтото не так`);
                    this.$snackbar.add({
                        type: 'error',
                        title: "Ошибка",
                        text: response.data.text
                    })            
          } else if(response.data.succes == true){
                    this.$snackbar.add({
                        type: 'success',
                        title: "Комментарий успешно добавлен",
                        text: response.data.text
                    })   
            console.log(`Пользователь прошол проверку`)

            // Делаю ссылку на картинку коментариия пользователя - правельной
              for(let elem of [response.data.coment]){
                let regular1 = /public\//g;
                let src1 = elem.authorAvatarSrc.replace(regular1, ``);
                
                let src2 = src1.replace(/\\/g, ``);     
                elem.authorAvatarSrc = `http://${this.$store.state.serverAdress}/${src2}`;    
              }


            // Добавляю новый комментарий к остальным коментариям
            this.comments.push(response.data.coment);
            
          }
        })
        

      }
    },
   setup(){
      const message = ref('');

      return {
        message
      };     
    }    
  }
</script>


<style lang="less" scoped>
  @roboto: 'Roboto', sans-serif;
  @inter: 'Inter', sans-serif;


  .post{
    margin-top: 82px;

    // Стили коментариев
    .comment{
      margin-top: 74px;
      .comment__title{
        font-family: @roboto;
        font-size: 19px;
        font-weight: 400;
        text-align: left;
        span{
          color: #1976D2;
        }
      }
      .comment__mini-com{
        margin-top: 31px;
        .comment__mini-com__top{
          display: flex;
          justify-content: left;
          .comment__mini-com__top__avatar{
            display: inline-block;
          }
          .comment__mini-com__top__author{

            margin-left: 15px;
            align-self: center;
            font-family: @roboto;
            font-size: 20px;
            font-weight: 400;
          }
          .comment__mini-com__top__createTime{

            align-self: center;
            margin-left: auto;
            font-family: @roboto;
            font-size: 16px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.49);
          }
        }
        .comment__mini-com__description{
          text-align: left;
          font-size: 16px;
          font-weight: 400;
          font-family: @roboto;
          margin-top: 30px;
          border-bottom-style: solid;
          padding-bottom: 30px;
          border-color: #D9D9D9;
          border-width: 2px;
        }

      }

      .comment__add-comment{
        margin-top: 20px;
      }
    }


    //------------


    .post__description{
      margin-top: 22px;
      font-family: @roboto;
      font-weight: 400;
      font-size: 17px;
    }

    .post__back-image{
      max-height: 355px;
      overflow: hidden;
      position: relative;
      margin-top: 28px;
      img{
        height: auto;

      }
    }
    .post__title{
      font-family: @roboto;
      font-size: 30px;
      font-weight: 400;
      text-align: left;
      margin-top: 28px;
    }
    // Информация о посте
    .post__top{
      display: flex;
      align-items: center;
      .post__top__img{
        width: 40px;
        height: 40px;
        //overflow: hidden;
        //border-radius: 50%;
        img{
          width: 100%;
        }
      }
      .post__top__author{
        text-align: left;
        padding-left: 8px;
        font-family: @roboto;
        font-size: 17px;
        font-weight: 300;
        padding-right: 18px;
        span{
          color: #1976D2;
        }
      }
      .post__top__createTime{
        font-family: @roboto;
        font-weight: 400;
        text-align: center;
        font-size: 17px;
        color: rgba(0, 0, 0, 0.49);

      }
    }
  }
</style>