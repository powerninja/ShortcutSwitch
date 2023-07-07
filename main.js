const { app, Menu, Tray, BrowserWindow } = require('electron');

let tray = null; // ここでtrayを宣言

app.whenReady().then(() => {
  const path = require('path');
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

//アプリが❌ボタンで閉じられても終了しない
app.on('window-all-closed', (event) => {
  // デフォルトの挙動を抑制する
  event.preventDefault();
});
