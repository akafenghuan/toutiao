<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
      class="base-info"
        center
        :border="false"
        >
        <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="currentUser.photo"
        />
        <div class="name" slot="title">{{currentUser.name}}</div>
        <van-button
            class="update-btn"
            size="small"
            round
        >
            编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item" >
            <div class="text-wrap" slot="text">
                <div class="count">{{currentUser.art_count}}</div>
                <div class="text">头条</div>
            </div>
        </van-grid-item>
        <van-grid-item class="data-info-item" >
            <div class="text-wrap" slot="text">
                <div class="count">{{currentUser.follow_count}}</div>
                <div class="text">关注</div>
            </div>
        </van-grid-item>
        <van-grid-item class="data-info-item" >
            <div class="text-wrap" slot="text">
                <div class="count">{{currentUser.fans_count}}</div>
                <div class="text">粉丝</div>
            </div>
        </van-grid-item>
        <van-grid-item class="data-info-item" >
            <div class="text-wrap" slot="text">
                <div class="count">{{currentUser.like_count}}</div>
                <div class="text">获赞</div>
            </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else class="not-login header">
       <div @click="$router.push('/login')">
            <img class="mobile" src="./mobile.png" alt="">
        </div>
       <div class="text">登录 / 注册</div>
    </div>
    <van-grid class="nav-grid mb-9" :column-num="2">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
        />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
        />
    </van-grid>
    <van-cell title="消息通知" is-link url="/" />
    <van-cell class="mb-9" title="小智同学" is-link to="/" />
    <van-cell
    v-if="user"
    class="logout-cell"
    title="退出登录" is-link to=""
    @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {} // 当前登录用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout () {
      // 提示用户是否确认退出
      // 确认 -> 处理退出
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      })
        .then(() => { // 确认执行这里
          // 清除用户登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => { // 取消执行这里
          // on cancel
        })
    },
    // 定义获取用户信息的函数，以便在created使用
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    }
  },
  // 一上来就获取用户信息
  created () {
    this.loadCurrentUser()
  }
}
</script>

<style lang="less" scoped>
.my-container {
    .my-info {
        background: url("./banner.png");
        background-size: cover;
        .base-info {
            box-sizing: border-box;
             height: 231px;
            background-color: unset;
            padding-top: 76px 32px 23px;
            .avatar {
               box-sizing: border-box;
               width: 132px;
               height: 132px;
               border: 4px solid #fff;
               margin-right: 23px;
            }
            .name {
                color: #fff;
                font-size: 30px;
            }

        }
        .data-info {
            .data-info-item {
                height: 130px;
                color: #fff;
                .text-wrap {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .count {
                    font-size: 36px;
                }
                    .text {
                        font-size: 23px;
                }
                }

            }
        }

        /deep/.van-grid-item__content {
            background-color: unset;
        }
    }

    .not-login {
        height: 180px;
        background: url("./mobile.png") no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .mobile {
            width: 132px;
            height: 132px;
        }
        .text {
            font-size: 28px;
            color: #fff;
        }
    }
    .nav-grid {
       /deep/ .nav-grid-item {
            height: 140px;
            .toutiao {
                font-size: 45px;
            }
           .toutiao-shoucang {
                color: #eb5253;
            }
            .toutiao-lishi {
                color:#ff9d1d;
            }
            .van-grid-item__text {
                font-size: 28px;
            }
        }
    }
    .logout-cell {
        text-align: center;
        color: #d86262;
    }

    .mb-9 {
        margin-bottom: 9px;
    }
    .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
}
</style>
