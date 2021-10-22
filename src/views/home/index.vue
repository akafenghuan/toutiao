<template>
   <div class="home-container">
       <!-- 导航栏-->
        <van-nav-bar class="page-nav-bar" >
            <van-button
                class="search-btn"
                slot="title"
                type="info"
                icon="search"
                round
                size="small"
            >
            搜索
            </van-button>
        </van-nav-bar>
        <!-- /导航栏-->
        <!--
            标签页组件有一个功能，只有第一次查看标签页的时候才会渲染里面的内容
         -->
        <!-- 文章频道列表 -->
        <van-tabs
        v-model="active"
        class="channel-tabs"
        >
            <van-tab
                class="tab-item"
                :title="channel.name"
                :key="channel.id"
                v-for="channel in channels"
            >
            <!-- 文章列表 -->
            <article-list
                :channel="channel"
            ></article-list>
            <!-- /文章列表 -->
            </van-tab>

        </van-tabs>
        <!-- /文章频道列表 -->

   </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/article-list.vue'
export default {
  name: 'HomeIndex',
  components: { ArticleList },
  data () {
    return {
      active: 2,
      channels: [
        {
          id: 1,
          name: '推荐'
        },
        {
          id: 2,
          name: '前端'
        },
        {
          id: 3,
          name: '后端'
        },
        {
          id: 4,
          name: 'Java'
        }
      ]
    }
  },
  methods: {
    // 请求获取频道数据
    async loadChannels () {
      const { data } = await getUserChannels()
      // 由于返回的频道列表只有一个频道，所以此处依旧使用写死的假数据
      data.data.channels.length > 2 && (this.channels = data.data.channels)
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style lang="less" scoped>
   .home-container {
       /deep/ .van-nav-bar__title {
          max-width: none;
       }
       .search-btn {
           width: 555px;
           height: 64px;
           background-color: #5babfb;
           font-size: 28px;
            border: none;
       }
        // 为频道板块设置样式
       .channel-tabs {
           /deep/.van-tab {
               border-right: 1px solid #edeff3;
               border-bottom: 1px solid #edeff3;
           }
            /deep/.van-tabs__line {
                   width: 30px;
                   height: 6px;
                   background-color: #3296fa;
                   bottom: 40px;
            }
       }
   }

</style>
