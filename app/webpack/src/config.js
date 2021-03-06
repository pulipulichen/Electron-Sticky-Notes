module.exports = {
  debug: {
    useTestContentText: false,
    useTestPlainTextFile: false,
    useTestCodeFile: false,
    useTestImageStaticFile: false,
    useTestImageViewerFile: false,
    useTestRichFormatTextFile: false,
    openSubmenu: false,
    openRecent: false,
    openTheme: false
  },
  
  locale: 'zh-TW',
  maxHeightRatio: 0.7,
  minHeightPx: 400, // 因為加入了new跟empty
  maxWidthRatio: 0.5,
  minWidthPx: 390,
  menuBarHeight: 40,
  fontSizeRatio: 1,
  fontSizeAdjustInterval: 0.2,
  isPinTop: true,
  cacheAliveDay: 1,
  maxRecentFileListCount: 10, //
  
  // https://flatuicolors.com/palette/de
  themes: [
    '#fed330', '#26de81', '#2bcbba', '#fd9644', '#fc5c65',
    '#45aaf2', '#4b7bec', '#a55eea', '#d1d8e0', '#778ca3'
  ],
  
  
}
