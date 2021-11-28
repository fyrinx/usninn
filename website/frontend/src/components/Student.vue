<template>
  <div v-if="currentStudent" >
    <p class="headline">Studentprofil</p>

    <v-card
    class="mx-auto" tile>
    <v-card-title>Sudent details</v-card-title>
    


    
    <v-card-text>
        
    <p> Firstname: {{ currentStudent.firstName }} </p>
    <p>Lastname: {{ currentStudent.lastName }} </p>

    <p>Email: {{ currentStudent.email }} </p>
      
      
    </v-card-text>


    
    
    <v-card-actions>
      <v-btn
        textcolor="teal accent-4"
        @click=editStudent(2)
      >
        Edit student
      </v-btn>
    </v-card-actions>

  </v-card>

<p class="headline">{{ currentStudent.firstName }} sin låneliste</p>

<p>Her skal lista med utlån være synlig </p>
  </div>

  <div v-else>
    <p>Ingen student valgt</p>
  </div>






</template>

<script>
import StudentService from "../services/StudentService";

export default {
  name: "student",
  data() {
    return {
      currentStudent: null,
      message: "",
    };
  },
  methods: {
    getStudent(id) {
      StudentService.get(id)
        .then((response) => {
          this.currentStudent = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editStudent(id) {
      this.$router.push({ name: "student-edit", params: { id: id } });
    },
   

    
  },
  mounted() {
    this.message = "";
    this.getStudent(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>