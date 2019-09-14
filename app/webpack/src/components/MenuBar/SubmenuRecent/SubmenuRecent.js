module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      recentFileList: [],
      $modal: null,
      $list: null
    }
  },
  watch: {
    'status.isReady': function () {
      if (this.status.isReady === true) {
        this.open()
      }
    }
  },  // watch: {
  //computed: {
  //},
  methods: {
    initModal: function () {
      if (this.$modal === null || this.$modal === undefined) {
        this.$modal = window.$(`
      <div class="ui modal ">
        <div class="header">Recent Notes</div>
        <div class="content">
          <div class="ui list recent-list">
            <div class="item">
              <div class="header">Header</div>
              <div class="description">
                Click a link in our <a>description</a>.
              </div>
            </div>
            <div class="item">
              <a class="header">Learn More</a>
              <div class="description">
                Learn more about this site on <a>our FAQ page</a>.
              </div>
            </div>
          </div>
        </div>
      </div>`).appendTo('body')
        this.$modal.modal('hide')

        this.$list = this.$modal.find('.recent-list:first')
        //console.log(this.$list.length)
      }
      return this
    },
    open: function () {
      this.updateRecentFileList(() => {
        this.$modal.modal('show')
      })
      return this
    },
    close: function () {
      this.$modal.modal('hide')
      return this
    },
    updateRecentFileList: function (callback) {
      this.initModal()
      this.recentFileList = [
        {
          'filename': '201909140505.tmp.txt',
          'content': 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
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
      
      this.$list.empty()
      this.recentFileList.forEach(file => {
        let header = file.content
        let description = file.filename
        
        this.$list.append(`<div class="item">
              <div class="header">${header}</div>
              <div class="description">
                ${description}
              </div>
            </div>`)
      }) 
      
      if (typeof(callback) === 'function') {
        callback()
      }
      return this
    }
  }
}