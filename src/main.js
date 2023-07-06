const { app, Menu, Tray } = require('electron');

let tray = null;
app.whenReady().then(() => {
  tray = new Tray('/path/to/my/icon');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { type: 'separator' },
    { label: 'Other', type: 'radio' },
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
});
