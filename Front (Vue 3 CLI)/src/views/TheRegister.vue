<template>
<teleport to="body">
    <vue3-snackbar style="font-family: sans-serif" bottom left :duration="3000"></vue3-snackbar>
</teleport>
  <form @submit.prevent="form" class="form">
    <b-row>
      <b-col offset-lg="3" lg="6">
        <div class="form__model">
          <div class="form__model__title">Регистрация</div>
          <div v-if="errorText" class="form__model__error"> {{ errorText }} </div>
          <div v-else-if="succes == true" class="form__model__succes"> Успешная регистрация, на почту отправлено <br/> письмо для подтверждения регистрации </div>
          <div class="form__model__inputs">
            <input v-model="valueName" placeholder="Логин" :class="[`form__model__inputs__input`, {error: v$.valueName.$error, succes: !v$.valueName.$error}]" type="text">
            <input v-model="valuePassword" name="password" placeholder="Пароль" :class="[`form__model__inputs__input`, {error: v$.valuePassword.$error, succes: !v$.valuePassword.$error}]" type="password">
            <input v-model="repeatPassword" name="repeatPassword" placeholder="Пов. Пароль" :class="[`form__model__inputs__input`, {error: v$.repeatPassword.$error, succes: !v$.repeatPassword.$error}]" type="password">
            <div class="form__model__inputs__slider">
              <b-row>
                <div class="form__model__inpurts__slider__name">Возраст</div>
              </b-row>
              <b-row>
                <Slider 
                  v-model="value"
                  class="slider-red"
                  :min="12"
                  :max="120"
                />
              </b-row>
            </div>
            <input v-model="email" name="email" placeholder="E-mail" :class="[`form__model__inputs__input`, {error: v$.email.$error, succes: !v$.email.$error}]" type="text">
            <input v-model="description" name="description" placeholder="О себе" :class="[`form__model__inputs__input`, {error: v$.description.$error, succes: !v$.description.$error}]" type="text">
            <div class="form__model__inputs__checked">
              <input v-model="acceptRultes" type="checkbox" name="accept" id="checkbox">
              <label for="checkbox">Я соглашаюсь с правилами сайта</label>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col offset-lg="3" lg="6">
        <b-row>
          <button type="submit" class="form__active">Зарегистрироваться</button>
        </b-row>
        <b-row>
          <router-link to="/auth" class="form__offline">Авторизация</router-link>
        </b-row>
      </b-col>
    </b-row>
  </form>
</template>
<script>
import Slider from '@vueform/slider'
import useValidate from "@vuelidate/core"
// minValue - минимальное число
// sameAs - сравнения с чемто
// maxLength - максимальное число
import {required, minLength, maxLength, sameAs, minValue, maxValue, email} from "@vuelidate/validators"
export default {
async mounted(){

    for(let elem in this.$store.state.pageActive){
      this.$store.state.pageActive[elem] = false
    }
    this.$store.state.pageActive.register = true;
    // console.log(this.$store.state.pageActive)
  },
  data(){
    return{
      v$: useValidate(),
      valueName: ``,
      valuePassword: ``,
      value: 36,
      repeatPassword: ``,
      email: ``,
      description: ``,
      acceptRultes: false,
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
                login: this.valueName,
                password: this.valuePassword,
                Age: this.value,
                email: this.email,
                description: this.description
              };
              await this.axios.post("http://localhost:3001/register", user).then((response) => {
                  if(response.data.succes == true){
                    this.succes = true;
                    this.$snackbar.add({
                        type: 'success',
                        title: "Успешная регистраци",
                        text: 'На вашу почту отправлено письмо для подтверждения аккаунта'
                    })
                  } else if(response.data.succes == false){
                    this.errorText = `Аккаунт с таким email уже существует`
                  }
              })
      } else {
        if(this.v$.valueName.$error){
          this.errorText = `Минимальная длина Логина 6 символов, максимальная - 12`
        } else if(this.v$.valuePassword.$error) {
          this.errorText = `Минимальная длина Пароля 6 символов, максимальная - 32`
        } else if(this.v$.repeatPassword.$error){
          this.errorText = `Неверный повторный пароль`
        } else if(this.v$.value.$error){
          this.errorText = `Минимальный возраст 14 лет, максимальный - 110`
        } else if(this.v$.email.$error){
          this.errorText = `Неверно указан email`
        } else if(this.v$.description.$error){
          this.errorText = `Минимальная длина описания - 6 символов, максимальная - 120`
        } else if(this.v$.acceptRultes.$error){
          this.errorText = `Вы не согласились с правилами сайта`
        }
      }
    }
  },
  components: {
    Slider
  },
  validations(){
    return {
      valueName: {required, minLength: minLength(6), maxLength: maxLength(12)},
      valuePassword: {required, minLength: minLength(6), maxLength: maxLength(32)},
      repeatPassword: {required, sameAs: sameAs(this.valuePassword)},
      value: {required, minValue: minValue(14), maxValue: maxValue(110)},
      email: {required, email, maxLength: maxLength(42)},
      description: {required, minLength: minLength(6), maxLength: maxLength(120)},
      acceptRultes: {checked: (value)=>{
        return value === true
      }}
    }
  }
}
</script>

<style src="@vueform/slider/themes/default.css"></style>
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
        .form__model__inputs__slider{
          border-color: blue;
          width: 90%;
          margin: 0 auto;
          margin-top: 27px;
          .form__model__inpurts__slider__name{
            text-align: left;
            margin-bottom: 20px;
          }
          .slider-red{
              --slider-connect-bg: #1976D2;
              --slider-tooltip-bg: #1976D2;
              --slider-handle-ring-color: #EF444430;
          }
        }
        .form__model__inputs__checked{
          text-align: left;
          position: relative;
          width: 90%;
          margin: 0 auto;
          margin-top: 27px;
          #checkbox{
            display: none;
          }
          #checkbox:checked ~ label:after{
            opacity: 1;
          }
          #checkbox:checked ~ label:before{
            background-color: #1976D2;
          }
          label{
            padding-left: 30px;
            cursor: pointer;
          }
          label:before{
            border-style: solid;
            border-width: 1px;
            border-color: #ccc;
            width: 20px;
            height: 20px;
            content: "";
            display: inline-block;
            margin-right: 10px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
          }
          label:after{
            width: 20px;
            height: 20px;
            position: absolute;
            left: 0;
            top: 0;
            content: "";
            background: url("check.png") no-repeat;
            background-size: 20px 20px;
            opacity: 0;
            z-index: 2;
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

