<template>
  <div class="app-container dashboard-editor-container">
    <!--<github-corner class="github-corner" />-->

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <!--<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
    <!--<line-chart :chart-data="lineChartData" />-->
    <!--</el-row>-->

    <!--<el-row :gutter="32">-->
    <!--<el-col :xs="24" :sm="24" :lg="8">-->
    <!--<div class="chart-wrapper">-->
    <!--<raddar-chart />-->
    <!--</div>-->
    <!--</el-col>-->
    <!--<el-col :xs="24" :sm="24" :lg="8">-->
    <!--<div class="chart-wrapper">-->
    <!--<pie-chart />-->
    <!--</div>-->
    <!--</el-col>-->
    <!--<el-col :xs="24" :sm="24" :lg="8">-->
    <!--<div class="chart-wrapper">-->
    <!--<bar-chart />-->
    <!--</div>-->
    <!--</el-col>-->
    <!--</el-row>-->

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" style="padding-right:8px;">
        <div style="background-color:#fff;padding:24px 24px 48px 24px;">
          <img src="../../../assets/other_image/lishi.png" style="margin:0 12px 4px 0;vertical-align: middle;">
          <span style="font-size:18px;">区块链版权存证历史</span>
        </div>
        <transaction-table />
      </el-col>
      <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
      <!--<todo-list />-->
      <!--</el-col>-->
      <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
      <!--<box-card />-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import TransactionTable from './components/TransactionTable'

// const lineChartData = {
//  newVisitis: {
//    expectedData: [100, 120, 161, 134, 105, 160, 165],
//    actualData: [120, 82, 91, 154, 162, 140, 145]
//  },
//  messages: {
//    expectedData: [200, 192, 120, 144, 160, 130, 140],
//    actualData: [180, 160, 151, 106, 145, 150, 130]
//  },
//  purchases: {
//    expectedData: [80, 100, 121, 104, 105, 90, 100],
//    actualData: [120, 90, 100, 138, 142, 130, 130]
//  },
//  shoppings: {
//    expectedData: [130, 140, 141, 142, 145, 150, 160],
//    actualData: [120, 82, 91, 154, 162, 140, 130]
//  }
// }

export default {
  name: 'DashboardAdmin',
  components: {
    //    GithubCorner,
    PanelGroup,
    //    LineChart,
    //    RaddarChart,
    //    PieChart,
    //    BarChart,
    TransactionTable
    //    TodoList,
    //    BoxCard
  },
  data() {
    return {
      //      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 24px;
  background-color: rgb(240, 242, 245);
  position: relative;
  height: calc(100vh - 112px);

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
