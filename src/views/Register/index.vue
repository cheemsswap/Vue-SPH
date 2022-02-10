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
          v-validate="'required|phone'"
          name="phone"
        />
        <span v-show="errors.first('phone')" class="error-msg">
          {{ errors.first("phone") }}
        </span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          v-model="code"
          type="text"
          placeholder="请输入验证码"
          v-validate="'required'"
          name="code"
        />
        <button
          @click="getRegisterCode"
          style="width: 100px; height: 38px; margin-left: 5px"
        >
          获取验证码
        </button>
        <span v-show="errors.first('code')" class="error-msg">{{
          errors.first("code")
        }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          v-model="password1"
          type="password"
          placeholder="请输入你的登录密码"
          v-validate="'required|min:6|max:20'"
          name="password1"
        />
        <span v-show="errors.first('password1')" class="error-msg">{{
          errors.first("password1")
        }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          v-model="password2"
          type="password"
          placeholder="请输入确认密码"
          v-validate="{ required: true, ConfirmPassword: password1 }"
          name="password2"
        />
        <span v-show="errors.first('password2')" class="error-msg">{{
          errors.first("password2")
        }}</span>
      </div>
      <div class="controls">
        <input
          v-model="agree"
          name="agree"
          v-validate="'required'"
          type="checkbox"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span v-show="errors.first('agree')" class="error-msg">{{
          errors.first("agree")
        }}</span>
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
      code: "",
      password1: "",
      password2: "",
      agree: false,
    };
  },
  methods: {
    async getRegisterCode() {
      await this.$validator.validate("phone").then(async (e) => {
        if (e) {
          await this.$store.dispatch("register/getRegisterCode", this.phone);
          this.code = this.$store.state.register.code;
        }
      });
    },
    async registerSubmit() {
      await this.$validator.validateAll().then(async (e) => {
        if (e) {
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
      });
    },
  },
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