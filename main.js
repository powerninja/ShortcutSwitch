const { app, Menu, Tray, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const path = require('path');
  let tray = new Tray(path.join(__dirname, 'favicon.svg.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { type: 'separator' },
    { label: 'Other', type: 'radio' },
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
});
