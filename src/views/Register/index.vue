<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          v-model.number="phone"
          type="text"
          placeholder="请输入你的手机号"
        />
        <span v-text="phoneerrormsg" class="error-msg"></span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input v-model="code" type="text" placeholder="请输入验证码" />
        <button
          @click="getRegisterCode"
          style="width: 100px; height: 38px; margin-left: 5px"
        >
          获取验证码
        </button>
        <span v-text="codeerroemsg" class="error-msg"></span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          v-model="password1"
          type="text"
          placeholder="请输入你的登录密码"
        />
        <span v-text="password1errormsg" class="error-msg"></span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input v-model="password2" type="text" placeholder="请输入确认密码" />
        <span v-text="password2errormsg" class="error-msg"></span>
      </div>
      <div class="controls">
        <input v-model="agree" name="m1" type="checkbox" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span v-text="agreeerroemsg" class="error-msg"></span>
      </div>
      <div class="btn">
        <button @click="registerSubmit">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      phoneerrormsg: "",
      code: "",
      codeerroemsg: "",
      password1: "",
      password1errormsg: "",
      password2: "",
      password2errormsg: "",
      agree: false,
      agreeerroemsg: "",
    };
  },
  watch: {
    phone() {
      this.isPhone();
    },
    code() {
      this.isCode();
    },
    password1() {
      this.ispassword1();
    },
    password2() {
      this.ispassword2();
    },
  },
  methods: {
    isPhone() {
      if (this.phone >= 10000000000 && this.phone <= 99999999999) {
        this.phoneerrormsg = "";
        return true;
      }
      this.phoneerrormsg = "请输入正确的手机号码";
      return false;
    },
    isCode() {
      if (this.code != "") {
        this.codeerroemsg = "";
        return true;
      }
      this.codeerroemsg = "验证码不能位空";
      return false;
    },
    ispassword1() {
      if (this.password1.length >= 6) {
        this.password1errormsg = "";
        return true;
      }
      this.password1errormsg = "密码需要6位以上，请重新输入";
      return false;
    },
    ispassword2() {
      if (this.password1 == this.password2) {
        this.password2errormsg = "";
        return true;
      }
      this.password2errormsg = "密码不一致";
      return false;
    },
    isagree() {
      if (this.agree) {
        this.agreeerroemsg = "";
        return true;
      }
      this.agreeerroemsg = "请同意协议";
      return false;
    },
    async getRegisterCode() {
      if (!(this.phone >= 10000000000 && this.phone <= 99999999999)) {
        this.phoneerrormsg = "请输入正确的手机号码";
        return;
      }
      this.phoneerrormsg = "";
      await this.$store.dispatch("register/getRegisterCode", this.phone);
      this.code = this.$store.state.register.code;
    },
    async registerSubmit() {
      let flag = true;
      if (!this.isPhone()) flag = false;
      if (!this.isCode()) flag = false;
      if (!this.ispassword1()) flag = false;
      if (!this.ispassword2()) flag = false;
      if (!this.isagree()) flag = false;
      if (flag) {
        const req = {
          phone: this.phone,
          password: this.password1,
          code: this.code,
        };
        let result = await this.$store.dispatch("register/getRegister", req);
        if (result.code == 200) {
          alert("注册成功！");
          this.$router.push("/login");
        } else {
          alert(result.message);
        }
      }
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>