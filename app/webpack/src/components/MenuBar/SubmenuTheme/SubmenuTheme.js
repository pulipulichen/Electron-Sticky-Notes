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
        this.initTheme()
        this.initSelect()
      }
    },
    'status.theme': function () {
      window.$(this.$refs.ThemeDropdownContainer).find('.ui.dropdown.selection').css('background-color', this.status.theme)
      //window.$(this.$refs.ThemeDropdownContainer).find('.ui.dropdown.selection .menu').css('max-height', `calc(100vh - ${this.config.menuBarHeight}px - 40px)`)
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
        
    },
    initTheme: function () {
      //console.log('initTheme')
      let min = 0
      let max = this.config.themes.length - 1
      let id = Math.floor(Math.random() * (max - min + 1)) + min;
      this.status.theme = this.config.themes[id]
      return this
    }
  }
}