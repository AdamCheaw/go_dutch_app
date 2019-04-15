<template lang="html">
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
      <v-btn block large color="primary" dark class="mb-2 title" v-on="on">
        <v-icon large>
          add
        </v-icon>
        Add Your Friend
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="" style="border:1px solid black">
        <span class="headline">新增賬本</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                label="標題*"
                v-model="createTitle"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="名字*"
                v-model="createName"
                hint="xx"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <small>* 表示必填</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">
          關閉
        </v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click="createRecord"
          :disabled="!canSaveRecord"
        >
          儲存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db, auth } from "../connectfirebase.js";
export default {
  name: "CreatedRecordDialog",
  data: () => ({
    dialog: false,
    createTitle: "",
    createName: ""
  }),
  methods: {
    //insert a new record to firebase db
    createRecord() {
      db.ref("records").push({
        title: this.createTitle,
        person: this.createName,
        creator: auth.currentUser.uid, //current login user 's  uid
        total: 0,
        createdDate: new Date().toISOString()
      });
      this.dialog = false;
    }
  },
  computed: {
    canSaveRecord: function() {
      return this.createTitle && this.createName;
    }
  }
};
</script>

<style lang="css" scoped></style>
