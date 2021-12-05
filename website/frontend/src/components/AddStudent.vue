<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Legg til student</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="student.firstName"
          :rules="[(v) => !!v || 'Fornavn er påkrevd!']"
          label="Fornavn på student"
          required
        ></v-text-field>
        <v-text-field
          v-model="student.lastName"
          :rules="[(v) => !!v || 'Etternavn er påkrevd!']"
          label="Etternavn på student"
          required
        ></v-text-field>
        <v-text-field
          v-model="student.email"
          :rules="emailRules"
          label="Epost"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveStudent">Legg til</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Trykk på knappen for å legge til en ny student
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newStudent">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import StudentService from "../services/StudentService";

export default {
  name: "add-student",
  data() {
    return {
      student: {
        id: null,
        firstName: "",
        lastName: "",
        email: ""
      },
       emailRules: [
  v => !!v || 'Epost er påkrevd',
  v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
 ],
      submitted: false,
    };
  },
  methods: {
    saveStudent() {
      var data = {
        firstName: this.student.firstName,
        lastName: this.student.lastName,
        email: this.student.email,
      };
      console.log(data);
      StudentService.add(data)
        .then((response) => {
          this.student.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newTool() {
      this.submitted = false;
      this.student = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>