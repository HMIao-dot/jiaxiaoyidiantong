<template>
  <div>
    <van-popup v-model="showPickcarType" round position="bottom">
      <van-picker
        show-toolbar
        :columns="carcolumns"
        @cancel="showPickcarType = false"
        @confirm="onConfirmcartype"
      />
    </van-popup>
    <van-popup v-model="showPicktestType" round position="bottom">
      <van-picker
        show-toolbar
        :columns="testcolumns"
        @cancel="showPicktestType = false"
        @confirm="onConfirmtesttype"
      />
    </van-popup>
    <header>
      <span class="hd-left"></span
      ><span class="test-type" @click="showPickcarType = true">{{
        carType
      }}</span
      >驾考宝典<span class="test-subject" @click="showPicktestType = true">{{
        testType
      }}</span>
    </header>
    <div class="main">
      <div class="title">驾考练习</div>
      <div class="mainCon">
        <div class="main-text mnks" @click="gomnks">模拟考试</div>
        <div class="main-text sxlx" @click="gosxlx">顺序练习</div>
      </div>
      <itemCon :items="['sjlx', 'zjlx', 'zxlx']" />
    </div>
    <div class="main">
      <div class="title">题目回顾</div>
      <itemCon :items="['ctb', 'sc']" />
    </div>
  </div>
</template>
<script>
import itemCon from "../components/itemCon";

export default {
  data() {
    return {
      carType: "小车",
      testType: "科目一",
      showPickcarType: false,
      showPicktestType: false,
      carcolumns: ["小车", "货车", "客车", "摩托车"],
      testcolumns: ["科目一", "科目四"],
    };
  },
  methods: {
    onConfirmcartype(value) {
      this.carType = value;
      this.showPickcarType = false;
    },

    onConfirmtesttype(value) {
      this.testType = value;
      this.showPicktestType = false;
    },

    gosxlx() {
      this.$router.push("/sxlx");
    },

    gomnks() {
      this.$router.push("/fzmnks");
    },
  },
  components: {
    itemCon,
  },
};
</script>
<style lang="scss" scoped>
header {
  position: relative;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);

  span {
    position: absolute;

    &.hd-left {
      left: 20px;
      top: 50%;
      transform: translateY(-25%);
      border-color: #333 transparent transparent;
      border-width: 6px;
      border-style: solid;
    }

    &.test-type {
      left: 40px;
      font-size: 12px;
    }

    &.test-subject {
      right: 20px;
      font-size: 14px;
    }
  }
}

.main {
  &::before {
    content: "";
    display: block;
    height: 10px;
    background-color: rgba($color: #eee, $alpha: 0.5);
  }

  .title {
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    border-bottom: solid 1px #e6e6e6;
  }

  .mainCon {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 150px;
    border-bottom: 1px solid #e6e6e6;

    .main-text {
      width: 98px;
      height: 98px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      line-height: 98px;
      border-radius: 50%;
      z-index: 3;
      position: relative;
    }

    .mnks {
      background: linear-gradient(180deg, #7ddaff, #5f8dec);
    }

    .sxlx {
      background: linear-gradient(180deg, #00f8b6, #24c293);
    }
  }
}
</style>