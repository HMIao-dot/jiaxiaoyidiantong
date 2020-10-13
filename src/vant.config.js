import { Popup , Cell , CellGroup , Picker, CountDown} from 'vant'

const vants = [Popup , Cell , CellGroup , Picker , CountDown]

export default {
    install(Vue) {
        vants.forEach(Component => {
            Vue.use(Component)
        })
    }
}