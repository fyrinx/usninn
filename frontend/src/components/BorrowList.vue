<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="name" label="Søk etter lån"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchBorrow">
        Søk
      </v-btn>
    </v-col>
    
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Låneliste</v-card-title>

        <v-data-table
          :headers="headers"
          :items="borrows"
          disable-pagination
          :hide-default-footer="true"
          @click:row="borrowDetails"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small @click="borrowDetails(item.id)">info</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="borrows.length > 0">
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import BorrowService from "../services/BorrowService";
export default {
  name: "borrow-list",
  data() {
    return {
      borrows: [],
      name: "",
      headers: [
        { text: "Verktøynavn", align: "start", sortable: false, value: "toolName" },
        { text: "Navn",sortable: false,value: "name"},
        { text: "Levert Dato", value: "deliveredDate", sortable: false },
        { text: "Frist Dato", value: "deadlineDate", sortable: false }
      ],
    };
  },
  methods: {
    getBorrows() {
      BorrowService.getAll()
        .then((response) => {
          this.borrows = response.data.map(this.getDisplayBorrow);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    borrowDetails(value) {
      
      //this.highlightClickedRow(value);
      this.$router.push({ name: "borrowrelated", params: { id: value.id } });
    },
    refreshList() {
      this.getBorrows();
    },

    searchBorrow() {
      BorrowService.findByName(this.name)
        .then((response) => {
          this.borrows = response.data.map(this.getDisplayBorrow);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayBorrow(borrow) {
      return {
        id: borrow.id,
        toolName: borrow.Tool.toolName,
        name: borrow.Student.firstName +" " +borrow.Student.lastName,
        deliveredDate: borrow.deliveredDate,
        deadlineDate: borrow.deadlineDate,
      };
    },
  },
  mounted() {
    this.getBorrows();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>