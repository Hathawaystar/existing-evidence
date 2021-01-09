<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="applyRules" label-width="100px" class="form">
      <el-form-item label="网址" prop="url">
        <el-input v-model="form.url" placeholder="请输入网址" />
      </el-form-item>
      <el-form-item label="备注" prop="comment">
        <el-input v-model="form.comment" placeholder="请输入备注" />
      </el-form-item>
      <el-button type="primary" class="primary-button" style="float:right;width: 96px" @click="submit">提交</el-button>
    </el-form>
  </div>
</template>

<script>
// /^((https|http){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/

export default {
  name: 'Apply',
  data() {
    return {
      form: {
        url: '',
        comment: ''
      },
      applyRules: {
        url: [
          { required: true, trigger: 'blur', message: '请输入网址' },
          { required: true, trigger: 'blur', pattern: /^((https|http){0,1}(:\/\/){0,1})(www\.)?(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/, message: '请检查网址格式' }
        ]
      }
    }
  },
  methods: {
    submit() {
      console.log(this.form)
    }
  }

}
</script>

<style scoped>
  .form{
    width: 400px;
    margin: 100px auto;
  }
</style>
