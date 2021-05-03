<template lang="pug">
  #app
    component.layout( :is="layout" v-if="route" )
</template>

<style lang="sass">
  @import './sass/global'
</style>

<style lang="sass" scoped>
  #app, .layout
    width: 100%
</style>

<script>
  import DefaultLayout from '@/layouts/Default'

  export default {
    components: {
      DefaultLayout,
    },

    computed: {
      route () {
        return this.$router.options.routes.find(
          ({ name }) => name === this.$route.name,
        )
      },

      layout () {
        return (this.route && this.route.layout) || DefaultLayout
      },
    },
  }
</script>
