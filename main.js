const { app, Menu, Tray, BrowserWindow } = require('electron');
const { PythonShell } = require('python-shell');
const path = require('path');

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
});

app.on('window-all-closed', (event) => {
  // デフォルトの挙動を抑制する
  event.preventDefault();
});

function parseLnk(lnkFilePath) {
  // Run the Python script and get the result via a Promise
  return new Promise((resolve, reject) => {
    PythonShell.run('parse_lnk.py', { args: [lnkFilePath] }, (err, results) => {
      if (err) reject(err);
      else resolve(results[0]); // Results is an array, we only need the first value
    });
  });
}

// Just for testing purposes
parseLnk('/path/to/your/lnkfile.lnk').then(console.log).catch(console.error);
