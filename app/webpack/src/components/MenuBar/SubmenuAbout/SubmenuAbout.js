
module.exports = {
  props: ['lib', 'status', 'config', 'progress'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  methods: {
    openProjectWebsite: function () {
      this.lib.ElectronHelper.openURL('https://github.com/pulipulichen/Electron-Sticky-Notes')
      return this
    },
    openIssue: function () {
      this.lib.ElectronHelper.openURL('https://github.com/pulipulichen/Electron-Sticky-Notes/issues')
      return this
    },
    openAuthorPage: function () {
      this.lib.ElectronHelper.openURL('http://blog.pulipuli.info/p/about_38.html')
      return this
    },
    openDonatePage: function () {
      this.lib.ElectronHelper.openURL('http://blog.pulipuli.info/p/donation.html')
      return this
    },
    submitNewIssue: function () {
      this.lib.ElectronHelper.openURL('https://github.com/pulipulichen/Electron-Sticky-Notes/issues/new')
      return this
    }
  }
}