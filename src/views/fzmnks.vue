<template>
  <div>
    <header>
      <span @click="backRouter">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tubiaozhizuo-"></use>
        </svg>
      </span>
      <p>模拟考试</p>
    </header>
    <div class="mnks-warp">
      <div class="mnks-info">
        <div class="mnks-info-item">
          <span class="title">考试科目: </span>
          <span class="content">{{ "科目一理论考试" }}</span>
        </div>
        <div class="mnks-info-item">
          <span class="title">考试题库: </span>
          <span class="content">{{ "小车 (C1,C2,C3)" }}</span>
        </div>
        <div class="mnks-info-item">
          <span class="title">考试标准: </span>
          <span class="content">{{ "100题, 45分钟" }}</span>
        </div>
        <div class="mnks-info-item">
          <span class="title">合格标准: </span>
          <span class="content">{{ "90分及格" }}</span>
        </div>
        <div class="mnks-info-item">
          <span class="title">出题规则: </span>
          <span class="content">交管局出题规则</span>
        </div>
      </div>
      <div class="mnk-tips">
        答题不可修改，累计错题分数达到不及格标准时，系统自动提醒交卷，考试不通过
      </div>
      <div class="btn" @click="gofzks">全真模拟考试</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    gofzks() {
      this.$router.push("./fzks");
    },

    backRouter() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  position: relative;
  height: 50px;
  line-height: 50px;

  p {
    font-size: 15px;
    text-align: center;
    border-bottom: 1px solid #e6e6e6;
  }

  span {
    position: absolute;
    display: inline-block;
    left: 15px;
    top: 10px;
    height: 30px;
    line-height: 30px;
  }
}

.mnks-warp {
  padding: 80px 40px 0;
  font-size: 10px;

  .mnks-info {
    width: 100%;
    height: 190px;
    border-radius: 10px;
    margin-top: 12px;
    box-sizing: border-box;
    // font-family: PingFangSC;

    .mnks-info-item {
      width: 100%;
      margin-bottom: 15px;
      padding-bottom: 0;
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
    }

    .title {
      color: #333;
    }

    .content {
      color: grey;
    }
  }

  .mnk-tips {
    font-size: 12px;
    font-weight: 400;
    color: #b2b2b2;
    line-height: 18px;
  }

  .btn {
    height: 44px;
    text-align: center;
    line-height: 44px;
    background: #00bb7e;
    border-radius: 50px;
    font-size: 16px;
    color: #fff;
    margin-top: 36px;
  }
}
</style>