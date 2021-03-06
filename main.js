const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Flash
app.commandLine.appendSwitch('ppapi-flash-path', __dirname + '/PepperFlash/PepperFlashPlayer.plugin');
app.commandLine.appendSwitch('ppapi-flash-version', '22.0.0.209');

function createWindow () {
  var zoomFactors = [ 1.0, 0.75 ];
  var zoomFactorsWidth = [ 672, 504 ];
  var zoomFactorsHeight = [ 503, 411 ];

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: zoomFactorsWidth[1],
    height: zoomFactorsHeight[1],
    frame: true,
    resizable: true,
    alwaysOnTop: true,
    webPreferences: {
      zoomFactor: zoomFactors[1]
    }
  });

  // 動的にタイトルを書き換える
  // https://www.xplatform.rocks/2015/05/06/when-electrons-window-settitle-keeps-driving-you-crazy/
  // mainWindow.webContents.on('did-finish-load', () => {
  //   mainWindow.setTitle(app.getTitle());
  // });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  var cookieForNiconico = {
    url: 'http://www.nicovideo.jp',
    name: 'lang',
    value: 'ja-jp'
  };

  var cookieForYoutube = {
    url: 'https://.youtube.com',
    name: 'PREF',
    value: 'al=ja&hl=ja'
  };

  mainWindow.webContents.session.cookies.set(cookieForNiconico, function(error) {
    if (error) {
      console.log(error);
    }
  });

  mainWindow.webContents.session.cookies.set(cookieForYoutube, function(error) {
    if (error) {
      console.log(error);
    }
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
