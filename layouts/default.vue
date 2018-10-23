<template>
  <v-app dark>
    <v-navigation-drawer
      :disable-resize-watcher="false"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :to="item.to"
          :key="i"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title"/>
      <v-spacer />
      <v-toolbar-items >
        <v-btn
          flat
          @click="logout">
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <v-spacer />
      <span>td0 &copy; 2018</span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: null,
      fixed: true,
      items: [
        { icon: 'apps', title: 'Devices List', to: '/' },
        { icon: 'bubble_chart', title: 'Users List', to: '/inspire' }
      ],
      miniVariant: false,
      title: 'Jasmonate 2'
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('signOut').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
