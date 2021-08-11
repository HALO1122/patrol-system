<template>
  <div class="login-container">
    <el-form :model="loginForm" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">巡考系统</h3>
      </div>

      <span class="form-title pb10">巡考平台登录</span>
      <el-form-item prop="name" class="mt50">
        <span class="svg-container"><i class="ez-icon">&#xe677;</i></span>
        <el-input
          ref="name"
          v-model="loginForm.name"
          placeholder="登录账号"
          name="name"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container"><i class="ez-icon">&#xe679;</i></span>
          <el-input
            ref="password"
            v-model="loginForm.password"
            type="password"
            placeholder="登录密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" class="wid100 mt20" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
    <div class="footer">
      <p>租户的机构名称</p>
      <p>沪ICP备14030601号 &nbsp;|&nbsp; Copyright ATA 1999-2021. ALL Rights Reserved &nbsp;|&nbsp; 系统时区：UTC+08:00</p>
    </div>
  </div>
</template>

<script>
import { PatrolLogin } from '@/utils/api'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        name: 'haloyxx@163.com',
        password: 'aaaa'
      },
      capsTooltip: false,
      loading: false
    }
  },
  mounted() {
    if (this.loginForm.name === '') {
      this.$refs.name.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    handleLogin() {
      const data = this.loginForm
      this.loading = true
      PatrolLogin(data).then(res => {
        this.$store.commit('SET_TOKEN', res.token)
        this.$router.push(`/list`)
        this.loading = false
      }).catch(() => {
        this.loading = false
        return false
      })
    }
  }
}
</script>

<style lang="scss">
$bg:#f0f3f7;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: #000;
  }
}

/* reset element-ui css */
.login-container {
  background:$cursor;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: $light_gray;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#f0f3f7;
$dark_gray:#889aa4;
$light_gray:#333;
$theme-color: #166EFF;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .form-title{
    border-bottom: 2px solid $theme-color;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .svg-container {
    padding: 6px 0px 6px 12px;
    color: $theme-color;
    vertical-align: middle;
    i{ font-size: 18px; }
  }

  .title-container {
    position: relative;
    background: url(/img/logo.png) no-repeat 124px 0px;
    background-size: contain;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    color: #AAAEB1;
    font-size: 12px;
    p{
      text-align: center;
    }
  }
}
</style>
