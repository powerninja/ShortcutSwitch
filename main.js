const { app, Menu, Tray, BrowserWindow } = require('electron');
const { PythonShell } = require('python-shell');
const path = require('path');
const fs = require('fs');
const { Buffer } = require('node:buffer');
const iconv = require('iconv-lite');

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
  fs.readFile('/Users/konishitakuto/Downloads/AD2', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // Convert the binary data to a string
    const binaryString = Buffer.from(data, 'binary').toString('binary');
    // Convert the string to Shift_JIS
    const sjisString = iconv.decode(Buffer.from(binaryString, 'binary'), 'Shift_JIS');

    // うまくいった
    // const regex = /192\.168\.254\.6\\Company\\00_AA(?:[^\\]*\\)*/;

    //バックスラッシュの後ろがnull文字とされているので、null文字が出てくるまでの文字列を取得する

    //AD2の場合
    // const regex = /192\.168\.254\.6\\Company.*?(?=\\\0|$)/;

    //AD.linの場合
    const regex = /\\192\.168\.254\.6\\Company.*?(?=\\\0|$)/;

    // 192.168.254.6~バックスラッシュnull文字まで抽出する
    const match = sjisString.match(regex);
    if (match) {
      const matchResult = match[0];
      console.log(matchResult, 'matchResult');
    } else {
      console.log('No match found');
    }

    // if (matchResult) {
    //   const cutPosition = matchResult.indexOf('x');

    //   if (cutPosition !== -1) {
    //     const newString = matchResult.substring(0, cutPosition + 41); // +2 to include the two backslashes
    //     console.log(newString, 'newString');
    //     let rrr = '';
    //     for (let i = 0; i < matchResult.length; i++) {
    //       if (matchResult.charAt(i) === '\0') {
    //         break;
    //       } else {
    //         rrr += matchResult.charAt(i);
    //       }
    //     }
    //   } else {
    //     console.log('No double backslashes found');
    //   }
    // } else {
    //   console.log('No match found');
    // }
  });

  app.on('window-all-closed', (event) => {
    // デフォルトの挙動を抑制する
    event.preventDefault();
  });
});
