<template>
  <div>
    <header>
      <span @click="backRouter">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tubiaozhizuo-"></use>
        </svg>
      </span>
      <p>模拟考试</p>
      <div class="time" v-show="haveclock">
        <div>倒计时</div>
        <van-count-down
          ref="clock"
          :time="time"
          format="mm:ss"
          @finish="finishtime"
        />
      </div>
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
    <van-popup v-model="submitshow" round :style="{ width: '300px' }">
      <div class="begin_top">
        <div class="begin">
          {{ begin }}
        </div>
        <img
          src="data:image/png;base64,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"
          v-show="failimg"
        />
        <div class="goon">
          {{ goon }}
        </div>
      </div>
      <div class="begin_buttom">
        <div class="cencel" @click="cencelsub" v-show="time !== 0">
          {{ cencel }}
        </div>
        <div
          class="certain"
          @click="certainsub"
          :class="{ onlycertain: time == 0 }"
        >
          {{ certain }}
        </div>
      </div>
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
    <div v-if="!submittest">
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
        <div class="test-answer" v-show="!haveclock">
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
        <div class="fleft" @click="clicksubmitshow" v-show="haveclock">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tijiaodingdan"></use>
          </svg>
          <span>交卷</span>
        </div>
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
            {{ index + 1 }}/100
          </span>
        </div>
      </footer>
    </div>
    <div class="mnks-result" v-else>
      <img
        src="http://img.58cdn.com.cn/dist/jxedt/h5/m_new/img/mnks-result.png"
      />
      <div class="score">
        <span class="score-num">{{ trueres }}</span>
        <span class="fen">分</span>
      </div>
      <div class="btn-wrap">
        <div class="btn" @click="submittest = false">考试回顾</div>
        <div class="btn" @click="resit">重新考试</div>
      </div>
    </div>
  </div>
</template>

<script>
import selectOption from "../components/select-option";

export default {
  created() {
    for (let i = 0; i < 100; i++) {
      let data = Math.floor(Math.random() * 1629);
      while (this.rdques.find((item) => item == data)) {
        data = Math.floor(Math.random() * 1629);
      }
      this.rdques.push(`${data}`);
      // console.log(this.rdques.length)
    }
    // fetch(`/g.asp?id=1550`)
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
  },
  destroyed() {},
  props: ["collects"],

  data() {
    return {
      rdques: [], //请求到的100个随机数
      index: 0, //当前题目的下标
      data: Object, //当前题目的数据
      show: false, //数据是否请求完成
      select: false, //是否选择完成
      selectOption: [], //本题的选择
      datas: [], //已经回答的题目
      showList: false, //展示题目列表
      trueres: 0, //对题数量
      falseres: 0, //错题数量
      submitshow: false, //提交试卷弹框
      time: 45 * 60 * 1000, //倒计时的时间
      haveclock: true, //是否显示时钟
      submittest: false, //是否提交试卷
      failimg: false, //是否显示不及格图片
      singlebtnshow: false, //提示第一/最后一道题目
      single: "",
    };
  },

  computed: {
    //提交试卷的提示
    goon() {
      if (this.failimg) {
        return "您的错译已经超过10道题";
      }
      if (this.time === 0) {
        return "考试时间已到自动交卷";
      }
      return `还有${100 - this.datas.length}道题没有做,确认交卷嘛`;
    },
    //提交弹出层的title
    begin() {
      if (this.failimg) {
        return "自动交卷";
      }
      if (this.time === 0) {
        return "考试时间到";
      }
      return `确认交卷`;
    },
    //灰按钮内容
    cencel() {
      if (this.failimg) {
        return "继续答题";
      }
      return "确定";
    },
    //绿按钮内容
    certain() {
      if (this.failimg) {
        return "现在交卷";
      }
      if (this.time === 0) {
        return "确定";
      }
      return "继续答题";
    },
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
    clicksubmitshow() {
      if (this.falseres <= 10) {
        this.submitshow = true;
      } else {
        this.submitshow = false;
        this.submittest = true;
        this.haveclock = false;
        this.$refs.clock.pause();
      }
    },

    fail() {
      this.failimg = true;
      this.submitshow = true;
    },

    resit() {
      this.$router.push("/fzmnks");
    },

    cencelsub() {
      //当错题超过10道时自动触发
      if (this.failimg) {
        this.failimg = false;
        this.submitshow = false;
      } else {
        this.submitshow = false;
        this.submittest = true;
        this.haveclock = false;
        this.$refs.clock.pause();
        if (!this.select) {
          this.selectOption = [];
          console.log(this.selectOption);
          this.select = true;
          for (let item of this.data.answertrue) {
            this.selectOtion.push(item);
          }
        }
      }
    },

    certainsub() {
      if (this.failimg) {
        this.failimg = false;
        this.submitshow = false;
        this.submittest = true;
        this.haveclock = false;
        this.$refs.clock.pause();
      } else {
        if (this.time === 0) {
          this.haveclock = false;
          this.submitshow = false;
          this.submittest = true;
        } else {
          this.submitshow = false;
        }
      }
    },
    finishtime() {
      this.submitshow = true;
    },
    selectres(i) {
      let data = this.datas.find((item) => item.index == i);
      if (data) {
        if (data.res) {
          return 2;
        } else {
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
            this.$emit("push-wrongquestion", this.data.id);
          }
        }
        this.datas.push({
          id: this.data.id,
          select: this.selectOption,
          index: this.index,
          res: result,
        });
        // 回答完后直接跳转
        this.trueres++;
        let that = this.next;
        setTimeout(function () {
          that();
        }, 500);
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
            if (this.falseres > 10) {
              this.fail();
            }
            this.$emit("push-wrongquestion", this.data.id);
          }
          this.datas.push({
            id: this.data.id,
            select: this.selectOption,
            index: this.index,
            res: result,
          });
          // 回答完后直接跳转
          let that = this.next;
          setTimeout(function () {
            that();
          }, 500);
        }
      }
    },

    fetchdata() {
      this.show = false;
      let el = this.datas.find((item) => item.id === this.rdques[this.index]);
      if (el) {
        // data: Object,
        fetch(`/g.asp?id=${this.rdques[this.index]}`)
          // fetch(`/g.asp?id=1550`)
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
          // fetch(`/g.asp?id=1550`)
          .then((res) => {
            // console.log(res)
            return res.json();
          })
          .then((data) => {
            // console.log(data)
            this.show = true;
            this.data = data;
            this.selectOption = [];
            if (!this.haveclock) {
              this.select = true;
              for (let item of this.data.answertrue) {
                this.selectOtion.push(item);
              }
              console.log(this.selectOption);
            } else {
              this.select = false;
            }
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

  .time {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #333;

    div {
      display: inline-block;
      margin-left: 5px;
    }
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
  background: #fff;

  .fleft {
    float: left;
    margin-left: 15px;

    .icon-big {
      font-size: 22px;
      vertical-align: middle;
    }

    span {
      padding-left: 5px;
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

  img {
    width: 207px;
    height: 105px;
    margin: 20px 0;
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

  .cencel {
    width: 50%;
    display: inline-block;
  }

  .certain {
    display: inline-block;
    width: 50%;
    background: #24c27d;
    color: #fff;
  }

  .onlycertain {
    width: 100%;
  }

  .singlebtn {
    color: #54b143;
    width: 100%;
    font-size: 18px;
  }
}

.mnks-result {
  padding-top: 30px;
  width: 100%;

  img {
    width: 65%;
    display: block;
    margin: 0 auto;
  }

  .score {
    padding-left: 10px;

    .score-num {
      font-size: 120px;
      font-weight: 700;
      color: #4a4a4a;
      line-height: 140px;
    }

    .fen {
      font-size: 16px;
      font-weight: 400;
      color: #4a4a4a;
      line-height: 22px;
    }
  }

  .btn-wrap {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;

    .btn {
      width: 140px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background-color: #24c27d;
      border-radius: 20px;
      font-size: 17px;
      font-weight: 500;
      color: #fff;
      flex: 1;
      margin-left: 15px;
      margin-top: 27px;
    }
  }
}
</style>