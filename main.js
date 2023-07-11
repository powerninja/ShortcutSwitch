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
    // Convert the Shift_JIS string to UTF-8
    const utf8String = iconv.encode(sjisString, 'UTF-8').toString();
    // Create a regular expression to match the UNC path
    // console.log('sjisString', sjisString);

    // うまくいった
    // const regex = /192\.168\.254\.6\\Company\\00_AA(?:[^\\]*\\)*/;
    //これもうまくいった
    const regex = /192\.168\.254\.6\\Company\\00_部門別.*?(?=\\\\|$)/;

    // Search for the UNC path
    const match = sjisString.match(regex);
    const matchResult = match[0];
    console.log(matchResult, 'matchResult');

    if (matchResult) {
      // console.log(match[0]); // prints the matched string
      const cutPosition = matchResult.indexOf('x');

      console.log(matchResult.length, 'cutPosition.length');

      if (cutPosition !== -1) {
        const newString = matchResult.substring(0, cutPosition + 41); // +2 to include the two backslashes
        console.log(newString, 'newString');
        let rrr = '';
        for (let i = 0; i < matchResult.length; i++) {
          if (matchResult.charAt(i)) {
            rrr += matchResult.charAt(i);
          } else {
            break;
          }
          console.log(i, matchResult.charAt(i));
        }
        console.log(rrr, 'rrr');
        console.log(matchResult.charAt(155));
      } else {
        console.log('No double backslashes found');
      }
    } else {
      console.log('No match found');
    }

    // console.log(utf8String);
  });

  app.on('window-all-closed', (event) => {
    // デフォルトの挙動を抑制する
    event.preventDefault();
  });
});
