<template>
  <div>
    <div id="upload-area">
      <Upload
        class="upload"
        multiple
        :name="formSetting.filed"
        type="drag"
        :headers="formSetting.headers"
        :on-success="success"
        :before-upload="handleUpload"
        :data="formSetting.data"
        :with-credentials="formSetting.credentials"
        :action="formSetting.action">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="80" style="color: #3399ff"></Icon>
          <p>点击或拖拽上传</p>
          <div slot="tip">1231231</div>
        </div>
      </Upload>
    </div>

  </div>
</template>
<script>
  import fs from 'fs'
  import path from 'path'
  import {ipcRenderer} from 'electron'
  import Operate from '../assets/js/operate'

  let listen = false
  let isCompress = false

  export default {
    data () {
      return {
        appPath: '',
        filePath: '',
        operate: null,
        fileList: [],
        formSetting: {
          action: '',
          data: {},
          headers: {}
        }
      }
    },
    mounted () {
      this.appPath = this.$electron.remote.app.getPath('userData')
      this.filePath = path.join(this.appPath, './setting.json')
      try {
        this.formSetting = JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
        this.operate = new Operate(this.formSetting)
        if (!listen) {
          listen = true
          ipcRenderer.on('upload', async (event, file) => {
            let originFile = file.file
            if (file.compress) {
              originFile = await this.operate.getCompressFile(file.path)
            }
            let res = await this.operate.upload(originFile)
            this.success(res.data)
          })
          ipcRenderer.on('compress', (event, compress) => {
            isCompress = compress
          })
        }
      } catch (e) {
      }
    },
    methods: {
      async handleUpload (file) {
        if (!isCompress) {
          return true
        }
        // let originFile = await this.operate.getCompressFile(file.path)
        file = await this.operate.getCompressFile(file.path)
        // let res = await this.operate.upload(originFile)
        // this.success(res.data)
        return true
      },
      success (res) {
        let successInfo = new Notification('upload success', {
          body: 'Click the message, copy the link to the clipboard'
        })
        successInfo.onclick = () => {
          if (res.msg) {
            this.$electron.clipboard.writeText(res.msg)
          }
        }
      }
    }
  }
</script>
<style lang="less" type="text/less">
  .ivu-upload.upload {
    background-color: rgba(0, 0, 0, 0);
    .ivu-upload-list-file>span {
      color: #fff;
      i {
        color: #ffffff;
      }
    }
    .ivu-upload-drag {
      background-color: rgba(0, 0, 0, 0);
      width: 100%;
      height: 350px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      p {
        color: #ffffff
      }
    }
  }
</style>
