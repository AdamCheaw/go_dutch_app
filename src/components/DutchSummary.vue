<template lang="html">
  <v-layout row wrap mt-2>
    <v-flex offset-md2 md8 xs12>
      <v-btn block large color="primary" dark class="mb-2 title">
        <v-icon large>
          add
        </v-icon>
        Add Your Friend
      </v-btn>
      

      <v-card
        v-for="(bill,index) in dutchBills"
        :key="`bill-${index}`"
        elevation="5"
        class="pt-3 mb-2"
      >
        <div class=
          "headline font-weight-bold text-xs-center
          px-3 secondary--text"
        >
          {{bill.billTitle}}
          <v-divider class="mt-2"></v-divider>
        </div>
        <v-card-text class=
          " headline
            font-weight-bold
            text-md-center text-xs-center
            primary--text
          "
        >

          <v-icon class="primary--text">
            monetization_on
          </v-icon>
          NT {{bill.total}}
        </v-card-text>
        <v-card-actions>
          <v-list-tile class="grow">
            <v-list-tile-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                :src="require('../assets/user.png')"
              ></v-img>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Evan You</v-list-tile-title>
            </v-list-tile-content>

            <v-layout
              align-content-center
              justify-end
            >
            <v-btn icon
              :to="{path: '/adding/' + bill.id}"
            >
              <v-icon color="secondary">
                add
              </v-icon>
            </v-btn>
            <!-- menu btn -->
            <v-menu bottom left >
              <v-btn icon slot="activator" class="ml-1 mr-0">
                <v-icon color="secondary">
                  drag_indicator
                </v-icon>
              </v-btn>
              <v-list>
                <v-list-tile
                  key="1"
                >
                  <v-list-tile-title>click 1</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                  key="2"

                >
                  <v-list-tile-title>click 2</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <!-- end menu btn -->
            </v-layout>
          </v-list-tile>
        </v-card-actions>
      </v-card>
      <!-- <v-card
        elevation="5"
        class="pt-3 mb-2"
      >
        <v-card-text
          class=
          " headline
            font-weight-bold
            text-md-center text-xs-center
            primary--text
          "
        >
          <v-icon class="primary--text">
            monetization_on
          </v-icon>
          +NT 3000
        </v-card-text>

        <v-card-actions>
          <v-list-tile class="grow">
            <v-list-tile-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Evan You</v-list-tile-title>
            </v-list-tile-content>

            <v-layout
              align-content-center
              justify-end
            >
              <v-btn
                color="secondary"
              >
                see details
              </v-btn>
            </v-layout>
          </v-list-tile>
        </v-card-actions>
      </v-card> -->
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data:() => ({

  }),
  methods: {

  },
  computed: {
    dutchBills() {
      return this.$store.state.dutchBills
    }
  }
}
</script>

<style lang="css">
</style>
