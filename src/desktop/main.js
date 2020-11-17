const { app, BrowserWindow } = require('electron');
const path = require('path')

let mainWindow;
let loadingScreen;

const createLoadingScreen = () => {
  loadingScreen = new BrowserWindow(Object.assign({
    width: 360,
    height: 480,
    frame: false,
    transparent: true,
    icon: __dirname + '/assets/icon.png'
  }));
  loadingScreen.setResizable(false);
  loadingScreen.loadFile('loading/index.html');
  loadingScreen.on('closed', () => loadingScreen = null);
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
    },
    show: false,
    frame: false,
    icon: __dirname + '/assets/icon.png'
  });

  mainWindow.loadURL('https://ott.vexcited.ml');

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  mainWindow.webContents.on('did-finish-load', () => {
    if (loadingScreen) {
      loadingScreen.close();
    }
    mainWindow.show();
    mainWindow.maximize()
  });
}

app.on('ready', () => {
  createLoadingScreen();
  createWindow();
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
