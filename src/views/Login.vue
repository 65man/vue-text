<template>
<div class="login" @keyup.enter="login('loginForm')">
  <!-- 这里只能有一个根节点 -->
  <!-- model表示表单数据的对象 -->
  <!-- 属性校验步骤： -->
  <!-- 1.给el-from绑定rules属性，传入约定的规则 -->
  <!-- 2.给el-form-item组件的prop属性设置为需要校验的字段名 -->
  <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" class="demo-ruleForm container">
    <el-form-item>
      <div class="avatar">
        <img src="../assets/avatar.jpg" alt="">
      </div>
    </el-form-item>
    <el-form-item prop="userName">
    <el-input placeholder="请输入用户名" prefix-icon="myicon myicon-user" v-model="loginForm.userName"></el-input>
    </el-form-item>
    <el-form-item prop="userPwd">
    <el-input placeholder="请输入密码" type="password" prefix-icon="myicon myicon-key" v-model="loginForm.userPwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login('loginForm')" class="login-btn">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { checkLogin } from '@/api'

export default {
  data () {
    return {
      loginForm: {
        userName: '',
        userPwd: ''
      },
      loginRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
           checkLogin({ username: this.loginForm.userName, password: this.loginForm.userPwd })
            .then(res => {
              if (res.meta.status === 200) {
                this.$router.push({name: 'Home'})
              } else {
                this.$message.error(res.meta.msg)
              }
            })
          console.log(valid);
        } else {
          console.log("请输入。。");
          return false;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
