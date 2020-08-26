const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const ipc = electron.ipcRenderer


const videoRecorder = document.getElementById('videoRecorder')
videoRecorder.addEventListener('click', () => {
    const modalPath = path.join('file://',__dirname,'screenrecorder.html')

    let win = new BrowserWindow({transfarent:true,width:600 , height: 500, webPreferences: {
        nodeIntegration: true},resizable: false,  })

        win.on('close', function() { win = null})
        win.loadURL(modalPath)
        win.show()

})

const screenCapture = document.getElementById('screenCapture')
screenCapture.addEventListener('click', () => {
    const modalPath = path.join('file://',__dirname,'capture.html')

    let win = new BrowserWindow({transfarent:true,width:300 , height: 70, webPreferences: {
        nodeIntegration: true},resizable: false, frame: false  })

        win.on('close', function() { win = null})
        win.loadURL(modalPath)
        win.show()

})




const loginCloud = document.getElementById('loginCloud')
loginCloud.addEventListener('click', () => {
    

    let win = new BrowserWindow({transfarent:true,width:600 , height: 500, webPreferences: {
        nodeIntegration: true},resizable: false,  })

        win.on('close', function() { win = null})
        win.loadURL('https://facebook.com')
        win.show()

})