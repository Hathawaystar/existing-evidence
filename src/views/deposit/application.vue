<template>
  <div class="app-container" style="padding-bottom: 24px; overflow: auto">
    <h4 class="head emphasis"> 作品文件上传 </h4>
    <div v-for="(item, index) in works" :key="index" class="form-container body-container work">
      <el-row type="flex" align="middle">
        <el-col :span="6" class="emphasis">作品{{ indexMap[index] }}</el-col>
        <el-col :span="18">
          <el-form :ref="`workForm${index}`" :model="works[index]" :rules="workRules" label-width="80">
            <el-form-item label="作品名称:" prop="name" required>
              <el-input v-model="item.name" style="width: 330px" />
            </el-form-item>
            <el-form-item label="作品种类:" prop="type" required>
              <el-select v-model="item.type" style="width: 330px" placeholder="请选择">
                <el-option
                  v-for="(opt, idx) in workTypeOptions"
                  :key="idx"
                  :label="opt"
                  :value="idx"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="作品描述:" prop="description">
              <el-input v-model="item.description" type="textarea" style="width: 400px" :rows="3" />
            </el-form-item>
            <el-form-item prop="fileId">
              <el-upload
                drag
                :limit="1"
                :accept="uploadAccept(index)"
                :action="uploadAction"
                :on-exceed="() => handleUploadExceed(index)"
                :on-success="(res) => handleUploadSuccess(index, res)"
                :on-error="(err) => handleUploadError(index, err)"
                :on-remove="(file) => handleFileRemove(index, file)"
                :before-upload="(file) => beforeUpload(index, file)"
              >
                <img src="../../assets/shangchuan.png" style="margin-top: 24px" alt="upload">
                <div class="el-upload__text">拖动上传或打开文件上传</div>
                <div slot="tip" class="el-upload__tip upload-tip" v-text="uploadTip" />
              </el-upload>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div v-if="works.length > 1" class="close-button">
        <i class="el-icon-close" @click="works.splice(index, 1)" />
      </div>
    </div>

    <div v-if="works.length < 6" class="add-container body-container" @click="handleAddWork">
      <img src="../../assets/tianjia.png" alt="add">
      <span class="add-button-text">添加新作品</span>
    </div>

    <h4 class="head emphasis"> 作品基本信息 </h4>
    <div class="form-container body-container info">
      <el-form ref="infoForm" :model="info" :rules="infoRules" label-width="80" style="width: 400px; margin: 0 auto">
        <el-form-item label="权利归属" prop="ownerShip" required>
          <el-radio-group v-model="info.ownerShip">
            <el-radio :label="0">个人作品</el-radio>
            <el-radio :label="1">合作作品</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="作者名称" prop="author" required>
          <el-input v-model="info.author" style="width: 330px" />
        </el-form-item>
      </el-form>
    </div>

    <div class="body-container footer">
      <el-button type="info" class="footer-btn cancel-btn" @click="$router.go(-1)">取 消</el-button>
      <el-button type="primary" class="footer-btn submit-btn" @click="handleSubmit">提 交</el-button>
    </div>
  </div>
</template>

<script>

const defaultWork = {
  name: undefined,
  type: undefined,
  description: undefined,
  fileId: undefined
}
const defaultWorkInfo = {
  ownerShip: undefined,
  author: undefined
}

export default {
  name: 'DepositApplication',
  data() {
    return {
      works: [Object.assign({}, defaultWork)],
      info: Object.assign({}, defaultWorkInfo),

      workRules: {
        name: [{ required: true, message: '请输入作品名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择作品类型', trigger: 'blur' }],
        fileId: [{ required: true, message: '请上传作品文件', trigger: 'blur' }]
      },
      infoRules: {
        ownerShip: [{ required: true, message: '请选择权利归属', trigger: 'blur' }],
        author: [{ required: true, message: '请输入作者名称', trigger: 'blur' }]
      },

      workTypeOptions: ['文档', '图片', '音频', '视频'],
      indexMap: ['一', '二', '三', '四', '五', '六'],
      uploadTip: '说明:\n' +
        '1.上传单个文件大小不超过100M\n' +
        '2.文件格式必须符合条件，支持上传格式: txt、md、doc、docx、pdf、png、jpg、jpeg、mp3、mp4、avi\n',
      uploadAction: 'https://jsonplaceholder.typicode.com/posts', // TODO
      fileAccepts: [
        ['.txt', '.md', '.doc', '.docx', '.pdf'],
        ['.png', '.jpg', '.jpeg'],
        ['.mp3'],
        ['.mp4', '.avi']
      ]
    }
  },
  methods: {
    uploadAccept(index) {
      if (typeof this.works[index].type !== 'undefined') {
        return this.fileAccepts[this.works[index].type].join(',')
      }
      return this.fileAccepts.join(',')
    },
    handleUploadExceed(index) {
      this.$notify({
        title: '上传数超出上限',
        message: this.$createElement('span', { style: 'color: teal' }, `请删除作品${this.indexMap[index]}已上传的文件后重试，或添加新作品`)
      })
    },
    beforeUpload(index, file) {
      const ext = file.name.substring(file.name.lastIndexOf('.'))
      let type
      if (typeof this.works[index].type === 'undefined') {
        // no type selected, check all
        for (let i = 0; i < this.fileAccepts.length; i++) {
          if (this.fileAccepts[i].indexOf(ext) !== -1) {
            type = i
            break
          }
        }
      } else if (this.fileAccepts[this.works[index].type].indexOf(ext) !== -1) {
        // selected type and passed check
        type = this.works[index]
      }
      if (typeof type === 'undefined') {
        this.$notify({
          title: `不支持的${this.works[index].type ? this.workTypeOptions[this.works[index].type] : '文件'}类型`,
          message: this.$createElement('span', { style: 'color: teal' }, '请检查上传作品类型')
        })
        return false
      }
      if (file.size / 1024 / 1024 > 100) {
        this.$notify({
          title: '文件大小超出上限',
          message: this.$createElement('span', { style: 'color: teal' }, `作品${this.indexMap[index]}大小超出上限`)
        })
        return false
      }
      const workForm = this.$refs[`workForm${index}`][0]
      if (!workForm) return false
      workForm.clearValidate('fileId')
      this.works[index].type = type
    },
    handleUploadSuccess(index, res) {
      // TODO
      this.works[index].fileId = 1
    },
    handleUploadError(index, err) {
      if (err.message && typeof err.message === 'string') err = err.message
      else err = '未知错误'
      this.$notify({
        title: '文件上传失败',
        message: this.$createElement('span', { style: 'color: teal' }, `作品${this.indexMap[index]}上传失败：${err}`)
      })
    },
    handleFileRemove(index, file) {
      // TODO
    },
    handleAddWork() {
      if (this.works.length < 6) this.works.push(Object.assign({}, defaultWork))
    },
    handleSubmit() {
      const promises = []
      for (let i = 0; i < this.works.length; i++) {
        const workForm = this.$refs[`workForm${i}`][0]
        if (!workForm) return
        promises.push(workForm.validate())
      }
      const infoForm = this.$refs['infoForm']
      if (!infoForm) return
      promises.push(infoForm.validate())
      Promise.all(promises).then(() => {
        this.submit()
      }).catch()
    },
    submit() {
      // TODO
      alert('fuck u')
    }
  }
}
</script>

<style scoped>
.head {
  padding: 48px 0 0 48px;
  margin: 0;
}

.emphasis {
  font-weight: 400;
  font-size: 1.2em;
}

.body-container {
  margin: 24px 200px 24px;
  width: 800px;
}

.form-container {
  border: 1px solid #9ea8b1;
  border-radius: 5px;
}

.work {
  position: relative;
  padding: 24px 128px 24px 48px;
}

.info {
  padding: 24px 0;
}

::v-deep.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before {
  margin-left: -10px;
}

::v-deep .el-upload-dragger{
  width: 400px;
  height: 120px;
  border: 1px solid #DCDFE6;
}

.upload-tip {
  white-space: pre-wrap;
  width: 420px;
  line-height: 20px;
}

.close-button {
  position: absolute; top: 12px; right:12px; font-size: 24px; color: #5c5e62; cursor: pointer;
}

.add-container {
  display: flex; align-items: center; justify-content: center; cursor: pointer;
}

.add-button-text {
  margin-left: 24px; color: gray; font-weight: 500;
}

.footer {
  display: flex; align-items: center; justify-content: center;
}

.footer-btn {
  width: 120px; height: 40px;
}

.cancel-btn {
  margin-right: 48px;
}

.submit-btn {
  margin-left: 48px;
  background-color: #10429a;
  border-color: #10429a;
}
</style>
