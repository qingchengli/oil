export default {
  computed: {
    language () {
      return this.$store.state.lang.language
    },
    logged () {
      return this.$store.state.user.logged
    },
    roles () {
      return this.$store.state.user.roles
    }
  },
  watch: {
    logged (val) {
      this.loggedCheck(val)
    }
  },
  methods: {
    loggedCheck (val) {
      val || this.$router.push(`/${this.language}/login`)
    }
  },
  created () {
    if (this.logged) {
      if (this.roles.length === 0) {
        this.$store.dispatch('SetUser')
      }
    }
  }
}
