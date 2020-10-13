<template>
    <div class="itemCon">
        <div class="item" v-for="(item,index) in items" :key = index @click="click(item)">
            <div class="img" :class="item"></div>
            <div class="name">{{name(item)}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props:['items'],
    methods: {
        name(i) {
            switch(i) {
                case "sjlx":
                    return "随机练习";
                case "zjlx":
                    return "章节练习";
                case "zxlx":
                    return "专项练习";
                case "ctb":
                    return "错题本";
                case "sc":
                    return "收藏";
            }
        },

        click(i) {
            this.$router.push(`/${i}`)
        }
    }
}
</script>
<style scoped lang="scss" >
    .itemCon {
        display: flex;
        justify-content: space-around;
        align-content: center;
        border-bottom: 1px solid rgba($color: #000000, $alpha: .1);
        .item {
            display: flex;
            height: 98px;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: #333;
            font-size: 14px;

            .img {
                width: 40px;
                height: 40px;
                margin-bottom: 8px;
                background: url(http://j1.58cdn.com.cn/dist/jxedt/h5/m_new/img/km14.2a68af5.png) no-repeat;
                background-size: 40px 320px;
            }
            
            .zjlx {
                background-position: 0 -120px;
            }

            .zxlx {
                background-position: 0 -80px;
            }
            
            .ctb {
                background-position: 0 -160px;
            }
            
            .sc {
                background-position: 0 -40px;
            }
        }
    }
</style>