<template>
  <div class="app-container">
    <h3 align="center">申请公证</h3>
    <el-form ref="form" size="large" :model="form" :rules="rules" label-width="150px" class="form">
      <el-form-item label="作品名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入作品名称" />
      </el-form-item>
      <el-form-item label="作者名称" prop="author">
        <el-input v-model="form.author" placeholder="请输入作者名称" />
      </el-form-item>
      <el-form-item label="公证书份数" type="number" prop="count">
        <el-input-number v-model="form.count" :min="3" :max="1000" label="份数" />
        <div style="font-size: smaller;color: red;margin-bottom: -20px;padding-bottom: 0">默认免费份数为3份，每增加一份，之江公证处加收￥50，最少3份，最多1000份</div>

      </el-form-item>
      <el-form-item label="收件人姓名" prop="receiver">
        <el-input v-model="form.receiver" placeholder="请输入收件人姓名" />
      </el-form-item>
      <el-form-item label="收件人手机号码" prop="receiverPhoneNum">
        <el-input v-model="form.receiverPhoneNum" placeholder="请输入收件人手机号码" />
      </el-form-item>
      <el-form-item label="收件人联系地址" prop="receiverAddr">
        <el-cascader
          v-model="form.receiverAddr"
          size="large"
          :options="options"
          placeholder="请选择联系地址"
        />
      </el-form-item>
      <el-form-item label="详细地址" prop="addrDetail">
        <el-input v-model="form.addrDetail" placeholder="请输入详细地址" />
      </el-form-item>
      <el-form-item label="备注" prop="comment">
        <el-input v-model="form.comment" placeholder="请备注快递公司名称" />
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button style="width: 150px">返回</el-button>
        <el-button type="primary" style="width:150px; margin-left: 50px" @click="submit">申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'

export default {
  name: 'Evidence',
  data() {
    return {
      options: regionData,
      form: {
        name: '',
        author: '',
        count: 3,
        receiver: '',
        receiverPhoneNum: '',
        receiverAddr: [],
        addrDetail: '',
        comment: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请输入作品名称' }],
        author: [{ required: true, trigger: 'blur', message: '请输入作者姓名' }],
        count: [{ required: true, trigger: 'blur', message: '请输入公证书份数' }],
        receiver: [{ required: true, trigger: 'blur', message: '请输入收件人姓名' }],
        receiverPhoneNum: [{ required: true, trigger: 'blur', message: '请输入收件人手机号码' }],
        receiverAddr: [{ required: true, trigger: 'blur', message: '请选择收件人地址' }],
        addrDetail: [{ required: true, trigger: 'blur', message: '请输入详细地址' }],
        comment: [{ required: true, trigger: 'blur', message: '请输入快递公司名称' }]
      }
    }
  },
  methods: {
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$message.success('申请成功')
          console.log(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.form{
  width: 700px;
  margin: 50px auto;
}
</style>
