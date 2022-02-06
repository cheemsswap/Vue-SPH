<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        @click="setDefaultAddress(user.id)"
        class="address clearFix"
        v-for="user of isAddress"
        :key="user.id"
      >
        <span
          class="username"
          :class="{ selected: user.isDefault == 1 ? true : false }"
          >{{ user.consignee }}</span
        >
        <p>
          <span class="s1">{{ user.fullAddress }}</span>
          <span class="s2">{{ user.phoneNum }}</span>
          <span class="s3">默认地址</span>
        </p>
      </div>

      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="detail of detailArrayList"
          :key="detail.skuId"
        >
          <li>
            <img
              style="width: 100px; height: 100px"
              :src="detail.imgUrl"
              alt=""
            />
          </li>
          <li>
            <p>{{ detail.skuName }}</p>
          </li>
          <li>
            <h3>￥{{ detail.orderPrice }}</h3>
          </li>
          <li>X{{ detail.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          v-model="orderComment"
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ detailNums }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ detailSumPrice }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:　<span>¥{{ detailSumPrice }}</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ fullAddress }}</span>
        收货人：<span>{{ consignee }}</span>
        <span>{{ phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Trade",
  data() {
    return {
      isAddress: {},
      consignee: "",
      fullAddress: "",
      phoneNum: "",
      detailArrayList: [],
      detailNums: 0,
      detailSumPrice: 0,
      orderComment: "",
    };
  },
  computed: {
    ...mapState("login", ["UserAddress"]),
    ...mapState("trade", ["OrderInfo"]),
  },
  watch: {
    UserAddress() {
      this.isAddress = this.UserAddress;
    },
    OrderInfo() {
      this.detailArrayList = this.OrderInfo.detailArrayList;
      this.detailNums = this.OrderInfo.totalNum;
      this.detailSumPrice = this.OrderInfo.totalAmount;
    },
    isAddress: {
      deep: true,
      handler() {
        for (const index in this.isAddress) {
          if (this.isAddress[index].isDefault == 1) {
            this.consignee = this.isAddress[index].consignee;
            this.fullAddress = this.isAddress[index].fullAddress;
            this.phoneNum = this.isAddress[index].phoneNum;
          }
        }
      },
    },
  },
  methods: {
    setDefaultAddress(id) {
      for (const index in this.isAddress) {
        if (this.isAddress[index].id == id) this.isAddress[index].isDefault = 1;
        else this.isAddress[index].isDefault = 0;
      }
    },
    async submitOrder() {
      const tradeNo = this.OrderInfo.tradeNo;
      const req = {
        consignee: this.consignee,
        consigneeTel: this.phoneNum,
        deliveryAddress: this.fullAddress,
        paymentWay: "ONLINE",
        orderComment: this.orderComment,
        orderDetailList: this.detailArrayList,
      };
      const requslt = await this.$API.reqSubmitOrder({ tradeNo, req });
      if (requslt.code == 200) {
        console.log("提交成功!" + requslt.data);
        this.$router.push({
          path: "/pay",
          query: {
            orderId: requslt.data,
          },
        });
      } else {
        alert("提交失败！" + requslt.message);
      }
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("login/getUserAddress");
      await this.$store.dispatch("trade/getTradeInfo");
    } catch (error) {
      console.log("获取订单信息失败");
    }
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>