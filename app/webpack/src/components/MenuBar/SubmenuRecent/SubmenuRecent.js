module.exports = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      //recentFileList: [],
      $modal: null,
      $list: null
    }
  },
  watch: {
    /*
    'status.isReady': function () {
      if (this.status.isReady === true) {
        this.open()
      }
    }
     */
  },  // watch: {
  //computed: {
  //},
  methods: {
    initModal: function () {
      if (this.$modal === null || this.$modal === undefined) {
        this.$modal = window.$(`
      <div class="ui modal" id="SubmenuRecentModal">
        <i class="close icon"></i>
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
      if (typeof(callback) !== 'function') {
        return false
      }
      
      this.initModal()
      
      this.getRecentFileList((recentFileList) => {
        this.$list.empty()
        let _this = this
        recentFileList.forEach(file => {
          let header = file.content
          let description = file.filename

          let item = window.$(`<div class="item">
                <div class="header">${header}</div>
                <div class="description">
                  ${description}
                </div>
              </div>`).appendTo(this.$list)

          item.attr('data-filename', file.filename)
          item.click(function () {
            let filename = this.getAttribute('data-filename')
            _this.openNote(filename)
          })
        }) 

        callback()
      })
      return this
    },
    getRecentFileList: function (callback) {
      if (typeof(callback) !== 'function') {
        return false
      }
      
      let recentFileList = [
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
      
      callback(recentFileList)
      return this
    },
    openNote: function (filename) {
      console.error('openNote', filename)
      
      return this
    }
  }
}