<template>
<v-container class="px-7">
    <v-row justify="center">
        <v-col cols="12" class="text-center pa-5">
            <div class="my-4 text-subtitle-2">JOIN THE YYC COMMUNITY</div>
            <div class="font-weight-bold text-h4 my-4">Get the look you want</div>
            <div class="my-4 mx-auto home-info__body" >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium odio alias dolor, iste qui eveniet aut iure harum fugiat neque.</div>
        </v-col>

    </v-row>
    <v-row class="mt-5 mt-lg-0 justify-center">
        <v-col cols="12" lg="4" style="max-width:28rem" v-for="card in cards" :key="card.title">
            <v-card flat  class="bg-blue home-info__cards">
                
                <v-card-title class="py-3 text-center">
                    <v-icon start :icon="card.icon"></v-icon>
                    <div class="mt-2 text-h5 font-weight-bold">{{card.title}}</div>
                </v-card-title>
                
                
                <!-- <v-card-subtitle>
                    HMMMM3
                </v-card-subtitle> -->
                <v-card-text class=" mt-1 text-center text-white">
                    {{card.text}}
                </v-card-text>
                
            </v-card>

        </v-col>

    </v-row>
</v-container>
    
</template>

<script>
export default{
        data: () => ({
            cards: [
                    {icon:"mdi-clock-outline", title:"Easy and Quick", text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eius id architecto hic rem natus, unde consectetur sit nesciunt amet nulla inventore voluptate distinctio molestiae reprehenderit exercitationem asperiores aut cupiditate."},
                    {icon:"mdi-handshake-outline", title:"Local Entrepreneurs", text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eius id architecto hic rem natus, unde consectetur sit nesciunt amet nulla inventore voluptate distinctio molestiae reprehenderit exercitationem asperiores aut cupiditate."},
                    {icon:"mdi-map-marker-outline", title:"Close to home", text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eius id architecto hic rem natus, unde consectetur sit nesciunt amet nulla inventore voluptate distinctio molestiae reprehenderit exercitationem asperiores aut cupiditate."},
            
            ]
        })
    }

</script>

<style scoped>

.v-col .home-info__body {
    max-width: 32rem !important;
}

.v-col .home-info__cards{
    max-width: 32rem! important;
    background: white !important;
}

@media (min-width: 1280px) {
    .v-col .home-info__cards{
    max-width: 32rem! important;
    /* background: white !important; */
}
}

</style>