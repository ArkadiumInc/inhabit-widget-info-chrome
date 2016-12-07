module.exports = {
  // ADD ANY FILES / DIRECTORIES THAT NEEDS TO BE COPIED
  copyFiles: [
      'index.html',
      'devtools.html',
      'styles.css',
      'icon*.png',
      'manifest.json',
      {
          from: 'src/page_scripts/devtools/devtools.js',
          to : ''
      },
      {
          from: 'src/page_scripts/page_injectables/pageEventHandlers.js',
          to : ''
      },
      {
          from: 'src/page_scripts/page_injectables/pageResultsRetriever.js',
          to : ''
      }
      /*
      // copies file to dist
      'src/file.txt',

      // copies file to dist
      {
        from: 'src/file.txt',
        to  : ''
      },

      // copies directory to the given path inside dist
      {
        from: 'bower_components/thirdparty/folder',
        to  : 'vendor/thirdparty'
      }

      */

  ]
};
