module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      themes: []
    }
  },
  watch: {
    'themes': function () {
      if (Array.isArray(this.themes) && this.themes.length > 0) {
        
        console.log('a')
        this.initSelect()
      }
    },
    'status.theme': function () {
      window.$(this.$refs.ThemeDropdownContainer).find('.ui.dropdown.selection').css('background-color', this.status.theme)
    }
  },  // watch: {
  //computed: {
  //},
  mounted: function () {
    //this.initSelect()
    this.themes = this.config.themes
  },
  methods: {
    initSelect: function () {
      window.$(this.$refs.ThemeDropdown).dropdown()
      
      setTimeout(() => {
        //console.log(window.$(this.$refs.ThemeDropdownContainer).find('.menu .item[data-value]').length)
        window.$(this.$refs.ThemeDropdownContainer).find('.menu .item[data-value]').each((i, div) => {
          div = window.$(div)
          div.css('border-color', div.attr('data-value'))
        })
      }, 0)
        
    }
  }
}