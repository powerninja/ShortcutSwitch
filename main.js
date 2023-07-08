const { app, Menu, Tray, BrowserWindow } = require('electron');
const { PythonShell } = require('python-shell');
const path = require('path');
const fs = require('fs');
const { Buffer } = require('node:buffer');

let tray = null; // ここでtrayを宣言

app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname, 'appのコピー.png')); // ここでtrayに値を代入
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { type: 'separator' },
    { label: 'Other', type: 'radio' },
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);

  // Read the .lnk file as binary
  fs.readFile('/Users/konishitakuto/Downloads/AD.lnk', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const hexData = data.toString('hex');
    // console.log(data.toString('hex'));
    const buf = Buffer.from(hexData, 'hex');
    const str = buf.toString('utf8');
    console.log(str); // Outputs: "hello world"
  });

  app.on('window-all-closed', (event) => {
    // デフォルトの挙動を抑制する
    event.preventDefault();
  });
});
