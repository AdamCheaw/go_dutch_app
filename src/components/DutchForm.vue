<template lang="html">
  <v-layout row wrap >
    <v-flex offset-md2 md8 xs12 >
      <v-tabs
        centered
        color="secondary"
        dark
        icons-and-text
        class="elevation-2"
      >
        <v-tabs-slider color="primary"></v-tabs-slider>
        <v-tab href="#tab-1">
          填寫
          <v-icon>create</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          目前填寫的記錄
          <v-badge color="red" overlap v-model="showBadge">
            <span slot="badge" class="text-xs-center">{{
              howManyRecords
            }}</span>
            <v-icon>description</v-icon>
          </v-badge>
        </v-tab>
        <v-tab-item value="tab-1" key="1">
          <v-card flat color="white">
            <v-card-text>
              <!-- form -->
              <div>
                <h1 class="text-xs-center mb-3">記下你的拆帳記錄！</h1>
                <v-text-field
                  v-model="record.title"
                  label="項目"
                  color="primary"
                  :rules="noEmpty"
                ></v-text-field>
                <v-combobox
                  v-model="record.payer"
                  :items="persons"
                  label="付款人"
                  color="primary"
                  :rules="noEmpty"
                ></v-combobox>
                <v-text-field
                  v-model="record.debt"
                  label="欠款人應付 (NT)"
                  color="primary"
                  type="number"
                  :rules="noEmpty"
                ></v-text-field>
                <v-textarea label="描述" color="primary"></v-textarea>
                <v-layout row xs12>
                  <!-- date 's input dialog -->
                  <v-flex xs6 sm6 md6>
                    <v-dialog
                      ref="dialog"
                      v-model="dateModal"
                      :return-value.sync="date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="日期"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" locale="zh-cn" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="dateModal = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.dialog.save(date)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <!-- time 's input dialog -->
                  <v-flex xs6 sm6 md6>
                    <v-dialog
                      ref="dialog"
                      v-model="timeModal"
                      :return-value.sync="time"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="time"
                          label="時間"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker v-if="timeModal" v-model="time" full-width>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="timeModal = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.dialog.save(time)"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
                <v-layout justify-end>
                  <v-btn
                    color="secondary"
                    v-on:click="clear"
                    :disabled="!canClear"
                  >
                    清空
                  </v-btn>
                  <v-btn
                    color="primary"
                    v-on:click="addRecord"
                    :disabled="!canSaveRecord"
                  >
                    新增
                  </v-btn>
                </v-layout>
              </div>
              <!-- end form -->
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- show all current add records -->
        <v-tab-item value="tab-2" key="2">
          <v-card flat>
            <v-card-text class="ma-sm-0 pa-sm-0">
              <v-layout justify-center>
                <h1 class="mt-3 primary--text">
                  {{ calculatedTotal }}
                  <!-- +NT 3000 -->
                  <v-icon large class="primary--text">
                    monetization_on
                  </v-icon>
                </h1>
              </v-layout>

              <v-list two-line subheader>
                <div v-for="(doc, index) in currentBills" :key="index">
                  <v-subheader v-if="doc.payer == 'I'">I Pay</v-subheader>
                  <v-subheader v-else>{{ doc.payer }} Pay</v-subheader>
                  <!-- for loop all the record -->
                  <v-list-tile
                    v-for="(record, index) in doc.records"
                    :key="`record-${index}`"
                    avatar
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>{{ record.title }}</v-list-tile-title>
                      <!-- show sub title -->
                      <v-list-tile-sub-title>
                        {{ record.createdAt }}
                        <!-- {{"( "+record.total+" / "+record.divide+" ) * "+record.debtorDivide}} -->
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <div class="Total" style="">
                      <!-- differentiate by color -->
                      <h3 v-if="isMe(doc.payer)" class="info--text">
                        +NT {{ calBill(record.debt) }}
                      </h3>
                      <h3 v-else class="error--text">
                        -NT {{ calBill(record.debt) }}
                      </h3>
                    </div>

                    <!-- menu btn -->
                    <v-menu bottom left>
                      <v-btn icon slot="activator" class="ml-1 mr-0">
                        <v-icon color="grey">
                          drag_indicator
                        </v-icon>
                      </v-btn>
                      <v-list>
                        <v-list-tile key="1">
                          <v-list-tile-title>click 1</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile key="2">
                          <v-list-tile-title>click 2</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                    <!-- end menu btn -->
                  </v-list-tile>
                  <!-- end for loop -->
                  <v-divider></v-divider>
                </div>
              </v-list>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <!-- end show all current records -->
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    // splitItem: ["/2", "/3", "/4", "/5"],
    // selectItem: [],
    persons: ["I", "Adam"],
    record: {
      payer: null, //是誰付錢
      debtor: null, //是誰欠錢
      title: null,
      debt: null //欠多少錢
      // divide: null,
      // payerDivide: null,
      // debtorDivide: null
    },
    currentBills: [
      // {
      //   payer: "I",
      //   debtor: "Adam",
      //   records: [
      //     {
      //       title: 'Food',
      //       total: 500,
      //       divide: 3,
      //       payerDivide: 1,
      //       debtorDivide: 2
      //     }
      //   ]
      // }
    ],
    divideDisabled: false,
    numberRules: [
      v => v != "" || "Value is required",
      v => Number(v) || "Value must be number"
    ],
    noEmpty: [v => v != "" || "Value is required"],
    date: new Date().toISOString().substr(0, 10),
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    dateModal: false,
    timeModal: false
  }),
  methods: {
    isMe: user => {
      if (user == "I") {
        return true;
      } else {
        return false;
      }
    },
    calBill: debt => {
      return Number(debt).toFixed(0);
    },
    addRecord() {
      //add the record to currentBills
      let debtor = this.persons.filter(person => person !== this.record.payer);
      // let divide = this.record.divide.replace("/", "");
      // let payerDivide = Number(this.record.payerDivide.replace("/" + divide, ""));
      // let debtorDivide = Number(divide) - payerDivide;
      let record = {
        title: this.record.title,
        debtor: debtor[0],
        payer: this.record.payer,
        debt: Number(this.record.debt),
        createdAt: this.date + " " + this.time
        // divide: Number(divide),
        // payerDivide: payerDivide,
        // debtorDivide: debtorDivide
      };
      //find the currentBills is exist same type of record
      let index = this.currentBills.findIndex(bill => {
        return bill.payer == this.record.payer && bill.debtor == debtor[0];
      });
      if (index == -1) {
        let currentBills = {
          payer: this.record.payer,
          debtor: debtor[0],
          records: [record]
        };
        this.currentBills.push(currentBills);
      } else {
        this.currentBills[index].records.push(record);
      }
      this.record.title = null;
    },
    // divideToSelect() { //according user pick divide and change
    //   let num = parseInt(this.record.divide.replace("/", ""));
    //
    //   if(Number.isInteger(num) && num < 10 && num > 1) {
    //     this.selectItem = [];
    //     for(let i = 0; i < num; i++) {
    //       this.selectItem.push(`${i+1}/${num}`);
    //     }
    //     this.divideDisabled = true;
    //   } else {
    //     this.divideDisabled = false;
    //     this.selectItem = [];
    //   }
    // },
    clear() {
      //clear all input value
      this.record.title = null;
      this.record.payer = null;
      this.record.debtor = null;
      this.record.debt = null;
      // this.record.divide = null;
      // this.record.payerDivide = null;
      // this.record.debtorDivide = null;
    }
  },
  computed: {
    calculatedTotal: function() {
      var calTotal = 0;
      this.currentBills.forEach(docs => {
        if (docs.payer == "I") {
          docs.records.forEach(record => {
            calTotal += record.debt;
            // calTotal = calTotal + this.calBill(
            //   record.total,
            //   record.divide,
            //   record.debtorDivide
            // );
            // console.log("total " + calTotal);
          });
        } else {
          docs.records.forEach(record => {
            calTotal -= record.debt;
            // calTotal = calTotal - this.calBill(
            //   record.total,
            //   record.divide,
            //   record.debtorDivide
            // );
          });
        }
      });
      return calTotal;
    },
    showBadge: function() {
      return this.currentBills.length > 0;
    },
    howManyRecords: function() {
      let sum = 0;
      this.currentBills.forEach(bill => {
        sum += bill.records.length;
      });
      return sum;
    },
    canSaveRecord: function() {
      // let {title,total,payer,divide,payerDivide} = this.record;
      // if(title !== "" && )
      return this.record.title && this.record.debt && this.record.payer;
    },
    canClear: function() {
      return this.record.title || this.record.total || this.record.payer;
    }
    // findDutchPersons() {//find the state.friends with the param.id
    //   let index = this.$store.state.dutchBills.find(doc => {
    //     return doc.id == this.$route.params.id
    //   })
    //   let bill = this.$store.state.dutchBills[index]
    //   let persons = this.$store.state.dutchBills[index].persons
    //   return persons
    // }
  }
};
</script>

<style lang="css" scoped>
h1 {
  color: #455A64
}
@media(max-width:960px) {
  .ma-sm-0 {
    margin:0;
  }
  .ma-sm-0 {
    padding:0;
  }
}
</style>
