<template>
  <div v-if="currentStudent" class="edit-form py-3">
    <p class="headline">Studentprofil</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentStudent.firstName"
        :rules="[(v) => !!v || 'First Name is required']"
        label="Firstname"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentStudent.lastName"
        :rules="[(v) => !!v || 'Last name is required']"
        label="Lastname"
        required
      ></v-text-field>
      <v-text-field
        v-model="currentStudent.email"
        :rules="[(v) => !!v || 'Email is required']"
        label="Email"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>


      <v-btn color="error" small class="mr-2" @click="deleteStudent">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateStudent">
        Update
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
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

    updateStudent() {
      StudentService.update(this.currentTutorial.id, this.currentTutorial)
        .then((response) => {
          console.log(response.data);
          this.message = "Student oppdatert!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteStudent() {
      StudentService.delete(this.currentStudent.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "" });
        })
        .catch((e) => {
          console.log(e);
        });
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