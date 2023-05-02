<template>
<teleport to="body">
    <vue3-snackbar style="font-family: sans-serif" bottom left :duration="3000"></vue3-snackbar>
</teleport>
  <b-container class="createPost">
    <b-row>
      <b-col lg="12">
        <div class="createPost__title">Создания поста</div>
      </b-col>
    </b-row>
  <b-row>
    <b-col lg="12">
      <input v-model="title" placeholder="Введите заголовок статьи" name="postTitle" class="createPost__inputTitle">
    </b-col>
  </b-row>
  <b-row>
      <b-col lg="12">
        <div class="createPost__title">Предварительный просмотр</div>
      </b-col>
  </b-row>
  
  <b-row>
    <b-col lg="12">
      <div class="createPost__preview" v-html="description"></div>
    </b-col>
  </b-row>

    <b-row>
      <b-col lg="12">
        <div class="createPost__text-editor">
          <vue-editor v-model="description"></vue-editor>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <div class="createPost__uploadImg">
          <b-row class="createPost__uploadImg__category">
            <b-col lg="4" class="createPost__uploadImg__category__img">
              <img v-if="srcImg" :src="srcImg" alt="upload-img">
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>

    <b-row >
      <b-col lg="12">
        
        
        <input style="display: none" ref="file" @change="changeReader" type="file" name="imageTitle" id="imgTitle">

         <label for="imgTitle" class="createPost__titleImg">
            <div class="createPost__titleImg__img"><i class="material-icons">image</i></div>
            <div class="createPost__titleImg__title">Загрузите фотографию для заголовка</div>
          </label> 



      </b-col>
    </b-row>


    <b-row>
      <b-col lg="4" offset-lg="4">
          <div  @click="uploadPost" class="createPost__button">СОЗДАТЬ ПОСТ</div>
      </b-col>
    </b-row>
  </b-container>
</template>



<script>


//import {ref} from 'vue'
//import FileUpload from 'vue-upload-component'

export default {
  components: {
   // FileUpload
  },
  mounted(){
   
  },
  methods: {
    async uploadPost(){

      let formData = new FormData();
      formData.append('imageTitle', this.$refs.file.files[0])
      formData.append("title", this.title)
      formData.append("description", this.description)
     // console.log(formData.get(`image`));
      await this.axios.post("http://localhost:3001/upload/imageTitle", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }
      ).then((response)=>{
        console.log(response)
        if(response.data.succes == false){
          console.log(`НА СЕРВЕРЕ ПРОИЗОШЛА ОШИБКА`)
                   this.$snackbar.add({
                        type: 'error',
                        title: "Ошибка",
                        text: `${response.data.text}`
                    })          
        } else if(response.data.succes == true){
                   this.$router.push('post') 
                   this.$snackbar.add({
                        type: 'success',
                        title: "Успешно",
                        text: `${response.data.text}`
                    })          
                             
        }
      })

    },
    changeReader(){
      this.reader.readAsDataURL(this.$refs.file.files[0]);
      console.log(`Записан новый файл`)
      this.reader.addEventListener(`load`, ()=>{
        console.log(`Загрузкился рридер ${this.reader.result}`)
        this.srcImg = this.reader.result;
      })
      console.log(this.reader);
    }


  
  },
  data(){
    return {
      title: ``,
      description: ``,
      reader: new FileReader(),
      srcImg: undefined
    }
  }

}
</script>

<style lang="less" scoped>
  @roboto: 'Roboto', sans-serif;
  @inter: 'Inter', sans-serif;

.createPost__preview{
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: none;
}

.createPost__uploadImg{
  border-color: red;
  margin-bottom: 40px;
  .createPost__uploadImg__category{
    font-family: @roboto;
    font-size: 16px;
    .createPost__uploadImg__category__name{
      border-color: blue;
      padding: 7px;
    }
    .createPost__uploadImg__category__img{
      border-color: green;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}

// Стили отвечающие за окно загрузки файла
.file-uploads{
  display: block;
  overflow: visible;
}


.createPost{
  margin-top: 117px;
  .createPost__title{
    text-align: left;
    font-family: @roboto;
    font-size: 22px;
    font-weight: 600;
    color: #999999;
  }
  .createPost__button{
    border-style: solid;
    font-family: @inter;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    color: #1976D2;
    border-width: 2px;
    border-color: #1976D2;
    padding: 10px;
    cursor: pointer;
    display: block;
    &:hover{
      background-color:#1976D2;
      color: white;
    }
  }
  .createPost__text-editor{
    border-color: red;
    margin-top: 26px;
    margin-bottom: 53px;
  }


  .createPost__titleImg{
    margin-bottom: 83px;//83px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
    padding: 35px;
    display: block;
    cursor: pointer;
    .createPost__titleImg__img{
      i{
        font-size: 80px;
      }
    }
    .createPost__titleImg__title{
      font-size: 22px;
      font-family: @roboto;
      font-weight: 300;
    }
  }

  .createPost__inputTitle{
    border-style: none;
    outline-style: none;
    display: block;
    width: 100%;
    font-family: @roboto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: 20px;
    margin-bottom: 20px;
    margin-top: 26px;
    &::placeholder{
      font-size: 16px;
    }
  }


}  



</style>