<template>
  <div class="app-container background">
    <h4 align="center">取证历史</h4>
    <div class="table-total">共{{ evidenceList.length }}条数据</div>
    <el-table :data="evidenceList" :header-cell-style="{'background-color':'#5893f9','color':'white'}">
      <el-table-column align="center" label="取证地址" prop="addr" />
      <el-table-column align="center" label="取证时间">
        <template slot-scope="{row}">
          {{ row.timestamp| parseTime('{y}-{m}-{d} {h}:{i}') }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" prop="comment" />
      <el-table-column align="center" label="操作">
        <template>
          <img src="../../assets/xiazai.png" height="14" alt="download" style="cursor: pointer">
          <el-link type="primary" :underline="false" style="margin-left: 5px; color: #10429a">下载</el-link>
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
  .table-total {
    margin: 28px 24px 42px;
    color: #8e8e8e;
    font-weight: 500;
  }
  .background{
    padding: 30px 0;
  }
</style>
