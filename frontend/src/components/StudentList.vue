<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="name" label="Søk etter navn"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchName">
        Søk
      </v-btn>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn small @click="addStudent">
        Legg til student
      </v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Studenter</v-card-title>

        <v-data-table
          :headers="headers"
          :items="students"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editStudent(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="studentDetails(item.id)">info</v-icon>
            <v-icon small @click="deleteStudent(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="students.length > 0">
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import StudentService from "../services/StudentService";
export default {
  name: "student-list",
  data() {
    return {
      students: [],
      
      name: "",
      headers: [
        { text: "Fornavn", align: "start", sortable: false, value: "firstName" },
        { text: "Etternavn", value: "lastName", sortable: false },
        { text: "Epost", value: "email", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    getStudents() {
      StudentService.getAll()
        .then((response) => {
          this.students = response.data.map(this.getDisplayStudents);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addStudent() {
      this.$router.push({name:"addStudent"});
    },
    studentDetails(id) {
      //this.highlightClickedRow(value);
      console.log("Student id "+id);
      
      this.$router.push({ name: "student-details", params: { id: id } });
    },
    refreshList() {
      this.getStudents();
    },

    searchName() {
      StudentService.findByName(this.name)
        .then((response) => {
          this.students = response.data.map(this.getDisplayStudents);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editStudent(id) {
      this.$router.push({ name: "student-edit", params: { id: id } });
    },

    deleteStudent(){
      
    },

    getDisplayStudents(student) {
      return {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
      };
    },
  },
  mounted() {
    this.getStudents();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>