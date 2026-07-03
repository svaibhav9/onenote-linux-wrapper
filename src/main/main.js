const { app } = require("electron");
const { createMainWindow } = require("./window");

app.whenReady().then(() => {
    createMainWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit();
});

const { ipcMain } = require("electron");

ipcMain.on("onenote-tool", (_event, tool) => {
    console.log("Switch to:", tool);
});
