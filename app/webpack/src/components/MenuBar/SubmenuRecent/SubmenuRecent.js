module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      recentFileList: []
    }
  },
  //watch: {
  //},  // watch: {
  //computed: {
  //},
  mounted: function () {
    //this.initSelect()
    //this.themes = this.config.themes
    window.$(this.$refs.Submenu).dropdown({
      allowTab: false
    })
    
    this.updateRecentFileList()
  },
  methods: {
    updateRecentFileList: function () {
      this.recentFileList = [
        {
          'filename': '201909140505.tmp.txt',
          'content': 'aaa'
        },
        {
          'filename': '201909140506.tmp.txt',
          'content': 'bbb'
        },
        {
          'filename': '201909140507.tmp.txt',
          'content': 'ccc'
        },
        {
          'filename': '201909140508.tmp.txt',
          'content': 'ddd'
        },
        {
          'filename': '201909140505.tmp.txt',
          'content': 'aaa'
        },
        
      ]
    }
  }
}