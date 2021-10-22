<template>
   <div class="article-list">
       <van-pull-refresh
        v-model="isRefreshLoading"
        :success-text="refreshSuccessText"
        @refresh="onRefresh">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <!-- 这是用来显示文章内容的组件，将得到得文章数据，传入子组件进行处理显示 -->
            <article-item
                v-for="(article,index) in articles"
                :key="index"
                :article="article"
            >
            </article-item>
            <!-- <van-cell
                v-for="(article,index) in articles"
                :key="index"
                :title="article.title"
            /> -->
            </van-list>
        </van-pull-refresh>

   </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/aritcle-item/index.vue'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // 这是自己写死的测试数据，因为接口返回的是空数组数据
      articles: [
        {
          // 频道新闻推荐v-1.0
          art_id: 1,
          title: '这是一篇测试文章这是一篇测试文章这是一篇测试文章这是一篇测试文章这是一篇测试文章这是一篇测试文章这是一篇测试文章这是一篇测试文章这是一篇测试文章',
          aut_id: 1,
          aut_name: '李白',
          comm_count: 0,
          pubdate: '2021-10-1',
          is_top: 1,
          cover: {
            images: ['https://img01.yzcdn.cn/vant/cat.jpeg'],
            type: 1
          }

        },
        {
          // 频道新闻推荐v-1.0
          art_id: 1,
          title: '这是一篇测试文章',
          aut_id: 1,
          aut_name: '李白',
          comm_count: 0,
          pubdate: '2021-9-1',
          is_top: 1,
          cover: {
            images: ['https://img01.yzcdn.cn/vant/cat.jpeg', 'https://img01.yzcdn.cn/vant/cat.jpeg', 'https://img01.yzcdn.cn/vant/cat.jpeg'],
            type: 3
          }

        }

      ],
      loading: false, // 控制加载中的转态
      finished: false, // 控制加载结束的状态，当加载结束不再控制加载更多
      timeStamp: null, // 获取下一页数据的时间戳
      isRefreshLoading: false, // 下拉刷新的loading状态
      refreshSuccessText: '更新成功' // 下拉刷新的成功提示文本
    }
  },
  methods: {
    async onLoad () {
      // 1.获取请求数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        timestamp: this.timeStamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      // 2.把数据放到list数组中，接口失效，取消对 data 中数据的赋值
      const results = data.data
      // this.articles.push(results)

      // 3.设置本次加载状态结束，他才可以判断是否需要加载下一次，否则就会永远停留在这里
      if (results.length) {
        // 更新获取下一页数据的页码
        this.timeStamp = data.data.pre_timestamp
      } else {
        // 没有数据的了，将加载的状态设置为结束，不再触发加载更多
        this.finished = true
      }
    },
    async onRefresh () {
      // 下拉刷新，组件自己就会展示Loading状态
      // 1.请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(), // 传回不同的时间戳，都会返回不同的数据
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      const results = data.data
      // 2.把数据放到数据列表中，往顶部追加,由于接口失效，暂时取消对 data 中数据的赋值
      results.keys() > 2 && this.articles.unshift(...results)
      // 3.关闭刷新的状态 Loading
      this.isRefreshLoading = false
    }
  }

}
</script>

<style scoped lang="less">
.article-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 70px;
    top:180px;
    overflow-y: auto;
}
</style>
