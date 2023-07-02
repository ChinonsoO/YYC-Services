<template>
<v-container class="px-0">
    <v-row>
        <v-col class="mt-3 pa-0 mx-0">
            <v-card class=" button-background bg-black">
                <v-card-title class="card-text">
                    Popular Services
                </v-card-title>
            </v-card>
        </v-col>

    </v-row>

    <v-row >
        <v-col cols="12" lg="4" v-for="card in cards " :key="card.Title">
            <v-card flat class="mt-4 rounded-0 card-background" >
                <v-img class="align-end" :src="require(`../assets/${card.src}`)" cover>
                <v-card-title class="text-white">
                {{card.Title}}
                </v-card-title>
                </v-img>
                <v-card-actions class="pa-0 ">
                    <v-btn block class="button-background rounded-0 bg-white card-text ma-0">
                        <div class="book-now__container"> 
                            <span class="font-weight-bold">BOOK NOW</span>

                            <v-icon end>mdi-arrow-right-thick</v-icon> 
                            
                        </div>
                        </v-btn>
                </v-card-actions>
                
            
            </v-card >
        </v-col>
        
        
    </v-row>

</v-container>

<!-- <v-btn @click="printDetails">Click me</v-btn> -->

    
</template>


<script>
    // import {ref} from "vue"
    export default{
        data: () => ({
            cards: [
                    {src:"barber.jpg", Title:"Barbers", },
                    {src:"hair-stylist.jpg", Title:"HairStylists"},
                    {src:"nail-stylist.jpg", Title:"NailStylists"}
            
            ]
        }),


       setup() {


       }
    }

   

</script>

<style>

/* v-btn.icon-container{
    text-align: end;
    width: 100%;
} */

.v-btn .book-now__container{
    width: 100% !important;
    display: flex !important;
    /* width: 400px !important; */
    justify-content: space-between;

}

.v-btn__content{
    width: 100% !important;
    

}

.button-background{
    /* background-color: #FD151B !important; */
    /* justify-content: space-around; */
}

.card-text{

}

.card-background{
      background: #FAFFD8;
}
</style>