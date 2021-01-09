<template>
  <div class="app-container">
    <h3>取证历史</h3>
    <el-table :data="evidenceList">
      <el-table-column label="取证地址" prop="addr" />
      <el-table-column label="取证时间">
        <template slot-scope="{row}">
          {{ row.timestamp| parseTime('{y}-{m}-{d} {h}:{i}') }}
        </template>
      </el-table-column>

      <el-table-column label="备注" prop="comment" />
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="text" @click="download(row)">
            <i class="el-icon-download" />
            下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      evidenceList: [{
        addr: '1234',
        timestamp: 1610092098666,
        comment: 'abc'
      }]
    }
  },
  methods: {
    download() {

    }
  }
}
</script>

<style scoped>

</style>
