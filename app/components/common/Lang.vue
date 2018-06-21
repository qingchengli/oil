<template>
  <el-container direction="vertical">
    <router-view name="header"></router-view>
    <el-container>
      <router-view name="aside"></router-view>
      <el-main>
        <router-view name="main"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import logged from '@/mixin/logged'

export default {
  name: 'lang',
  mixins: [
    logged
  ],
  computed: {
    language () {
      return this.$store.state.lang.language
    },
    langParam () {
      return this.$route.params.lang
    }
  },
  watch: {
    language (newVal, oldVal) {
      this.changeTitle()
      this.changeUrl(newVal, oldVal)
      this.setLanguage()
    },
    langParam (val) {
      this.loadLanguage(val)
      this.setLanguage()
    }
  },
  methods: {
    loadLanguage (lang) {
      if (lang) {
        this.$store.dispatch('setLanguage', lang)
      } else {
        this.$store.dispatch('setLanguage', this.language)
      }
    },
    setLanguage () {
      this.$i18n.locale = this.language
    },
    changeTitle () {
      document.title = this.$t(this.$route.meta.title)
    },
    changeUrl (newVal, oldVal) {
      let oldUrl = this.$route.fullPath
      let newUrl = oldUrl.replace(`/${oldVal}/`, `/${newVal}/`)
      this.$router.push(newUrl)
    }
  },
  mounted () {
    this.loadLanguage(this.langParam)
    this.setLanguage()
    this.changeTitle()
  },
  updated () {
    this.changeTitle()
  }
}
</script>
