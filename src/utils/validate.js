import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'zh_CN',
})
Vue.use(VeeValidate, {
    i18n,
    i18nRootKey: 'validation',
    dictionary: {
        zh_CN
    }
});
Validator.extend('required', {
    getMessage: (field) => {
        //fidld为name的参数
        return field + '不能为空'
    },
    validate: value => {
        return !!value
    }
})
Validator.extend('phone', {
    getMessage: (field) => {
        return '请输入正确的手机号码'
    },
    validate: value => {
        return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)
    }
})
Validator.extend('ConfirmPassword', {
    getMessage: (field) => {
        return '密码不一致'
    },
    validate: (value, a) => {
        if (value == a) return true
        return false
    }
})
//表单校验 在注册页面使用到了







