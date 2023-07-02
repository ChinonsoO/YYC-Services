<template>
<MainHero/>
<HomeInfo/>
<OurServices/>

  <!-- <HelloWorld /> -->
  <!-- <h1>Homepage</h1> -->
</template>

<script>
import { defineComponent } from 'vue';

// Components
// import HelloWorld from '../components/HelloWorld.vue';
import MainHero from '@/components/MainHero.vue';
import OurServices from '@/components/OurServices.vue';
import HomeInfo from '../components/HomeInfo.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    // HelloWorld,
    MainHero,
    OurServices,
    HomeInfo
},
});
</script>
