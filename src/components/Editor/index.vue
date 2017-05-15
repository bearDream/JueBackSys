<template>
  <!--<div>-->
    <!--<textarea  ref="content">{{ value }}</textarea>-->
  <!--</div>-->
  <div id="editor-container">
    <div id="editor-trigger" ref="editor">
    </div>
    <hr>
    <!--<p><b>以下是编辑器的内容：</b></p>-->
    <!--<p>{{ editorContent }}</p>-->
  </div>
</template>

<script>
  import 'wangeditor'
//  import 'kindeditor/themes/default/default.css'
//  import _consts from './utils/consts'

  const Wangeditor = window.wangEditor

  export default {
    name: 'editor',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    mounted () {
//      const vm = this

//      const options = {
//        width: '100%',
//        height: 500,
//        items: _consts.ITEMS,
//        afterChange: function () {
//          vm.$emit('change', this.html())
//        }
//      }

      this.$nextTick(() => {
//        this.editor.config.menus = _consts
//        this.editor = wangeditor.create(this.$refs.content, {...options})
        var self = this
        // 创建编辑
        var editor = new Wangeditor('editor-trigger')
        editor.onchange = function () {
          // onchange 事件中更新数据
//          self.editorContent = editor.$txt.html()
          self.$emit('change', this.$txt.html())
        }
        editor.config.menus = [
          'source',
          '|',     // '|' 是菜单组的分割线
          'bold',
          'underline',
          'italic',
          'strikethrough',
          'eraser',
          'forecolor',
          'bgcolor',
          '|',
          'img'
        ]
        editor.create()
//        this.editor = wangeditor.create()
      })
    },
    methods: {
      html (html) {
        this.editor.html(html)
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
