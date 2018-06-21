<template>
    <button class="navbar-toggle" @click="toggleCollapse">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
</template>
<script>
export default {
  name: 'collapse-button',
  data () {
    return {

    }
  },
  computed: {
    isCollapse () {
      return this.$store.state.menu.isCollapse
    }
  },
  methods: {
    toggleCollapse () {
      this.$store.dispatch('setCollapse', !this.isCollapse)
    }
  }
}
</script>

<style lang="scss" scoped>
  button.navbar-toggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 60px;
    height: 60px;
    border:none;
    outline: none;
    background: transparent;
    cursor: pointer;
    transition: all .3s ease;
    &:hover {
      background: rgba(0,0,0,.2)
    }
    .icon-bar {
      display: block;
      width: 22px;
      height: 2px;
      border-radius: 1px;
      background: #fff;
      transition: all .3s ease;
      & +.icon-bar {
        margin-top: 4px;
      }
    }
  }
</style>
