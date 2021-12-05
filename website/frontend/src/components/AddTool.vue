<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Tool</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="tool.toolName"
          :rules="[(v) => !!v || 'Navn er påkrevd!']"
          label="Navn på verktøy"
          required
        ></v-text-field>
        <v-text-field
          v-model="tool.toolsIn"
          :rules="[(v) => !!v || 'Antall inne er påkrevd']"
          label="Antall inne"
          required
        ></v-text-field>
        <v-text-field
          v-model="tool.toolsTotal"
          :rules="[(v) => !!v || 'Antall totalt påkrevd']"
          label="Antall totalt"
          required
        ></v-text-field>
        <v-text-field
          v-model="tool.description"
          :rules="[(v) => !!v || 'Description is required']"
          label="Description"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveTool">Legg til</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Tutorial.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newTool">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import ToolService from "../services/ToolService";

export default {
  name: "add-tool",
  data() {
    return {
      tool: {
        id: null,
        toolName: "",
        toolsIn:0,
        toolsTotal:0,
        description: ""
      },
      submitted: false,
    };
  },
  methods: {
    saveTool() {
      var data = {
        toolName: this.tool.toolName,
        toolsIn: this.tool.toolsIn,
        toolsTotal: this.tool.toolsTotal,
        description: this.tool.description,
      };
      console.log(data);
      ToolService.add(data)
        .then((response) => {
          this.tool.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newTool() {
      this.submitted = false;
      this.tool = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>