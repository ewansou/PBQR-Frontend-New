const electron = require("electron");
const { app, BrowserWindow, globalShortcut } = electron;
const path = require("path");

const isDev = require("electron-is-dev");

let mainWindow = null;

app.on("ready", async () => {
  createWindow();
  mainWindow.on("focus", registerShortcuts);
  mainWindow.on("blur", unregisterShortcuts);
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

function registerShortcuts() {
  globalShortcut.register("ALT+ENTER", () => {
    var focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.setMenuBarVisibility(false);
      focusedWindow.setFullScreen(true);
    }
  });

  globalShortcut.register("ESC", () => {
    var focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.setFullScreen(false);
      focusedWindow.setMenuBarVisibility(true);
    }
  });
}

function unregisterShortcuts() {
  globalShortcut.unregister("ALT+ENTER", () => {});
  globalShortcut.unregister("ESC", () => {});
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    title: "PBQR - Instantly.sg",
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.on("page-title-updated", function (e) {
    e.preventDefault();
  });
}
