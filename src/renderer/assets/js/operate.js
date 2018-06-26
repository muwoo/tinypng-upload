/**
 * @user monkeywang
 * @author muwoo
 * Date: 2018/6/26
 */
import tinify from 'tinify'
import fs from 'fs'
import axios from 'axios'

class Operate {
  constructor (options) {
    this.options = options
  }

  getCompressFile (path) {
    tinify.key = this.options.apiKey
    return new Promise((resolve, reject) => {
      let sourceData = fs.readFileSync(path)
      tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
        if (err instanceof tinify.AccountError) {
          reject(err)
          return new Notification('compress filed', {
            body: 'Verify your API key and account limit.'
          })
        } else if (err instanceof tinify.ServerError) {
          reject(err)
          return new Notification('compress filed', {
            body: 'Temporary issue with the Tinify API.'
          })
        } else if (err instanceof tinify.ConnectionError) {
          reject(err)
          return new Notification('compress filed', {
            body: 'A network connection error occurred.'
          })
        } else {
          resolve({compressFile: resultData, distSize: parseInt(resultData.length / 1024)})
        }
      })
    })
  }

  async upload (file) {
    return axios.post(this.options.action, {
      filed: new Blob([file]),
      ...this.options.data
    }, {
      transformRequest: [function (data) {
        let formData = new FormData()

        Object.keys(data).forEach((key) => {
          formData.append(key, data[key])
        })
        return formData
      }],
      headers: {
        ...this.options.headers
      },
      withCredentials: this.options.credentials
    })
  }
}

export default Operate
