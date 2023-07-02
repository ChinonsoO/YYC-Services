<template>
  <!-- <Dashboard/> -->

  <!-- <HelloWorld /> -->
  <!-- <h1>Barberpage</h1> -->

  <ServicesHosts/>
</template>

<script>
import { defineComponent } from 'vue';

// Components
// import HelloWorld from '../components/HelloWorld.vue';
// import Dashboard from '../components/LoginDashboard.vue';
  import ServicesHosts from '@/components/ServicesHosts.vue';

export default defineComponent({
    name:"ServicesView",

     components: {
      ServicesHosts
    // HelloWorld,
    }
});
</script>