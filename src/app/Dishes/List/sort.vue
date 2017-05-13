<template>
  <div class="sort">
    <bheader-components></bheader-components>
    <i-table border :columns="columns1" :data="data1">
    </i-table>
  </div>
</template>

<script>
  import bheader from '@/components/bHeader'

  export default {
    name: 'sort',
    components: {
      bheaderComponents: bheader
    },
    data () {
      return {
        columns1: [
          {
            title: '序号',
            key: 'id'
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '类型',
            key: 'type'
          },
          {
            title: '时间',
            key: 'time'
          }
        ],
        data1: [
          {
            id: '',
            name: '',
            type: '',
            time: ''
          },
          {
            id: '',
            name: '',
            type: '',
            time: ''
          },
          {
            id: '',
            name: '',
            type: '',
            time: ''
          },
          {
            id: '',
            name: '',
            type: '',
            time: ''
          },
          {
            id: '',
            name: '',
            type: '',
            time: ''
          },
          {
            id: '',
            name: '',
            type: '',
            time: ''
          },
          {
            id: '',
            name: '',
            type: '',
            time: ''
          }
        ]
      }
    }
  }
</script>
