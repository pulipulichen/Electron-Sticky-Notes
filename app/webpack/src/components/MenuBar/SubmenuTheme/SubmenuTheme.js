module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      
    }
  },
  //computed: {
  //},
  mounted: function () {
    window.$(this.$refs.Submenu).dropdown()
  },
  //methods: {
  //}
}