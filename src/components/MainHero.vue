<template>
    <div class="hero">
        <v-card class="rounded-0" max-height="90vh" flat >
            <v-img class="" eager src="../assets/hero_img.jpg" cover>
        
        <div class="card-title__container" >
        <v-card-title class=" py-12 text-white text-center font-weight-bold text-h4 text-sm-h4 text-md-h4 text-lg-h2" >
            <span class="hero-title__text font-weight-light"> YYC</span>Services
        </v-card-title>
        </div>
        
            </v-img>


        </v-card>
    </div>
</template>

<script>
  import { useDisplay } from 'vuetify'
  import { computed } from "vue"
// import { def } from '@vue/shared'

  export default {
    //We use the below to modify the height property of the v-card component dynamically
    setup () {
      const { name } = useDisplay()

      const height = computed(() => {
        // name is reactive and
        // must use .value
        switch (name.value) {
          case 'xs':
          return '33vh'
          case 'sm': return '50vh'
          case 'md': return '70vh'
          case 'lg': return '90vh'
          case 'xl': return '90vh'
          case 'xxl': return '45vh'
          default: return '45vh'
        }
      })

      return { height }
    }
  }

</script>

<style scoped>
/* .v-img__img--cover{
    background-position: left 80% bottom 10% !important;

} */

.card-title__container{
    height: 100%;
    max-height: 90vh;
    margin:0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero-title__text{
    color: #00B4D8 !important;
}

</style>