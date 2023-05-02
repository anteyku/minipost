<template>
  <div class="navigation">
    <div class="navigation__multilingualism">
      <div class="navigation__multilingualism__arrow">
        <select v-model="lang" @change="changeMultilingualism" class="navigation__multilingualism__select">
          <option value="ru">Ru</option>
          <option value="en">En</option>
        </select>
      </div>
    </div>
    <b-container>
        <b-row>
          <b-col lg="2" alignSelf="center">
            <a href="#" class="navigation__window-max__logo">
              Mini-Posts
            </a>
          </b-col>
          <b-col lg="2" offset-lg="2" alignSelf="center">
             <router-link to="/" :class="[`navigation__window-max__page`, {active: $store.state.pageActive.important}]">
                <div class="navigation__window-max__page__icon">
                  <i class="material-icons">home</i>
                </div>
                <div class="navigation__window-max__page__text">
                  Главная
                </div>
             </router-link>           
          </b-col>
          <b-col lg="2" alignSelf="center">
             <router-link to="/post" :class="[`navigation__window-max__page`, {active: $store.state.pageActive.posts}]">
                <div class="navigation__window-max__page__icon">
                  <i class="material-icons">receipt</i>
                </div>
                <div class="navigation__window-max__page__text">
                  Посты
                </div>
             </router-link>           
          </b-col>  
          <b-col v-if="$store.state.logout == true" lg="2" alignSelf="center">
             <router-link to="/cabinet" :class="[`navigation__window-max__page`, {active: $store.state.pageActive.cabinet}]">
                <div class="navigation__window-max__page__icon">
                  <i class="material-icons">people</i>
                </div>
                <div class="navigation__window-max__page__text">
                  Кабинет
                </div>
             </router-link>           
          </b-col>              
          <b-col v-if="$store.state.logout == false" lg="2" alignSelf="center">
             <router-link to="/auth" :class="[`navigation__window-max__page`, {active: $store.state.pageActive.auth}]">
                <div class="navigation__window-max__page__icon">
                  <i class="material-icons">exit_to_app</i>
                </div>
                <div class="navigation__window-max__page__text">
                  Авторизация
                </div>
             </router-link>           
          </b-col>    
          <b-col @click="logout" v-else-if="$store.state.logout == true" lg="2" alignSelf="center">
             <div :class="[`navigation__window-max__page`]">
                <div class="navigation__window-max__page__icon">
                  <i class="material-icons">exit_to_app</i>
                </div>
                <div class="navigation__window-max__page__text">
                  Выйти
                </div>
             </div>           
          </b-col>              
        </b-row>
    </b-container>

        <!--
        <div class="row navigation__window-max">
          <div class="navigation__window-max__logo col l2">
            Mini-Posts
          </div>
          <a href="#" class="navigation__window-max__page col l2 offset-l2">
            <div class="navigation__window-max__page__icon">
              <i class="material-icons">home</i>
            </div>
            <div class="navigation__window-max__page__text">
              Главная
            </div>
          </a>
        </div>
        -->
     
  </div>
</template>

<script>
  export default {
    mounted(){
      // Устанавливаю язык сайта который находиться в куки
      this.lang = localStorage.getItem(`lang`);
      console.log(localStorage.getItem(`lang`))

    
      

    },
    data(){
      return {
        lang: `ru`
      }
    },
    methods: {
 
      //! Выход из аккаунта
     async logout(){
        console.log(`Выход из аккаунта`);
              await this.axios.get("http://localhost:3001/logout").then((response) => {
                  if(response.data.logout == true){
                    this.$store.state.logout = false;
                    this.$router.push('auth')
                  }
              })        
      }
    }
  }
</script>

<style lang="less" scoped>
  @roboto: 'Roboto', sans-serif;

  .navigation{
    font-family: @roboto;
    background-color: #1976D2;
    padding-bottom: 12px;
    position: relative;

      .navigation__multilingualism{
        position: absolute;
        top: 15px;
        left: 17px;

        .navigation__multilingualism__arrow{
          position: relative;
          &:before{
            content: ">";
            top: 5px;
            right: 10px;
            position: absolute;
            color: white;
            transform: rotate(90deg);
            font-family: @roboto;
            font-size: 20px;
            color: rgba(255, 255, 255, 0.63);
            font-weight: 300;

            // Снимаю клик со стрелочки (так как стрелочка не реагирует на select при навидении на нее)
            pointer-events: none;
          }

      
          .navigation__multilingualism__select{
            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: none;
            border-style: solid;
            border-color: #BBDEFB;
            background-color: #1976D2;
            color: white;
            padding-left: 14px;
            padding-right: 10px;
            font-family: @roboto;
            font-size: 16px;
            padding-top: 5px;
            padding-bottom: 5px;
            width: 60px;
            font-weight: 300;
            border-width: 1px;
            cursor: pointer;
            outline-style: none;

            &:focus{
              border-color: white;
            }

         
          }
          .navigation__multilingualism__select::-ms-expand{
            display: none;
          }
        }
      }

      .navigation__window-max__logo{
        color: white;
        font-weight: 300;
        font-size: 20px;
        border-bottom-style: solid;
        border-width: 1px;
        padding-bottom: 1px;
        text-decoration: none;
        width: 100%;
        display: block;
        margin-top: 15px;
      }
      .navigation__window-max__page{
        font-size: 16px;
        font-weight: 400;
        color: white;
        padding: 3px;
        display: flex;
        text-decoration: none;
        margin-top: 15px;
        border-style: solid;
        border-width: 1px;
        border-color: #1976D2;
        cursor: pointer;
        &:hover{
          border-color: #bbdefb;
          border-style :solid;
          border-width: 1px;
        }
        .navigation__window-max__page__icon{
          width: 35%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .navigation__window-max__page__text{    
          align-self: center; 
        }
      }
      .active{
        border-style: solid;
        border-width: 1px;
        border-color: white;
      }
  }

  // Адаптирования мультиязичьности под мобильные устройства
  @media screen and (max-width: 414px){
    .navigation{
      margin-top: 60px;
      .navigation__multilingualism{
        width: 100%;
        top: -45px;
        left: 0px;
        .navigation__multilingualism__arrow{
          width: 100%;
          .navigation__multilingualism__select{
            border-color: #1976D2;
            background-color: white;
            color: #1976D2;
            width: 90%;
            text-align: center;
          }
        }
      }
    }
  }
  
</style>