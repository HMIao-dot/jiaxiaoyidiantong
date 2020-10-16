<template>
  <div>
    <header>
      <span @click="backRouter">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tubiaozhizuo-"></use>
        </svg>
      </span>
      <p>专项练习</p>
    </header>
    <van-popup
      v-model="showList"
      position="bottom"
      :style="{ width: '100%', 'max-height': '71%' }"
      duration=".5"
    >
      <div class="upfoot">
        <div class="fleft" @click="collectSelect">
          <svg class="icon icon-big" aria-hidden="true" v-if="collect">
            <use xlink:href="#icon-shoucang1"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-else>
            <use xlink:href="#icon-shoucang"></use>
          </svg>
          <span>{{ collect_text }}</span>
        </div>
        <div class="fright">
          <span>
            <img
              src="http://j2.58cdn.com.cn/jxedt/m/kaoshi/images/lx_item_state_right.png"
              class="small_img"
            />
            {{ 0 }}
          </span>
          <span>
            <img
              src="http://j2.58cdn.com.cn/jxedt/m/kaoshi/images/lx_item_state_wrong.png"
              class="small_img"
            />
            {{ 0 }}
          </span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-liebiao"></use>
            </svg>
            {{ index + 1 }}/{{ rdques.length }}
          </span>
        </div>
      </div>
      <ul class="upitem">
        <li
          v-for="(item, i) in rdques"
          :key="i"
          class="item"
          :class="[
            { thisitem: index === i },
            { selectovertrue: selectres(i) === 2 },
            { selectoverfalse: selectres(i) === 1 },
          ]"
          @click="clickupitem(i)"
        >
          {{ i + 1 }}
        </li>
      </ul>
    </van-popup>
    <van-popup v-model="singlebtnshow" round :style="{ width: '300px' }">
      <div class="begin_top">
        <div class="begin"></div>
        <div class="goon">{{ single }}</div>
      </div>
      <div class="begin_buttom">
        <div class="singlebtn" @click="singlebtnshow = false">确定</div>
      </div>
    </van-popup>
    <div class="test" v-if="show">
      <div class="test-title">
        <span class="type">{{ questiontype }}</span>
        <span class="title">{{ data.question }}</span>
        <div v-if="data.imageurl != ''" class="picture">
          <img :src="data.imageurl" />
        </div>
        <selectOption
          v-for="(el, i) in option"
          :key="i"
          :item="i"
          :option="el"
          :selectOption="selectOption"
          :select="select"
          :rightOption="data.answertrue"
          @click="clickOption(i + 1)"
        ></selectOption>
        <div
          style="padding: 20px 10px"
          v-if="data.answertrue.length > 1 && select == false"
          @click="refer"
        >
          <div class="btn" :class="{ grey: selectOption.length <= 1 }">
            确定
          </div>
        </div>
      </div>
      <div class="test-answer" v-show="select">
        <div class="answer-header">
          <span class="marking-line"></span>
          <span class="title">官方解释</span>
          <span class="type">权威</span>
        </div>
        <div class="answer-text" v-html="data.explain"></div>
      </div>
    </div>
    <div class="handelBtns">
      <div class="pre" :class="{ cantBtn: index <= 0 }" @click="pre">
        上一题
      </div>
      <div
        class="next"
        :class="{ cantBtn: index >= rdques.length - 1 }"
        @click="next"
      >
        下一题
      </div>
    </div>
    <footer>
      <div class="fleft" @click="collectSelect">
        <svg class="icon icon-big" aria-hidden="true" v-if="collect">
          <use xlink:href="#icon-shoucang1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-else>
          <use xlink:href="#icon-shoucang"></use>
        </svg>
        <span>{{ collect_text }}</span>
      </div>
      <div class="fright">
        <span>
          <img
            src="http://j2.58cdn.com.cn/jxedt/m/kaoshi/images/lx_item_state_right.png"
            class="small_img"
          />
          {{ trueres }}
        </span>
        <span>
          <img
            src="http://j2.58cdn.com.cn/jxedt/m/kaoshi/images/lx_item_state_wrong.png"
            class="small_img"
          />
          {{ falseres }}
        </span>
        <span @click="showList = true">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
          {{ index + 1 }}/1630
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import selectOption from "../components/select-option";

export default {
  created() {
    for (let i = 1; i < 1631; i++) {
      this.rdques.push(`${i}`);
    }
    fetch(`/g.asp?id=${this.rdques[this.index]}`)
      .then((res) => {
        // console.log(res)
        return res.json();
      })
      .then((data) => {
        // console.log(data)
        this.show = true;
        this.data = data;
        console.log(this.data);
      });
    if (this.historyindex > 0) {
      this.historyindexgo = true;
    }
  },

  props: ["collects",],

  data() {
    return {
      rdques: [], //所有题目的id
      index: 0, //当前题目的下标
      data: Object, //当前题目的数据
      show: false, //数据是否请求完成
      select: false, //是否选择完成
      selectOption: [], //本题的选择
      datas: [], //已经回答的题目
      showList: false,
      trueres: 0,
      falseres: 0,
      singlebtnshow: false,
      single: "",
    };
  },

  computed: {
    collect() {
      return this.collects.find((item) => item === this.data.id);
    },
    collect_text() {
      if (this.collect) {
        return "已收藏";
      }
      return "收藏";
    },

    option() {
      if (this.data.an1 !== "") {
        return [this.data.an1, this.data.an2, this.data.an3, this.data.an4];
      } else {
        return ["正确", "错误"];
      }
    },

    questiontype() {
      if (this.data.answertrue.length >= 2) {
        return "多选";
      } else {
        if (this.data.an1 == "") {
          return "判断";
        } else {
          return "单选";
        }
      }
    },
  },

  methods: {
    selectres(i) {
      let data = this.datas.find((item) => item.index == i);
      if (data) {
        if (data.res) {
          // console.log(2)
          return 2;
        } else {
          // console.log(1)
          return 1;
        }
      } else {
        return 0;
      }
    },

    backRouter() {
      this.$router.push("/");
    },

    clickupitem(i) {
      this.index = i;
      this.fetchdata();
    },

    collectSelect() {
      this.$emit("revisecollects", this.data.id);
    },
    refer() {
      if (this.selectOption.length > 1) {
        this.select = true;
        let result = true;
        for (let item of this.data.answertrue) {
          if (this.selectOption.includes(item) === false) {
            result = false;
            this.falseres++;
          }
        }
        this.datas.push({
          id: this.data.id,
          select: this.selectOption,
          index: this.index,
          res: result,
        });
        // console.log(result)
        if (result) {
          this.trueres++;
          let that = this.next;
          setTimeout(function () {
            that();
          }, 500);
        }
      }
    },

    clickOption(i) {
      // console.log(this.select)
      if (!this.select) {
        let result;
        if (this.selectOption.includes(`${i}`)) {
          this.selectOption = this.selectOption.filter((item) => item != i);
        } else {
          this.selectOption.push(`${i}`);
        }
        if (this.data.answertrue.length === 1) {
          this.select = true;
          if (i == this.data.answertrue) {
            result = true;
            this.trueres++;
          } else {
            result = false;
            this.falseres++;
            this.$emit("push-wrongquestion", this.data.id);
          }
          this.datas.push({
            id: this.data.id,
            select: this.selectOption,
            index: this.index,
            res: result,
          });
          if (result) {
            let that = this.next;
            setTimeout(function () {
              that();
            }, 500);
          }
        }
      }
    },

    fetchdata() {
      this.show = false;
      let el = this.datas.find((item) => item.id === this.rdques[this.index]);
      if (el) {
        // data: Object,
        fetch(`/g.asp?id=${this.rdques[this.index]}`)
          .then((res) => {
            // console.log(res)
            return res.json();
          })
          .then((data) => {
            // console.log(data)
            this.show = true;
            this.data = data;
            this.select = true;
            this.selectOption = el.select;
            console.log(this.data);
            // console.log(this.select)
          });
      } else {
        fetch(`/g.asp?id=${this.rdques[this.index]}`)
          .then((res) => {
            // console.log(res)
            return res.json();
          })
          .then((data) => {
            // console.log(data)
            this.show = true;
            this.data = data;
            this.select = false;
            this.selectOption = [];
            console.log(this.data);
            // console.log(this.select)
          });
      }
    },

    singlebtn(i) {
      if (i > this.collects.length - 1) {
        this.single = "已经是最后一道题了";
      } else if (i < 0) {
        this.single = "已经是第一道题了";
      } else {
        this.single = "";
      }
    },

    next() {
      if (this.index < this.rdques.length - 1) {
        this.index++;
        this.fetchdata();
      } else {
        this.singlebtnshow = true;
        this.singlebtn(this.index + 1);
      }
    },

    pre() {
      if (this.index > 0) {
        this.index--;
        this.fetchdata();
      } else {
        this.singlebtnshow = true;
        this.singlebtn(this.index - 1);
      }
    },
  },

  components: {
    selectOption,
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

.test {
  .test-title {
    padding: 15px 15px 30px;

    .type {
      display: inline-block;
      width: 39px;
      height: 21px;
      text-align: center;
      line-height: 21px;
      font-size: 12px;
      color: #fff;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAiCAMAAADYiy+9AAAANlBMVEUAAAAkwn0kw30kwnwkwn0kw30ixH4jxH0hwXwkwnwkw34lwnwhwH0jxH0jw3wkw34lwn4kwn06OdIGAAAAEXRSTlMA+rPz62FaIRagy309PMuAoG3ulrYAAACeSURBVEjHpdVJDgIxDETRsjOnB6j7Xxah3nQEQiT19vXlnXFT07NH408Wz5Yqvtnd+Cfz/WNenFO8YJADJ4WMmwcXbMNeKmQuyte+BC4KBW/OZQ4ABwXHdYB0QjUKrCJRktAoaTgp6YiURBglpgaIqAa6GmhqIKmBamIArgYONQBXAyWIAWQ1gE0JqIXhtQkBFOea4b1rAaCm1uNs5QVeB4LE5MsVVQAAAABJRU5ErkJggg==)
        no-repeat 50%;
      background-size: 100%;
      margin-right: 10px;
      vertical-align: top;
      transform: scale(0.8);
    }

    .title {
      font-size: 20px;
      line-height: 28px;
    }

    .picture {
      margin-top: 10px;

      img {
        max-height: 120px;
        width: auto;
        max-width: 100%;
      }
    }

    .btn {
      border-radius: 5px;
      background: #54b143;
      height: 44px;
      line-height: 44px;
      text-align: center;
      color: #fff;
      font-size: 18px;
    }

    .grey {
      background: grey;
    }
  }

  .test-answer {
    padding-bottom: 120px;

    .answer-header {
      position: relative;
      padding: 15px;
      border-bottom: 1px solid #e6e6e6;

      .marking-line {
        display: inline-block;
        position: absolute;
        width: 4px;
        height: 14px;
        background-color: #24c27e;
        border-radius: 5px;
        top: 16px;
      }

      .title {
        margin: 0 15px;
        font-size: 16px;
        font-weight: 900;
      }

      .type {
        display: inline-block;
        width: 56px;
        height: 21px;
        text-align: center;
        line-height: 21px;
        font-size: 12px;
        color: #fff;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAiBAMAAAAzPuMuAAAAMFBMVEUAAAAkw30kwn0jw30nvHkkwn0kwn0kwn0jwn4kxXwhyHokw34mxHwjxYAkwX4kwn3iZzRYAAAAD3RSTlMA9+KaCerIxlcjF4hKLIi9OEQ8AAAAlElEQVQ4y43KrQ3CUBiG0TdBUQ36LgApigRFUJCgmADBABg8Bk+TLtAh6pt0hG5y2/RH9WtyF7jP0UfiaovZvn4KUovzp1CN8CWuNha42p7XtsDVPrzOvPpMRh143fA68drxOvDa8+rl8NWT1zevZ17/vF54XfG6driq4vXKa5LiqobX5Iur7g5X5eS2Cm7HR7TuxC21d/svkxUsNAAAAABJRU5ErkJggg==)
          no-repeat 50%;
        background-size: 100%;
        margin-right: 10px;
        vertical-align: top;
        transform: scale(0.8);
      }
    }

    .answer-text {
      padding: 15px 15px 0;
      line-height: 27px;
    }
  }
}

.handelBtns {
  position: fixed;
  bottom: 76px;
  right: 15px;

  div {
    display: inline-block;
    width: 75px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    background-color: #24c27d;
    font-size: 14px;
    border-radius: 15px;
  }

  .pre {
    margin-right: 25px;
  }

  .cantBtn {
    background-color: #d6d6d6;
  }
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #e6e6e6;
  background-color: #fff;

  .fleft {
    float: left;
    margin-left: 15px;

    .icon-big {
      font-size: 22px;
      vertical-align: middle;
    }
  }

  .fright {
    float: right;
    margin-right: 15px;

    .small_img {
      display: inline-block;
      width: 14px;
      height: 14px;
    }
  }
}

.upfoot {
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #e6e6e6;

  .fleft {
    float: left;
    margin-left: 15px;

    .icon-big {
      font-size: 22px;
      vertical-align: middle;
    }
  }

  .fright {
    float: right;
    margin-right: 15px;

    .small_img {
      display: inline-block;
      width: 14px;
      height: 14px;
    }
  }
}

.upitem {
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  // justify-content: space-between;
  overflow: hidden auto;
  height: 480px;

  .item {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    margin: 0 10px 20px;
    box-sizing: border-box;
    color: #b2b2b2;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 50%;
    list-style-type: none;
  }

  .thisitem {
    color: #a9a9a9;
    background-color: #f1f1f1;
    border-color: #a9a9a9;
  }

  .selectovertrue {
    background: rgba(0, 187, 126, 0.2);
    border: 1px solid #00bb7e;
    color: #00bb7e;
  }

  .selectoverfalse {
    background: rgba(251, 110, 82, 0.2);
    border: 0;
    color: #fb6e52;
  }
}

.begin_top {
  text-align: center;

  .begin {
    font-size: 18px;
    color: #333;
    padding-top: 20px;
    font-weight: 700;
  }

  .goon {
    color: grey;
    margin: 20px auto;
    padding: 0 12px;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
  }
}

.begin_buttom {
  background: #f4f4f4;
  color: grey;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 14px;
  border-top: 1px solid #cecece;

  .singlebtn {
    color: #54b143;
    width: 100%;
    font-size: 18px;
  }
}
</style>