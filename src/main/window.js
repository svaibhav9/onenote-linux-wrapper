const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");
let win;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function key(seq) {
    return new Promise((resolve, reject) => {

        console.log("xdotool:", seq);

        exec(`xdotool key --delay 120 ${seq}`, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });

    });
}

async function runSequence(sequence) {

    for (const k of sequence)
        await key(k);

}

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

let currentTool = "pen";
let switching = false;

const PEN_SEQUENCE = [
    "Tab",
    "Tab",
    "Tab",
    "Tab",
    "Tab",
    "Tab",
    "ctrl+shift+F6",
    "ctrl+shift+F6",
    "d",
    "p"
];

const ERASER_SEQUENCE = [
    "ctrl+F6",
    "ctrl+F6",
    "d",
    "e",
    "e"
];

ipcMain.on("onenote-tool", async (_event, tool) => {

    if (!win)
        return;

    if (switching)
        return;

    if (tool === currentTool)
        return;

    switching = true;

    try {

        currentTool = tool;

        //console.log("Switch to:", tool);


    await runSequence(PEN_SEQUENCE);

    } catch (err) {

        console.error(err);

    } finally {

        switching = false;

    }

});

module.exports = {
    createMainWindow
};
