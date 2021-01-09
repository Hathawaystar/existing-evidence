<template>
  <el-table
    :data="list"
    tooltip-effect="dark"
    style="width: 100%"
    :header-cell-style="{background: '#5893fa', color: '#fff'}"
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
    <!-- TODO: check if date is rendered correctly here -->
    <el-table-column
      prop="registeredAt"
      label="登记时间"
      align="center"
      show-overflow-tooltip
    />
    <el-table-column
      prop="notaryOrg"
      label="公证机构"
      align="center"
      show-overflow-tooltip
    />
    <el-table-column
      prop="notary"
      label="公证人"
      align="center"
      show-overflow-tooltip
    />
    <!-- TODO: check if date is rendered correctly here -->
    <el-table-column
      prop="notarizedAt"
      label="公证时间"
      align="center"
      show-overflow-tooltip
    />
    <el-table-column label="公证证书" align="center">
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
  name: 'NotarizationTable',
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
      // TODO: get notarization list
      // mock
      const total = 1
      this.list = [{ id: 1, name: 'test', author: 'me', registeredAt: '2021-01-04 21:00', notaryOrg: 'PKU', notary: 'me', notarizedAt: '2021-01-05 14:00' }]
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
