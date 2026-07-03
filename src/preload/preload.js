const { ipcRenderer } = require("electron");

console.log("=== PRELOAD LOADED ===", window.location.href);

window.addEventListener("pointerdown", (e) => {
    console.log("EVENT:", e.pointerType, e.button, e.buttons);

    if (e.pointerType !== "pen") return;

     console.log("PEN EVENT", {
             pointerType: e.pointerType,
        button: e.button,
        buttons: e.buttons,
        pressure: e.pressure});

    if (e.button === 0 && e.buttons === 1) {
        console.log("SEND PEN");
        ipcRenderer.send("onenote-tool", "pen");
    }

    if (e.button === 2 && e.buttons === 2) {
        console.log("SEND ERASER");
        ipcRenderer.send("onenote-tool", "eraser");
    }
}, true);
