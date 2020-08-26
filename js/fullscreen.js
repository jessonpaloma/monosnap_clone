const local = document.getElementById('local')
const upload = document.getElementById('upload')

const electron = require('electron')
const fs = require("fs")
const screenshot = require('screenshot-desktop')
const shell = electron.shell
const {dialog} = require('electron').remote
const path = require('path')
const os = require('os')
const remote = require('electron')
const BrowserWindow = electron.remote.BrowserWindow;

local.addEventListener('click', function(e) {

  const { remote } = require('electron')
  var window = remote.getCurrentWindow()
  window.hide()

screenshot().then((img) => {

    let d = new Date()
    dialog 
                  .showSaveDialog({ 
                      title: "Save your screenshot locally", 
                  
                      // Default path to assets folder 
                      defaultPath: `FullScreen_Captured_${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}_${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}.png`, 
                  
                      // defaultPath: path.join(__dirname, 
                      // '../assets/image.jpeg'), 
                      buttonLabel: "Save", 
                  
                      // Restricting the user to only Image Files. 
                      filters: [ 
                          { 
                              name: "Image Files", 
                              extensions: ["png", "jpeg", "jpg"], 
                          }, 
                      ], 
                      properties: [], })
  
    .then((file) => {
      console.log("Screenshot succeeded");
      //const screenshotPath = path.join(os.tmpdir(), 'screenshot.png')
        
        fs.writeFile(file.filePath.toString(), img, function (error) {
          if (error) return console.log(error)
          shell.openExternal('file://' + file.filePath)
          const message = `Saved screenshot to: ${file.filePath}`
          console.log(message)
  
  
    })
  })

      
    window.show()
    
  })

})

upload.addEventListener('click', function(e) {
    
    let win = new BrowserWindow({ 
      width: 400, 
      height: 225,
      frame: false,
      webPreferences: {
          nodeIntegration: true}  
      })
  
      win.on('close', function() { 
        win = null
        window.show()
      })
      win.loadURL('http://localhost:3000/')
      win.show()
      //win.webContents.openDevTools()  

      const { remote } = require('electron')
      var window = remote.getCurrentWindow()
      window.hide()

     
      
    
  })





  

  


