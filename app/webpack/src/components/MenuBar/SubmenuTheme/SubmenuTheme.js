module.exports = {
  props: ['lib', 'status', 'config', 'progress'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      themes: [],
      $modal: null,
      $list: null
    }
  },
  watch: {
    'themes': function () {
      if (Array.isArray(this.themes) && this.themes.length > 0) {
        this.initDefaultTheme()
        this.initModal()
      }
    },    
    'progress.display': function () {
      if (this.progress.display === true 
              && this.config.debug.openTheme === true) {
        setTimeout(() => {
          this.open()
        }, 1000)
      }
    }
  },  // watch: {
  //computed: {
  //},
  mounted: function () {
    //this.initSelect()
    this.themes = this.config.themes
  },
  methods: {
    initModal: function () {
      let _this = this
      if (this.$modal === null || this.$modal === undefined) {
        this.$modal = window.$(`
      <div class="ui basic modal" id="SubmenuThemeModal">
        <i class="close icon"></i>
        <div class="header">Themes</div>
        <div class="content">
          <div class="ui list theme-list">
          </div>
        </div>
      </div>`).appendTo('body')
        this.$modal.modal('hide')

        this.$list = this.$modal.find('.theme-list:first')
        
        this.themes.forEach(theme => {
          let item = window.$(`<a class="theme-item" href="#" tabindex="0"></a>`)
                  .appendTo(this.$list)
          item.attr('data-theme', theme)
          item.css('background-color', theme)
          item.attr('title', `Change theme: ${theme}`)
          if (theme === this.status.theme) {
            item.addClass('current')
          }
          item.click(function () {
            _this.status.theme = this.getAttribute('data-theme')
            _this.close()
          })
        })
        
        //console.log(this.$list.length)
      }
      return this
    },
    initDefaultTheme: function () {
      //console.log('initTheme')
      let min = 0
      let max = this.config.themes.length - 1
      let id = Math.floor(Math.random() * (max - min + 1)) + min;
      this.status.theme = this.config.themes[id]
      return this
    },
    open: function () {
      this.$modal.modal('show', () => {
        this.$modal.find('.theme-item.current').focus()
      })
      return this
    },
    close: function () {
      this.$modal.modal('hide')
      return this
    },
  }
}