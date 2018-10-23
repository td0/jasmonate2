<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <v-card>
        <v-card-title class="headline">Connected</v-card-title>
        <v-card-text>
          <p>
            {{ connected }}
          </p>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title class="headline">DHCP</v-card-title>
        <v-card-text>
          {{ dhcp }}
        </v-card-text>
      </v-card>
    </v-flex>
    <v-btn
      :show="fabVisible"
      color="pink"
      dark
      fixed
      bottom
      right
      fab
      @click="fetch"
    >
      <v-icon>refresh</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import { db } from '@/services/fireinit.js'

export default {
  data () {
    return {
      connected: '',
      dhcp: '',
      fabVisible: true
    }
  },

  mounted () {
    this.getConnected()
    this.getDhcp()
  },

  methods : {
    fetch () {
      let dtime = Date.now()
      let uid = 'td0'
      db.ref('fetch/'+uid).set({
        data: 'all',
        time: dtime
      })
      .then(() => {
        this.getConnected()
        this.getDhcp()
      })
    },

    getConnected () {
      db.ref('data/connected').once('value')
      .then(snap => {
        this.connected = snap.val()
      })
    },

    getDhcp () {
      db.ref('data/dhcp').once('value')
      .then(snap => {
        this.dhcp = snap.val()
      })
    }
  }
}
</script>
