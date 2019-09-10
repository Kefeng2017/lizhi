<template>
  <div class="award">
      <p class="thankyou">
         非常感谢您的支持，如果有任何问题或者想法欢迎<strong> <a href="/">与我联系</a></strong>。
      </p>
      <div class="wechat">
          <p>微信</p>
          <img src="../assets/img/wechatCode.png" alt="微信收款">
      </div>
      <div class="alipay">
          <p>支付宝</p>
          <img src="../assets/img/aliCode.png" alt="支付宝收款">
      </div>
  </div>
</template>

<script>
export default{

}
</script>

<style lang="scss">
.award{
    text-align: center;
    .thankyou{
        padding: 5em 0;
        strong{
            color: rgb(229, 108, 100);
        }
    }
    img{
        margin-bottom: 5em;
        width: 200px;
        height: auto;
    }
}
</style>
