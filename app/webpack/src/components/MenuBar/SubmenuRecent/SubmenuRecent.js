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
    'status.isReady': function () {
      if (this.status.isReady === true 
              && this.config.debug.openRecent === true) {
        setTimeout(() => {
          this.open()
        }, 1000)
      }
    }
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
        //console.log(recentFileList)
        
        this.$list.empty()
        let _this = this
        recentFileList.forEach(file => {
          let header = file.contentText
          let description = this.lib.ElectronFileHelper.basename(file.filePath)

          let content
          if (typeof(header) === 'string') {
            content = `<div class="header">${header}</div>
                  <div class="description">
                    ${description}
                  </div>`
          }
          else {
            content = `<div class="header">${description}</div>`
          }

          let item = window.$(`<div class="item">
                <i class="sticky note outline icon"></i>
                <div class="content">
                  ${content}
                </div>
              </div>`).appendTo(this.$list)

          item.attr('data-filepath', file.filePath)
          item.click(function () {
            let filePath = this.getAttribute('data-filepath')
            _this.openNote(filePath)
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
      
      /*
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
      */
      
      callback(this.status.recentFileList.slice(1))
      return this
    },
    
    openNote: function (filePath) {
      //console.error('openNote', filePath)
      //return
      this.lib.ipc.send('open-another-win', {
        filePath: filePath
      })
      return this
    }
  }
}