<template>

  <div v-if="currentBorrow" >
    <p class="headline">Informasjon om verktøy</p>

    <v-card
    class="mx-auto" tile>
    <v-card-title>Detailjer om verktøy</v-card-title>
 
    <v-card-text>
        
    <p>Navn på låner: {{ currentBorrow.Student.studentName }} </p>
    <p>Navn på verktøy: {{ currentBorrow.Tool.toolName }} </p> 
    <p>Antall lånt: {{ currentBorrow.itemCount }} </p>
    <p>Levert dato:<br> {{ currentBorrow.deliveredDate }} </p>
    <p>Frist dato:<br> {{ currentBorrow.deadlineDate }} </p>
    </v-card-text>

  </v-card>
  </div>

  <div v-else>
    <p>Ingen lån valgt</p>
    
  </div>






</template>

<script>

import BorrowService from "../services/BorrowService";

export default {
  name: "borrowinfo",
  data() {
    return {
      currentBorrow: null,
    };
  },
  methods: { 
    getBorrow(id) {
    
      BorrowService.get(id)
        .then((response) => {
          this.currentBorrow = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
      mounted() {
          console.log(this.$route.params.id);
    this.message = "";
    this.getBorrow(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>