<template>

  <div v-if="currentStudent" >
    <p class="headline">Studentprofil</p>

    <v-card
    class="mx-auto" tile>
    <v-card-title>Sudent details</v-card-title>
    


    
    <v-card-text>
        
    <p>Firstname: {{ currentStudent.firstName }} </p>
    <p>Lastname: {{ currentStudent.lastName }} </p>

    <p>Email: {{ currentStudent.email }} </p>
      
      
    </v-card-text>


    
    
    <v-card-actions>
      <v-btn
        textcolor="teal accent-4"
        @click=editStudent(currentStudent.id)
      >
        Endre student
      </v-btn>
    </v-card-actions>

  </v-card>
<v-row align="center" class="list px-3 mx-auto">
    
  <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>{{ currentStudent.firstName }} sin låneliste</v-card-title>

        <v-data-table
          :headers="headers"
          :items="borrows"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editStudent(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteStudent(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

      </v-card>
  </v-col >
</v-row>
  </div>

  <div v-else>
    <p>Ingen student valgt</p>
    
  </div>






</template>

<script>
import StudentService from "../services/StudentService";
import BorrowService from "../services/BorrowService";

export default {
  name: "studentinfo",
  data() {
    return {
      currentStudent: null,
      borrows: [],
      headers: [
        { text: "Navn på verktøy", align: "start", sortable: false, value: "toolName" },
        { text: "Antall", value: "itemCount", sortable: false },
        { text: "Levert dato", value: "deliveredDate", sortable: false },
        { text: "Leveringsfrist", value: "deadlineDate", sortable: false }
      ]
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
    getStudentBorrow(id){
        console.log("Student Id: "+id)
        BorrowService.getAllByStudent(id)
        .then((response) => {
          this.borrows = response.data.map(this.getDisplayBorrows);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayBorrows(borrow) {
      return {
        studentId: borrow.studentId,
        toolId: borrow.toolId,
        toolName: borrow.Tool.toolName,
        itemCount: borrow.itemCount,
        deliveredDate: borrow.deliveredDate,
        deadlineDate: borrow.deadlineDate
      };
      },
  },
      mounted() {
          console.log(this.$route.params.id);
    this.message = "";
    this.getStudent(this.$route.params.id);
    this.getStudentBorrow(this.$route.params.id)
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>