<template>

  <div v-if="currentTool" >
    <p class="headline">Informasjon om verktøy</p>

    <v-card
    class="mx-auto" tile>
    <v-card-title>Detailjer om verktøy</v-card-title>
 
    <v-card-text>
        
    <p>Navn på verktøy: {{ currentTool.toolName }} </p>
    <p>Verktøy inne: {{ currentTool.toolsIn }} </p> 
    <p>Verktøy totalt: {{ currentTool.toolsTotal }} </p>
    <p>Beskrivelse:<br> {{ currentTool.description }} </p>  
    </v-card-text>
    <v-card-actions>
      <v-btn
        textcolor="teal accent-4"
        @click=editTool(currentTool.id)>
        Endre verktøy
      </v-btn>
    </v-card-actions>

  </v-card>
<v-row align="center" class="list px-3 mx-auto">
    
  <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Låneoversikt til {{ currentTool.toolName }}</v-card-title>

        <v-data-table
          :headers="headers"
          :items="borrows"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTool(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteTool(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

      </v-card>
  </v-col >
</v-row>
  </div>

  <div v-else>
    <p>Ingen verktøy valgt</p>
    
  </div>






</template>

<script>
import ToolService from "../services/ToolService";
import BorrowService from "../services/BorrowService";

export default {
  name: "toolinfo",
  data() {
    return {
      currentTool: null,
      borrows: [],
      headers: [
        { text: "Navn på student", align: "start", sortable: false, value: "studentName" },
        { text: "Antall", value: "itemCount", sortable: false },
        { text: "Levert dato", value: "deliveredDate", sortable: false },
        { text: "Leveringsfrist", value: "deadlineDate", sortable: false }
      ]
    };
  },
  methods: { 
    getTool(id) {
    
      ToolService.get(id)
        .then((response) => {
          this.currentTool = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editTool(id) {
      this.$router.push({ name: "tool-edit", params: { id: id } });
    },
    getToolBorrow(id){
        console.log("Tool id: "+id)
        BorrowService.getAllByTool(id)
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
        studentName: borrow.Student.firstName+" "+borrow.Student.lastName,
        itemCount: borrow.itemCount,
        deliveredDate: borrow.deliveredDate,
        deadlineDate: borrow.deadlineDate
      };
      },
  },
      mounted() {
          console.log(this.$route.params.id);
    this.message = "";
    this.getTool(this.$route.params.id);
    this.getToolBorrow(this.$route.params.id)
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>