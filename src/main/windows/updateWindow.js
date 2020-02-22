import { LOAD_URL } from './../config'
const miniWinURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#update`
  : `${LOAD_URL}#update`
const previewIcon = process.env.NODE_ENV === 'development' ? 'static/images/tray.ico' : `${global.__static}/images/tray.ico`
let updateWindow
const createUpdateWindow = function (BrowserWindow) {
  if (updateWindow) return false
  let obj = {
    icon: previewIcon,
    height: 420,
    minHeight: 420,
    width: 340,
    minWidth: 340,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: process.env.NODE_ENV === 'development',
    transparent: process.platform !== 'linux',
    alwaysOnTop: true,
    // parent: global.mainWindow,
    // modal: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
      navigateOnDragDrop: true
      // devTools: false
    }
  }
  updateWindow = new BrowserWindow(obj)
  updateWindow.loadURL(miniWinURL)

  updateWindow.on('ready-to-show', () => {
    updateWindow.show()
  })
  updateWindow.on('closed', () => {
    updateWindow = null
  })
  return updateWindow
}
export default createUpdateWindow
