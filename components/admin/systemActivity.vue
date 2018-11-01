<template>
  <div>
    <p>Состояние сервера: <span v-if="server_state">Работает</span>
      <span v-else>Заболел</span></p>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    mounted () {
      this.$store.dispatch('check_server')
    },
    computed: {
      ...mapState(['server_state'])
    }
  }
</script>

<style scoped>

</style>
