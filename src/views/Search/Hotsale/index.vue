<template>
  <div class="clearfix hot-sale">
    <h4 class="title">热卖商品</h4>
    <div class="hot-list">
      <ul class="yui3-g">
        <li class="yui3-u-1-4">
          <div class="list-wrap">
            <div class="p-img">
              <img src="./images/like_01.png" />
            </div>
            <div class="attr">
              <em>Apple苹果iPhone 6s (A1699)</em>
            </div>
            <div class="price">
              <strong>
                <em>¥</em>
                <i>4088.00</i>
              </strong>
            </div>
            <div class="commit">
              <i class="command">已有700人评价</i>
            </div>
          </div>
        </li>
        <li class="yui3-u-1-4">
          <div class="list-wrap">
            <div class="p-img">
              <img src="./images/like_03.png" />
            </div>
            <div class="attr">
              <em>金属A面，360°翻转，APP下单省300！</em>
            </div>
            <div class="price">
              <strong>
                <em>¥</em>
                <i>4088.00</i>
              </strong>
            </div>
            <div class="commit">
              <i class="command">已有700人评价</i>
            </div>
          </div>
        </li>
        <li class="yui3-u-1-4">
          <div class="list-wrap">
            <div class="p-img">
              <img src="./images/like_04.png" />
            </div>
            <div class="attr">
              <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
            </div>
            <div class="price">
              <strong>
                <em>¥</em>
                <i>4068.00</i>
              </strong>
            </div>
            <div class="commit">
              <i class="command">已有20人评价</i>
            </div>
          </div>
        </li>
        <li class="yui3-u-1-4">
          <div class="list-wrap">
            <div class="p-img">
              <img src="./images/like_02.png" />
            </div>
            <div class="attr">
              <em>Apple苹果iPhone 6s (A1699)</em>
            </div>
            <div class="price">
              <strong>
                <em>¥</em>
                <i>4088.00</i>
              </strong>
            </div>
            <div class="commit">
              <i class="command">已有700人评价</i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hotsale",
};
</script>

<style lang="less" scoped>
.hot-sale {
  margin-bottom: 5px;
  border: 1px solid #ddd;
  .title {
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    border-bottom: 1px solid #ddd;
    background: #f1f1f1;
    color: #333;
    margin: 0;
    padding: 5px 0 5px 15px;
  }
  .hot-list {
    padding: 15px;
    ul {
      display: flex;
      li {
        width: 25%;
        height: 100%;
        .list-wrap {
          .p-img,
          .price,
          .attr,
          .commit {
            padding-left: 15px;
          }
          .p-img {
            img {
              max-width: 100%;
              vertical-align: middle;
              border: 0;
            }
          }
          .attr {
            width: 85%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin-bottom: 8px;
            min-height: 38px;
            cursor: pointer;
            line-height: 1.8;
          }
          .price {
            font-size: 18px;
            color: #c81623;
            strong {
              font-weight: 700;
              i {
                margin-left: -5px;
              }
            }
          }
          .commit {
            height: 22px;
            font-size: 13px;
            color: #a7a7a7;
          }
        }
      }
    }
  }
}
</style>