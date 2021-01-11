<template>
  <div class="login-container">
    <div class="logo">
      <img src="../../assets/login_image/logo.png" alt="">
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">账号登录</h3>
      </div>

      <div class="login-content">
        <el-form-item prop="username">
          <span class="svg-container">
            <!--<svg-icon icon-class="user" />-->
            <img src="../../assets/other_image/yonghu.png">
          </span>
          <span>用户名：</span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入手机号"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <!--<svg-icon icon-class="password" />-->
              <img src="../../assets/other_image/mima.png">
            </span>
            <span>密 <b style="display:inline-block;width:6px;" /> 码：</span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
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

        <el-form-item prop="remember">
          <el-checkbox ref="remember" v-model="loginForm.remember" name="remember" value="1" />
          <span>记住密码</span>
        </el-form-item>

        <el-form-item>
          <el-button style="width:25%;background-color:#a1a1a1;color:#fff;margin:6px 0 0 15%;" @click="registerPage">注册</el-button>
          <el-button :loading="loading" style="margin:0 0 30px 25%; background-color:#10429a;color:#fff;width:25%;" @click="handleLogin">登录</el-button>
        </el-form-item>

      </div>

    </el-form>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名必填'))
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
      loginForm: {
        username: 'admin',
        password: '123456',
        remember: 0
      },
      loginRules: {
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
        console.log(1, route.query, route.query.redirect)
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
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

    registerPage() {
      console.log(1)
      this.$router.replace('/register')
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
      width: 320px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 65%;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color:#fff !important;

      input {
        //background: transparent;
        //border: 0px;
        //-webkit-appearance: none;
        //border-radius: 0px;
        //padding: 12px 5px 12px 15px;
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
      margin-bottom: 10px;
      //border: 1px solid rgba(255, 255, 255, 0.1);
      //background: rgba(0, 0, 0, 0.1);
      //border-radius: 5px;
      //color: #454545;
    }
    .el-form-item__error{
      top: 86% !important;
      left: 94px !important;
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
      width: 460px;
      max-width: 100%;
      height: 313px;
      padding: 0 35px;
      margin: 0 auto;
      position: fixed;
      top: 28%;
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
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      margin-right:6px;

      img{
        vertical-align: middle;
      }
    }

    .title-container {
      position: relative;

      .title {
        font-size: 18px;
        color: #333333;
        margin: 36px auto 26px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 26px;
      top: 7px;
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
