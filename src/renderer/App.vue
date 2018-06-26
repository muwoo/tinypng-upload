<template>
  <div id="app">
    <Menu active-name="1" class="left-menu" @on-select="select" width="200px">
      <MenuItem name="1">
        <Icon type="ios-cloud-upload"></Icon>
        图片上传
      </MenuItem>
      <MenuItem name="2">
        <Icon type="settings"></Icon>
        压缩设置
      </MenuItem>
    </Menu>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.disableDragEvent()
    },
    methods: {
      disableDragEvent () {
        window.addEventListener('dragenter', this.disableDrag, false)
        window.addEventListener('dragover', this.disableDrag)
        window.addEventListener('drop', this.disableDrag)
      },
      disableDrag (e) {
        const dropzone = document.getElementById('upload-area')
        if (dropzone === null || !dropzone.contains(e.target)) {
          e.preventDefault()
          e.dataTransfer.effectAllowed = 'none'
          e.dataTransfer.dropEffect = 'none'
        }
      },
      select (name) {
        if (name === '1') {
          this.$router.push('/')
        }
        if (name === '2') {
          this.$router.push('/settings')
        }
      }
    },
    beforeDestroy () {
      window.removeEventListener('dragenter', this.disableDrag, false)
      window.removeEventListener('dragover', this.disableDrag)
      window.removeEventListener('drop', this.disableDrag)
    }
  }
</script>

<style lang="less" type="text/less">
  html, body {
    background-color: transparent;
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  #app {
    height: 100%;
    overflow-x: hidden;
    user-select: none;
    display: flex;
    padding: 20px;
    .view {
      padding: 20px;
      flex: 1;
      overflow: auto;
      box-sizing: border-box;
    }
    .left-menu {
      color: #ffffff;
      background-color: transparent;
      .ivu-icon {
        font-size: 22px;
        margin-right: 10px;
      }
      .ivu-menu-item {
        font-size: 18px;
        display: flex;
        align-items: center;
      }

      .ivu-menu-item:hover {
        background-color: rgba(0,0,0,0.2)
      }

    }
    .left-menu.ivu-menu-light:after {
      background-color: transparent
    }

  }
</style>
