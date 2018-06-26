import {dialog, Menu, Tray} from 'electron'
import path from 'path'
import pkg from '../../../package.json'
import fs from 'fs'

function createTray (window) {
  let compress = false
  let appIcon = new Tray(path.join(__static, './upload-t.png'))

  appIcon.on('drop-files', async function (e, files) {
    for (let path of files) {
      let fileBuffer = fs.readFileSync(path)
      let options = {
        file: fileBuffer,
        path: path,
        compress,
        originSize: parseInt(fileBuffer.length / 1024),
        targetSize: 0
      }
      window.webContents.send('upload', options)
    }
  })

  let contextMenu = Menu.buildFromTemplate([
    {
      label: '启用图片压缩',
      type: 'radio',
      click () {
        compress = true
        window.webContents.send('compress', compress)
        appIcon.setImage(path.join(__static, './upload.png'))
      }
    },
    {
      label: '关闭图片压缩',
      type: 'radio',
      checked: true,
      click () {
        compress = false
        window.webContents.send('compress', compress)
        appIcon.setImage(path.join(__static, './upload-t.png'))
      }
    },
    {
      label: '粘贴',
      role: 'paste'
    },
    {
      label: '关于',
      click () {
        dialog.showMessageBox({
          title: 'img-upload',
          message: 'img-upload',
          detail: `Version: ${pkg.version}\nAuthor: muwoo`
        })
      }
    },
    {
      role: 'quit',
      label: '退出'
    }
  ])
  appIcon.on('click', () => {
    appIcon.popUpContextMenu(contextMenu)
  })
}

export default createTray
