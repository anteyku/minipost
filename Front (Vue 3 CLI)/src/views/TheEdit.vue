<template>
<teleport to="body">
    <vue3-snackbar style="font-family: sans-serif" bottom left :duration="3000"></vue3-snackbar>
</teleport>
  <b-container class="createPost">
    <b-row>
      <b-col lg="12">
        <div class="createPost__title">Редактирования поста</div>
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
      <b-col lg="4" offset-lg="4">
          <div  @click="uploadPost" class="createPost__button">ВНЕСТИ ИЗМЕНЕНИЯ</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  mounted(){
    console.log(`Страница редактирования`)
    for(let elem in this.$store.state.pageActive){
      this.$store.state.pageActive[elem] = false
    }
    this.$store.state.pageActive.edit = true;

    this.getPost();
  },
  setup(){
    

  },
  methods: {
    async getPost(){
      let regular = /#\/editPost\//g;
      let hash = window.location.hash.replace(regular, ``);

        this.hash = hash;
      
      if(hash.length < 12){
       this.$router.push({ name: 'cabinet', query: { redirect: '/cabinet' } });
        return;
      }
      
       await this.axios.get(`http://localhost:3001/getReadPost/${hash}`)
       .then((response)=>{
          if(response.data.success == false){
            console.log(`Упс.. чтото пошло не так`)
          } else if(response.data.success == true){
            this.title = response.data.post.title;
            this.description = response.data.post.description;
            this.hash = hash;

          }
       })
    },
     async uploadPost(){

      let formData = {
        title: this.title,
        description: this.description,
        hash: this.hash
      }

      await this.axios.post("http://localhost:3001/upload/editPost", formData
      ).then((response)=>{
        console.log(response)
        if(response.data.succes == false){
          console.log(`НА СЕРВЕРЕ ПРОИЗОШЛА ОШИБКА`)
                   this.$snackbar.add({
                        type: 'error',
                        title: "Ошибка",
                        text: `${response.data.text}`
                    })          
        } else if(response.data.success == true){
                   this.$router.push({ name: 'cabinet', query: { redirect: '/cabinet' } });
                   this.$snackbar.add({
                        type: 'success',
                        title: "Успешно",
                        text: `${response.data.text}`
                    })          
                             
        }
      })

    },     
  },
  data(){
    return {
      title: ``,
      description: ``,
      hash: ``
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