<template>
  <el-table :data="list" style="width: 100%;min-height:390px;padding: 0 24px 0 24px;">
    <el-table-column label="作品名称" min-width="400">
      <template slot-scope="scope">
        {{ scope.row.work_title }}
      </template>
    </el-table-column>
    <el-table-column label="作者名称" width="300" align="center">
      <template slot-scope="scope">
        {{ scope.row.author_name }}
      </template>
    </el-table-column>
    <el-table-column label="登记时间" width="300" align="center">
      <template slot-scope="scope">
        {{ scope.row.record_time }}
      </template>
    </el-table-column>
    <el-table-column label="登记状态" width="300" align="center">
      <template slot-scope="scope">
        {{ scope.row.record_status }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: [
        { 'work_title': '区块链版权存证', 'author_name': '杰特', 'record_time': '2021-01-04 14:00', 'record_status': '制证发证' },
        { 'work_title': '区块链取证', 'author_name': '罗伯特', 'record_time': '2020-12-24 09:00', 'record_status': '制证发证' },
        { 'work_title': '区块链取证', 'author_name': '罗伯特', 'record_time': '2020-12-24 09:00', 'record_status': '制证发证' },
        { 'work_title': '区块链取证', 'author_name': '罗伯特', 'record_time': '2020-12-24 09:00', 'record_status': '制证发证' }
      ]
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>
