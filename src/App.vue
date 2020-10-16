<template>
  <div id="app">
    <router-view
      @wrongquestionsdetach="wrongquestionsdetach"
      :wrongquestions="wrongquestions"
      :collects="collects"
      :historyindex="index"
      @revisecollects="revisecollects"
      @push-wrongquestion="pushWrongquestion"
      @historyindex="historyindex"
    />
  </div>
</template>

<script>
import "../public/iconfont.js";

export default {
  name: "app",
  data() {
    return {
      collects: [], //收藏数组
      wrongquestions: [], //错题本
      index: Number, //历史下标
    };
  },
  methods: {
    historyindex(i) {
      this.index = i;
    },
    revisecollects(i) {
      if (this.collects.find((item) => item == i)) {
        this.collects = this.collects.filter((item) => {
          if (item == i) {
            return false;
          } else {
            return true;
          }
        });
      } else {
        this.collects.push(i);
      }
      // console.log(this.collects);
    },

    pushWrongquestion(i) {
      if (this.wrongquestions.find((item) => item == i) === undefined) {
        this.wrongquestions.push(i);
      }
      // console.log(this.wrongquestions)
    },

    wrongquestionsdetach(i) {
      this.wrongquestions = this.wrongquestions.filter((item) => {
        if (item == i) {
          return false;
        } else {
          return true;
        }
      });
    },
  },

  created() {
    if (JSON.parse(localStorage.getItem("collects"))) {
      this.collects = JSON.parse(localStorage.getItem("collects"));
    }
    if (JSON.parse(localStorage.getItem("wrongquestions"))) {
      this.wrongquestions = JSON.parse(localStorage.getItem("wrongquestions"));
    }
    if (JSON.parse(localStorage.getItem("historyindexgo"))) {
      this.index = JSON.parse(localStorage.getItem("historyindexgo"));
    }
  },

  updated() {
    localStorage.setItem("collects", JSON.stringify(this.collects));
    localStorage.setItem("wrongquestions", JSON.stringify(this.wrongquestions));
    localStorage.setItem("historyindexgo", JSON.stringify(this.index));
    console.log(this.index);
  },
};
</script>
<style lang="scss" scoped>
</style>
