const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function(event){
    const { remote } = require('electron')
    var window = remote.getCurrentWindow()
    window.close()
})