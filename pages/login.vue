<template>
  <v-card class="login-card">
    <v-alert
      :value="authError"
      type="error">
      {{ authErrorMsg }}
    </v-alert>
    <v-flex text-xs-center>
      <br>
      <img
        src="/jasmine128.png"
        alt="Jasmonate"
        class="login-logo">
      {{ testVar }}
    </v-flex>

    <v-card-text
      class="pt-4">
      <div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          />
          <v-text-field
            v-model="password"
            :append-icon="e1 ? 'visibility' : 'visibility_off'"
            :type="e1 ? 'text' : 'password'"
            :rules="passwordRules"
            label="Password"
            min="8"
            required
            @click:append="() => (e1 = !e1)"
          />
          <v-layout justify-space-between>
            <v-spacer />
            <v-btn
              :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
              @click="submit">
              Login
            </v-btn>
          </v-layout>
        </v-form>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { auth } from '../services/fireinit.js'

export default {
  layout: 'lo-login',
  data() {
    return {
      valid: false,
      e1: false,
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      authError: false,
      authErrorMsg: '',
      testVar: ''
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signIn', {
          email: this.email,
          password: this.password
        }).then(user => {
          this.authError = false
          this.clear()
          this.$router.push('/')
        }).catch((e) => {
          this.authError = true
          this.authErrorMsg = e.code === 'auth/user-not-found' ? 'Email/Password Incorrect!' : e.message
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
.login-card {
  margin-top: "20px"
}
</style>

