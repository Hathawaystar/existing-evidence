<template>
  <el-table
    :data="list"
    tooltip-effect="dark"
    style="width: 100%"
    :header-cell-style="{ background: '#5893fa', color: '#fff'}"
  >
    <el-table-column
      prop="name"
      label="作品名称"
      align="center"
      show-overflow-tooltip
    />
    <el-table-column
      prop="author"
      label="作者名称"
      align="center"
      show-overflow-tooltip
    />
    <!-- TODO: check if returned date is rendered correctly here -->
    <el-table-column
      prop="registeredAt"
      label="登记时间"
      align="center"
      show-overflow-tooltip
    />
    <el-table-column
      prop="status"
      label="登记状态"
      align="center"
    />
    <el-table-column label="查看详情" align="center">
      <!-- eslint-disable-next-line-->
      <template slot-scope="scope">
        <!-- TODO: @click -->
        <el-link type="primary" style="color: #10429a" :underline="false" @click="()=>{}">查看证书</el-link>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <!-- eslint-disable-next-line-->
      <template slot-scope="scope">
        <!-- TODO: @click -->
        <div class="operate-container" @click="()=>{}">
          <img src="../../../assets/xiazai.png" height="14" alt="download" style="cursor: pointer">
          <el-link type="primary" :underline="false" style="margin-left: 5px; color: #10429a">下载</el-link>
        </div>
      </template>
    </el-table-column>
    <template slot="empty">暂无数据</template>
  </el-table>
</template>

<script>
export default {
  name: 'DepositTable',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // TODO: get deposit list
      // mock
      const total = 1
      this.list = [{ id: 1, name: 'test', author: 'me', registeredAt: '2021-01-04 21:00', status: 'unknown' }]
      this.$emit('fetched', total)
    }
  }
}
</script>

<style scoped>
.operate-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
