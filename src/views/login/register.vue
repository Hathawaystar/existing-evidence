<template>
  <div class="login-container">
    <div class="logo">
      <img src="../../assets/login_image/logo.png" alt="">
    </div>
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">用户注册</h3>
      </div>

      <div class="login-content">
        <el-form-item prop="username">
          <span class="svg-container">
            <!--<svg-icon icon-class="user" />-->
            <img src="../../assets/other_image/yonghu.png">
          </span>
          <el-input
            ref="username"
            v-model="registerForm.username"
            placeholder="请输入手机号"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="code" style="width:60%;position:relative;">
          <span class="svg-container">
            <!--<svg-icon icon-class="user" />-->
            <img src="../../assets/other_image/yanzhengma.png">
          </span>
          <el-input
            ref="code"
            v-model="registerForm.code"
            placeholder="请输入验证码"
            name="code"
            type="text"
            tabindex="1"
            autocomplete="on"
            style="width:74%;"
          />
          <span style="display:inline-block;position:absolute;top:0;right:-97px;z-index:1000;width:60%;height:36.56px;border:1px solid #a1a1a1;border-radius:5px;">
            <img src="../../assets/other_image/yanzhengma.jpg" alt="" style="width:100%;height:34.56px;">
          </span>
        </el-form-item>
        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <!--<svg-icon icon-class="password" />-->
              <img src="../../assets/other_image/mima.png">
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="registerForm.password"
              :type="passwordType"
              placeholder="请输入登录密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>
        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="re_password">
            <span class="svg-container">
              <!--<svg-icon icon-class="password" />-->
              <img src="../../assets/other_image/mima.png">
            </span>
            <el-input
              :key="passwordType"
              ref="re_password"
              v-model="registerForm.re_password"
              :type="passwordType"
              placeholder="请确认登录密码"
              name="re_password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" style="margin-bottom:18px; background-color:#10429a;color:#fff;width:100%;" @click="handleRegister">完成</el-button>
        <p style="color:#10429a;margin:0 auto;margin-left:30%;font-size:12px;cursor:pointer;" @click="linkToLogin">已有账号？立即登录</p>
      </div>

    </el-form>

  </div>
</template>

<script>

export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('必填'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不少于6位'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        code: '',
        password: '',
        re_password: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.registerForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    linkToLogin() {
      console.log(1)
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .login-content {
      margin: 0 auto;
      width: 240px;
    }
    .el-input {
      display: inline-block;
      width: 80%;
      height:20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color:#fff !important;

      input {
        height:20px;
        background: transparent;
        border: 0px;
        //-webkit-appearance: none;
        border-radius: 0px;
        padding: 0;
        color: #a1a1a1;
        //height: 47px;
        //caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-checkbox {
      padding: 0 6px 6px 15px;
    }

    .el-form-item {
      margin-bottom: 18px;
      border: 1px solid #a1a1a1;
      //background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      //color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#a1a1a1;
  $light_gray:#eee;

  .login-container {
    position:relative;
    min-height: 100%;
    width: 100%;
    background: url('../../assets/login_image/bg_1.png') no-repeat center fixed;
    overflow: hidden;

    .logo>img{
      position:absolute;
      top:48px;
      left:48px;
      z-index:10000;
    }

    .login-form {
      width: 480px;
      max-width: 100%;
      height: 383px;
      padding: 0 35px;
      margin: 0 auto;
      position: fixed;
      top: 26%;
      left: 40%;
      right:0;
      bottom:0;
      z-index:1000;
      background-color: #fff;
      border-radius:4px;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding-left:12px;
      color: $dark_gray;
      //vertical-align: middle;
      width: 36px;
      display: inline-block;
      //margin-right:6px;
      img{
        vertical-align: middle;
      }
    }

    .title-container {
      position: relative;

      .title {
        font-size: 18px;
        color: #333333;
        margin: 24px auto 24px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 12px;
      top: 5px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>
