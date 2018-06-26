/**
 * @user monkeywang
 * @author muwoo
 * Date: 2018/6/26
 */
let options = {
  height: 600,
  width: 900,
  show: false,
  frame: true,
  center: true,
  fullscreenable: false,
  title: 'tinypng-upload',
  vibrancy: 'ultra-dark',
  transparent: false,
  webPreferences: {
    backgroundThrottling: false
  }
}

if (process.platform === 'win32') {
  options.show = true
  options.frame = false
  options.backgroundColor = '#3f3c37'
}

export default options
