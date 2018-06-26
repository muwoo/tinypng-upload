<template>
  <div class="settings">
    <Form :label-width="150" :model="formSetting" label-position="right" ref="formValidate" :rules="ruleValidate">
      <FormItem label="Api Key" prop="apiKey">
        <Input v-model="formSetting.apiKey" placeholder="Tiny PNG api key"></Input>
      </FormItem>
      <FormItem label="headers">
        <Input v-model="formSetting.headers" :rows="3" placeholder="Upload request header." type="textarea"></Input>
      </FormItem>
      <FormItem label="action" prop="action">
        <Input v-model="formSetting.action" placeholder="Upload request URL, required."></Input>
      </FormItem>
      <FormItem label="name">
        <Input v-model="formSetting.name" placeholder="The key in upload request targeting to the file."
               ></Input>
      </FormItem>
      <FormItem label="data">
        <Input v-model="formSetting.data" placeholder="Extra data with upload request." type="textarea" :rows="3"></Input>
      </FormItem>
      <FormItem label="with-credentials">
        <i-switch v-model="formSetting.credentials" size="large">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
      <FormItem>
        <Button long type="primary" @click="handleSubmit">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import fs from 'fs'
  import path from 'path'

  export default {
    data () {
      return {
        appPath: '',
        filePath: '',
        formSetting: {
          apiKey: '',
          action: '',
          headers: '{}',
          data: '{}',
          name: 'file',
          credentials: false
        },
        ruleValidate: {
          apiKey: [
            { required: true, message: 'The apiKey cannot be empty', trigger: 'blur' }
          ],
          action: [
            { required: true, message: 'The action cannot be empty', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.appPath = this.$electron.remote.app.getPath('userData')
      this.filePath = path.join(this.appPath, './setting.json')
      try {
        let module = JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
        module.headers = JSON.stringify(module.headers)
        module.data = JSON.stringify(module.data)
        this.formSetting = module
      } catch (e) {}
    },
    methods: {
      handleSubmit () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let module = {
              ...this.formSetting
            }
            /* eslint-disable */
            module.headers = eval(`(${this.formSetting.headers})`)
            module.data = eval(`(${this.formSetting.data})`)

            fs.writeFile(this.filePath, JSON.stringify(module), (err) => {
              if (err) {
                return new Notification('设置出错', {
                  body: err
                })
              } else {
                return new Notification('设置成功！')
              }
            })
          } else {

          }
        })


      }
    }
  }
</script>
<style lang="less" type="text/less">
  .settings {
    .ivu-form {
      padding: 0 40px;
    }
    .ivu-form .ivu-form-item-label {
      color: #ffffff;
      font-size: 16px;
    }
  }
</style>
