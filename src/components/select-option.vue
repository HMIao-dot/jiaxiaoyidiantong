<template>
    <div class="option" @click="$emit('click')">
        <div class='button' v-if=" click==='null' ||click==='rightbutton' || !select" :class="[{null:click === 'null'}, {rightbutton: click === 'rightbutton'},{select: click === 'select'}]">{{button}}</div>
        <div class='button' :class="click" v-else></div>
        <div class="option_text" >{{option}}</div>
    </div>
</template>

<script>
export default {
    props:['item',"option","rightOption","selectOption","select"],
    computed: {
        button(){
            switch(this.item){
                case 0:
                    return "A";
                case 1:
                    return "B";
                case 2:
                    return "C";
                case 3:
                    return "D";
            }
            return null;
        },

        click(){
            // console.log(this.rightOption,this.selectOption)
            if(this.rightOption.length >=2) {
                // console.log(this.select)
                if(!this.select){
                    for(let t = 0; t <this.selectOption.length; t++){
                        if(this.selectOption[t] == this.item + 1) {
                            return "select"
                        }
                    }
                }else {
                    for(let i = 0; i < this.rightOption.length; i++) {
                        if(this.rightOption[i] == this.item + 1) {
                            for(let y = 0 ; y < this.selectOption.length; y++){
                                if(this.selectOption[y] == this.item + 1) {
                                    return "true"
                                }
                            }
                            return "rightbutton"
                        }
                    }
                    for(let t = 0; t <this.selectOption.length; t++){
                        if(this.selectOption[t] == this.item + 1) {
                            return "false"
                        }
                    }
                }
                return "null"
            }else{
                if(this.selectOption !== null) {
                        if(this.rightOption == this.item + 1) {
                            return "true"
                        }else {
                            if(this.selectOption == this.item + 1) {
                                return "false"
                            }else{
                                return "null"
                            }
                        }
                }else {
                    return "null"
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .button {
        display: inline-block;
        position: absolute;
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        margin-right: 10px;
        border: 1px solid #d4d4d4;
        border-radius: 50%;
        font-size: 14px;
    }

    .option {
        margin-top: 30px;
        line-height: 27px;
    }

    .option_text {
        margin-left: 37px;
        line-height: 22px;
        padding-top: 2px;
    }

    .true {
        background: url(http://j2.58cdn.com.cn/jxedt/m/kaoshi/images/lx_item_state_right.png) no-repeat;
        background-size: 100%;
    }
    
    .false {
        background: url(http://j2.58cdn.com.cn/jxedt/m/kaoshi/images/lx_item_state_wrong.png) no-repeat;
        background-size: 100%;
    }

    .select {
        background-color: #beaadc;
        color: #fff;
    }

    .rightbutton {
        background-color: #18bc80;
        color: #fff;
        border-color: #18bc80;
    }
</style>