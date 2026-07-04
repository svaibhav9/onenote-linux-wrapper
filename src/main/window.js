const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");
let win;

function createMainWindow() {

    win = new BrowserWindow({

        width: 1500,
        height: 950,
        icon: path.join(__dirname, "icon.png"),

        autoHideMenuBar: true,

        webPreferences: {
            preload: path.join(__dirname, "../preload/preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
            nodeIntegrationInSubFrames: true
        }

    });

    win.loadURL("https://www.onenote.com");

    win.webContents.setWindowOpenHandler(({ url }) => {

        win.loadURL(url);
        return { action: "deny" };

    });

    // DevTools sirf development mein
    // win.webContents.openDevTools();

}

module.exports = {
    createMainWindow
};
