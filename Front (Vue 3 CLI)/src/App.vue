<template>
  <div id="app">
    <!-- Header site -->
    <header>
      <Navigation/>
    </header>
    <!-- Header site -->
    <!-- Main site -->
    <main>
      <component :is="layout">
        <router-view></router-view>
      </component>
    </main>
    <!-- Main site -->
    <!-- Footer site-->
    <footer>
      <Footer/>
    </footer>
    <!-- Footer site -->
  </div>
</template>






<script>

  document.querySelector(`html`).attributes[0].value = `ru`


import Navigation from "@/components/TheNavigation.vue" 
import Footer from "@/components/TheFooter.vue"   
import RegisterLayout from "@/layouts/TheLayoutAuth.vue"
export default {
  name: 'App',
  computed: {
    layout(){
      return this.$route.meta.layout + `-layout`
    }
  },
  data(){
    return{
      
    }
  },
  components: {
    Navigation,
    Footer,
    RegisterLayout
  }


}
</script>


<style lang="less">

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
@inter: 'Inter', sans-serif;
@roboto: 'Roboto', sans-serif;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .title{
    background-color: black;
    color: white;
    width: 60%;
    margin: 0 auto;
    margin-top: 4%;
    padding: 1%;
  }
 
}


body{
  font-size: 16px;
}
h4{
  font-family: @roboto;
}

img{
  width: 100%;
}

textarea{
  width: 100%;
  resize: none;
  border-width: 1px;
  padding: 10px;
  border-radius: 0px;
}



</style>
