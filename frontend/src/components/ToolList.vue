<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="toolName" label="Search by Tool name"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchName">
        Søk
      </v-btn>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn small @click="addTool">
        Legg til verktøy
      </v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Utstyr</v-card-title>

        <v-data-table
          :headers="headers"
          :items="tools"
          disable-pagination
          :hide-default-footer="true"
          
        >
        
          <template v-slot:[`item.actions`]="{ item }" >
            
            <v-icon small class="mr-2" @click="editTool(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="toolDetails(item.id)">info</v-icon>
            <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
          
          </template>
          
        </v-data-table>

        <v-card-actions v-if="tools.length > 0">
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ToolService from "../services/ToolService";
export default {
  name: "tool-list",
  data() {
    return {
      tools: [],
      toolName: "",
      headers: [
        { text: "Navn på utstyr", align: "start", sortable: false, value: "toolName" },
        { text: "Antall inne", value: "toolsIn", sortable: false },
        { text: "Antall totalt", value: "toolsTotal", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    getTools() {
      ToolService.getAll()
        .then((response) => {
          this.tools = response.data.map(this.getDisplayTool);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.getTools();
    },
    toolDetails(id) {
      //this.highlightClickedRow(value);
      console.log("Tool id "+id);
      
      this.$router.push({ name: "tool-detail", params: { id: id } });
    },
    searchName() {

      console.log(this.toolName);
      ToolService.findByName(this.toolName)
        .then((response) => {
          console.log(response.data);
          this.tools = response.data.map(this.getDisplayTool);
          
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addTool() {
      this.$router.push({name:"addTool"});
    },
    editTool(id) {
      console.log("Tool id "+id);
      this.$router.push({ name: "tool-edit", params: { id: id } });
    },

    

    getDisplayTool(tools) {
      return {
        id : tools.id,
        toolName: tools.toolName,
        toolsIn: tools.toolsIn,
        toolsTotal: tools.toolsTotal,
      };
    },
  },
  mounted() {
    this.getTools();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>