<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->
    <!--
      1.使用 vant-form 组件包裹所有的表单项 van-filed
      2.给 van-form 绑定submit 事件
        当表单提交的时候会触发 submit事件，只要表单验证通过，他才会调用submit
      3.使用Filed的rules属性定义

    -->
    <!-- 登录表单 -->
    <van-form
    :show-error ="false"
    :show-error-message = "false"
    :validate-first = "true"
    ref="login-form"
    @submit="onLogin"
    @failed="onFailed"
    >
      <van-field
       v-model="user.mobile"
       name="mobile"
       placeholder="请输入用户名"
       :rules="formRules.mobile"
       >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="formRules.code"
        >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
          v-if="isCountDownShow"
           :time="1000*5"
           format="ss s"
           @finish="isCountDownShow = false"
            />
          <van-button
            v-else
            class="send-sms-btn"
            round size="small"
            type="default"
            @click.prevent="onSendSms"
            >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrip">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{9}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false // 控制倒计时和发送按钮的显示状态
    }
  },
  methods: {
    async onLogin () {
      // 1.获取表单登录数据
      const user = this.user
      // Todo:2.表单验证
      Toast.loading({
        message: '加载中...',
        forbidClick: true, // 加载时，静止背景点击
        duration: 0 // 设置加载效果展示时长（为 0 一直展示，后面控制消失）
      })
      // 3.提交表单请求登录
      try {
        const res = await login(user)
        Toast.success('登录成功')
        console.log('登录成功', res)
      } catch (err) {
        if (err.response.status === 400) {
          Toast.fail('手机号或验证码错误')
          console.log('手机号或验证码错误', err)
        } else {
          console.log('请稍后再试')
          Toast.fail('登录失败，请稍后重试')
        }
      }
    },
    onFailed (error) {
      console.log(error)
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: 'top' // 调整提示信息至顶部
        })
      }
    },
    async onSendSms () {
      // 校验手机号码
      // 校验通过 -> 请求发送验证码 -> 用户接受短信 -> 输入验证码 -> 请求登录
      // 请求发送验证码 -> 隐藏发送按钮，显示倒计时
      // 倒计时结束 -> 隐藏倒计时，显示发送按钮

      // this.$refs['login-form'].validate('code').then(data => {console.log(data);})
      try {
        // 校验手机号码
        await this.$refs['login-form'].validate('mobile')
        // 验证通过，请求发送验证码
        await sendSms(this.user.mobile)
        // 发出短信后，隐藏发送按钮，显示倒计时
        this.isCountDownShow = true
        // 倒计时结束 -> 隐藏倒计时，显示发送按钮
        // 监视倒计时的 finish 事件
      } catch (err) {
        // try 里面的任何代码的错误都会进入 catch
        // 不同的错误需要有不同的提示，下面进行错误类型的判断
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '请不要频繁发送'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        Toast({
          message,
          position: 'top' // 调整提示信息至顶部,
        })
      }
    }
  }

}
</script>
<style lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
}

.send-sms-btn {
  width: 152px;
  height: 46px;
  background-color: #ededed;
  line-height: 46px;
  font-size: 22px;
  color: #666;
}

.login-btn-wrip {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>
