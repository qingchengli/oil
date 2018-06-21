<template>
  <div>
    <span>{{`${$t('message.welcome')} ${username}`}}</span>
  </div>
</template>

<script>
export default {
  name: 'user-info',
  data () {
    return {

    }
  },
  computed: {
    username () {
      return this.$store.state.user.userInfo ? this.$store.state.user.userInfo.name : 'User'
    }
  }
}
</script>

<style lang="scss" scoped>
  div {
    margin: 0 -20px;
    font-size: 0px;
    line-height: 60px;
    color: #fff;
    span {
      display: inline-block;
      padding: 0 20px;
      line-height: 1;
      font-size: 16px;
      border-right: 1px solid #fff;
    }
  }
</style>
