module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      
    }
  },
  //watch: {
  //},  // watch: {
  //computed: {
  //},
  mounted: function () {
    //this.initSelect()
    //this.themes = this.config.themes
  },
  methods: {
    
  }
}