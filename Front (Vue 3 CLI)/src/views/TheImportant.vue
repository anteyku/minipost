<template>
  <!-- BroadCast 1 -->
  <b-container class="broadcast">
    <b-row>
      <b-col lg="12">
        <div class="broadcast__title">
          MINI<span>-POSTS</span>
        </div>
      </b-col>
      <b-col lg="6">
        <div class="broadcast__left">
          <img v-lazy="{src: `star-wars-the-force-unleashed-5k-py-3840x2160.jpg`}" alt="логотип">
        </div>
      </b-col>
      <b-col lg="6">  
        <div class="broadcast__right">
          <div class="boradcast__right__title">
            Mini <span>-Posts</span> - Данная платформа создана для постов пользователей в совершенно разных тематиках.
          </div>
          <div class="broadcast__right__description">
           <span>Пост</span> - это всего лишь краткий рассказ о информации, которую вы преподносите в своих записях читателям. 
            Согласно исследованию контента в Facebook в 2018 году, если страница публикует менее одного поста в день, она получает лучшую вовлеченность на каждый пост. Но при этом общий уровень вовлеченности страницы падает.
            То есть чем чаще сообщество публикует посты, тем выше общий уровень его вовлеченности, но до определенной точки.
            Не бойтесь допускать ошибки, создавая контент. Но не забывайте проверить пост перед публикацией.
            Оставьте в тексте только нужную информацию для подписчика, не заставляйте читать то, что не несёт в себе никакого смысла.
          </div>
          <router-link to="/post" class="broadcast__right__button">
            Посты
          </router-link>
        </div>
      </b-col>    
    </b-row>
  </b-container>
  <!-- BroadCast 1 -->
  <!-- BroadCast 2 -->
  <div class="broadcast2">
    <b-container>
      <b-row>
        <b-col lg="12">
          <div class="broadcast2__title">
            НАШЫ УСЛУГИ
          </div>
        </b-col>
        <b-row>
          <b-col lg="5">
            <div class="broadcast2__services">
              <b-row>
                <b-col lg="5">
                  <div class="broadcast2__services__img">
                    <img v-lazy="{src: `social-media.png`}" alt="create post">
                  </div>
                </b-col>
                <b-col lg="7">
                  <div class="broadcast2__services__desc">
                    <div class="broadcast2__services__desc__title">
                      Создания постов
                    </div>
                    <div class="broadcast2__services__desc__description">
                      Делитесь информацией со всем миром
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 40px;">
                <b-col lg="5">
                  <div class="broadcast2__services__img">
                    <img v-lazy="{src: `checklist.png`}" alt="checklist">
                  </div>
                </b-col>
                <b-col lg="7">
                  <div class="broadcast2__services__desc">
                    <div class="broadcast2__services__desc__title">
                      Никаких правил
                    </div>
                    <div class="broadcast2__services__desc__description">
                      Мы никак не ограничиваем тематику постинга и не имеем цензуры
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
          
          <b-col lg="5" offset-lg="2">
            <div class="broadcast2__services">
              <b-row>
                <b-col lg="5">
                  <div class="broadcast2__services__img">
                    <img v-lazy="{src: `donate.png`}" alt="create post">
                  </div>
                </b-col>
                <b-col lg="7">
                  <div class="broadcast2__services__desc">
                    <div class="broadcast2__services__desc__title">
                      Без доната
                    </div>
                    <div class="broadcast2__services__desc__description">
                      Все деляться своим контентом без преимущества над другими
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 40px;">
                <b-col lg="5">
                  <div class="broadcast2__services__img">
                    <img v-lazy="{src: `manager.png`}" alt="checklist">
                  </div>
                </b-col>
                <b-col lg="7">
                  <div class="broadcast2__services__desc">
                    <div class="broadcast2__services__desc__title">
                      Без контроля Админов
                    </div>
                    <div class="broadcast2__services__desc__description">
                      Мы не вмешиваемся в конфликты создаваемые пользователями, вы решаете их сами
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-row>
    </b-container>
  </div>
  <!-- BroadCast 2 -->
</template>

<script>
export default {
  mounted(){
    // Изменяю каждую активную страницу на неактивную
    for(let elem in this.$store.state.pageActive){
      this.$store.state.pageActive[elem] = false
    }
    // Устанавливаю текущею активную страницу
    this.$store.state.pageActive.important = true;
  }
}
</script>

<style lang="less" scoped>
  @roboto: 'Roboto', sans-serif;

// BroadCast 1
  .broadcast{
    font-family: @roboto;
    margin-top: 37px;
    .broadcast__title{
      border-color: red;
      text-align: left;
      font-size: 20px;
      font-weight: 500;
      span{
        color: #1976D2;
      }
    }
    .broadcast__left{
      position: relative;
      margin-top: 28px;
      &:before{
        content: "";
        position: absolute;
        width: 3px;
        height: 100%;
        background-color: #1976D2;
        top: 0;
        right: -5%;
      }
      img{
        width: 100%;
      }

    }
    .broadcast__right{
      width: 90%;
      margin-left: auto;
      margin-top: 28px;
      .boradcast__right__title{
        text-align: left;
        font-family: @roboto;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        span{
          color: #1976D2;
        }
      }
      .broadcast__right__description{
        text-align: left;
        font-family: @roboto;
        font-size: 16px;
        font-weight: 400;
        margin-top: 27px;
        span{
          color: #1976D2;
        }
      }
      .broadcast__right__button{
        display: block;
        text-decoration: none;
        background-color: #1976D2;
        width: 45%;
        color: white;
        font-family: @roboto;
        font-size: 16px;
        font-weight: 700;
        padding: 10px;
        margin-top: 26px;
      }
    }
  }
  // End BroadCast 1
  // BroadCast 2
  .broadcast2{
    background-color: #1976D2;
    font-family: @roboto;
    margin-top: 58px;
    padding-bottom: 71px;
    .broadcast2__title{
      border-color: pink;
      color: white;
      font-size: 32px;
      font-weight: 700;
      margin-top: 32px;
    }
    .broadcast2__services{
      margin-top: 31px;
      .broadcast2__services__img{
        img{
          width: 55%;
        }
      }
      .broadcast2__services__desc{
        .broadcast2__services__desc__title{
          text-align: left;
          font-weight: 700;
          font-size: 20px;
          color: white;
        }
        .broadcast2__services__desc__description{
          font-weight: 400;
          font-size: 18px;
          text-align: left;
          color: white;
          margin-top: 14px;
        }
      }
    }
  }
  // End BroadCast 2
</style>