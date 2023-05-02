<template>
<teleport to="body">
    <vue3-snackbar style="font-family: sans-serif" bottom left :duration="3000"></vue3-snackbar>
</teleport>
  <form @submit.prevent="form" class="form">
    <b-row>
      <b-col offset-lg="3" lg="6">
        <div class="form__model">
          <div class="form__model__title">Авторизация</div>
          <div v-if="errorText" class="form__model__error"> {{ errorText }} </div>
          <div v-else-if="succes == true" class="form__model__succes"> Успешное подтверждения почьты </div>
          <div class="form__model__inputs">
            <input v-model="email" name="email" placeholder="Email" :class="[`form__model__inputs__input`, {error: v$.email.$error, succes: !v$.email.$error}]" type="text">
            <input v-model="valuePassword" name="password" placeholder="Пароль" :class="[`form__model__inputs__input`, {error: v$.valuePassword.$error, succes: !v$.valuePassword.$error}]" type="password">
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col offset-lg="3" lg="6">
        <b-row>
          <button type="submit" class="form__active">Авторизоваться</button>
        </b-row>
        <b-row>
          <router-link to="/register" class="form__offline">Регистрация</router-link>
        </b-row>
      </b-col>
    </b-row>
  </form>
</template>
<script>

import useValidate from "@vuelidate/core"
import {required, minLength, maxLength, email} from "@vuelidate/validators"

export default {
 async mounted(){
    for(let elem in this.$store.state.pageActive){
      this.$store.state.pageActive[elem] = false
    }
    this.$store.state.pageActive.auth = true;
  
    let clearHash = window.location.hash.replace(/#\/auth\/acceptEmail/, ``);
    let reg = /#\/auth\/acceptEmail/;
    // Проверяю сможет ли регулярка найти get запрос с подтверждениям email
    let checkHash = reg.test(window.location.hash);
    if(checkHash){
      console.log(`ПОДТВЕРЖДЕНИЯ ПОЧЬТЫ`)
              await this.axios.get(`http://localhost:3001/emailAccept${clearHash}`).then((response) => {
                  if(response.data.succes == false){
                    this.errorText = `Время действия токена истекло или токен не валиден`
                  } else if(response.data.succes == true){
                    console.log(`Пользователь успешно подтвердил почту`);
                    this.succes = true;
                    this.$snackbar.add({
                        type: 'success',
                        title: "Успешное подтверждения",
                        text: 'Вы успешно подтвердили почту'
                    })
                  }
              })
    }
  },
  data(){
    return{
      v$: useValidate(),
      valuePassword: ``,
      email: ``,
      errorText: ``,
      succes: false
    }
  },
  methods: {
   async form(){
      this.v$.$validate();
      if(!this.v$.$error){
        console.log(`Успешная валидация поля`);
        this.errorText = ``;

              const user = {
                password: this.valuePassword,
                email: this.email
              };
              await this.axios.post("http://localhost:3001/auth", user).then((response) => {
                  if(response.data.succes == false){
                    this.errorText = `Не правельный email/пароль или почта аккаунта не подтверждена`
                  } else if(response.data.succes == true){
                    console.log(`Пользователь успешно вошол в аккаунт`);
                    this.$router.push('cabinet')
                    this.$snackbar.add({
                        type: 'success',
                        title: "Успешный вход",
                        text: 'Вы успешно вошли в аккаунт'
                    })
                  }
              })
              
      } else {
        if(this.v$.email.$error){
          this.errorText = `Неверно указан email`
        } else if(this.v$.valuePassword.$error) {
          this.errorText = `Минимальная длина Пароля 6 символов, максимальная - 32`
        } 
      }
    }
  },
  validations(){
    return {
      email: {required, email, maxLength: maxLength(42)},
      valuePassword: {required, minLength: minLength(6), maxLength: maxLength(32)}
    }
  }
}
</script>

<style lang="less" scoped>
  @roboto: 'Roboto', sans-serif;

  .form{
    margin-top: 105px;
    font-family: @roboto;
    .form__model{
      background-color: #F6F6F6;
      .form__model__error{
        font-size: 20px;
        width: 90%;
        margin: 0 auto;
        margin-top: 20px;
        background-color: #ff5252;
        color: white;
        font-weight: 300;
        padding: 10px;
      }
      .form__model__succes{
        font-size: 20px;
        width: 90%;
        margin: 0 auto;
        margin-top: 20px;
        background-color: #00e676;
        color: white;
        font-weight: 300;
        padding: 10px;        
      }
      .form__model__title{
        background-color: #1976D2;
        color: white;
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        padding-top: 21px;
        padding-bottom: 21px;
      }
      .form__model__inputs{
        padding-top: 39px;
        padding-bottom: 39px;
        .error{
          border-color: #ff5252;
        }
        .succes{
          border-color: grey;
        }
        .form__model__inputs__input{
          width: 90%;
          display: block;
          margin: 0 auto;
          background-color: #F6F6F6;
          border-style: none;
          border-bottom-style: solid;
          padding-bottom: 6px;
          outline-style: none;
          margin-top: 27px;

          &:nth-child(1){
            margin-top: 0px;
          }

          &::placeholder{
            color: rgba(0,0,0,0.8);
            font-size: 16px;
            font-weight: 300px;
          }
        }
      }
    }
    .form__active{
      border-style: solid;
      width: 45%;
      margin: 0 auto;
      margin-top: 34px;
      font-family: @roboto;
      font-size: 16px;
      font-weight: 500;
      border-width: 1px;
      padding-top: 11px;
      padding-bottom: 11px;
      cursor: pointer;
      display: block;
      background-color: white;

      &:hover{
        color: #1976D2;
        border-color: #1976D2;
      }
    }
    .form__offline{
      width: 45%;
      margin: 0 auto;
      margin-top: 11px;
      font-family: @roboto;
      font-size: 16px;
      font-weight: 400;
      border-width: 1px;
      padding-top: 11px;
      padding-bottom: 11px;
      text-decoration: none;
      color: black;
    }
  }
</style>