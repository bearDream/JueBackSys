<template>
  <div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      :action="action">
      <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
    </Upload>
    <Modal title="查看图片" v-model="visible">
      <img :src="imgURL" v-if="visible" style="width: 100%">
    </Modal>
    <div class="demo-upload-list" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
  </div>
</template>
<script>
  import consts from '@/utils/consts'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        defaultList: [],
        action: '',
        imgURL: '',
        visible: false,
        uploadList: []
      }
    },
    methods: {
      handleView (url) {
        this.imgURL = url
        this.visible = true
      },
      _remove (file) {
        console.info('_remove')
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
        console.info(this.$refs.upload)
      },
      handleRemove (file) {
        console.info(file)
        this._remove(file)
        this.$emit('on-change', null)
      },
      handleSuccess (res, file) {
        console.info(res)
        if (res.code === -1) {
          this.$Notice.error({
            title: '上传失败',
            desc: res.msg
          })
        } else {
          file.url = res.data
          file.name = ''

          console.info('..........')
          console.info(file)
          this.$emit('listenToChildEvent', file.url)

          this.$emit('on-change', file)
        }
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '图片格式不正确',
          desc: '图片 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        })
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        })
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5
        if (!check) {
          this.$Message.error('最多只允许五张图片！请删除已有图片后再上传')
        }
        return check
      }
    },
    created () {
      // 单文件上传接口是singleUpload   多文件上传则是MultiUpload
      let urlType = this.$store.getters.getUrlType
      let param = '?' + 'type=' + urlType
      this.$set(this, 'action', consts.UPLOAD_URL + '/singleUpload' + param)
      console.info(urlType)
      console.info(this.$store.getters.getBusinessname)
    },
    computed: mapState([
      'businessname'
    ]),
    watch: {
      // 当点击修改的时候，会将businessId赋值给add.businessId，并刺激formValidate的数据自动加载
      'businessname.businessname.businessCarouselImage': {
        handler (newVal) {
          let businessImage = newVal
          if (businessImage !== null && businessImage !== '') {
            let imageArr = []
            imageArr = businessImage.split(',')
            for (var i = 0; i < imageArr.length; i++) {
              imageArr[i] = {
                name: '',
                url: imageArr[i],
                percentage: 100,
                status: 'finished',
                uid: 100000 + i
              }
            }
            this.$set(this, 'uploadList', imageArr)
          }
        }
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    }
  }
</script>

<style src="./theme/styles/index.scss">
</style>
