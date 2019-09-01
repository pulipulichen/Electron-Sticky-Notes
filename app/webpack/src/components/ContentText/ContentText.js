module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      
    }
  },
  computed: {
    displayContentText: function () {
      let contentText = this.status.contentText
      return contentText
    }
  },
  methods: {
  }
}