<template>
  <!-- <div class="article-item">文章列表项</div> -->
  <van-cell
    class="article-item"
  >
  <!-- 文章标题部分 (解决超出三行显示省略号可以添加内置样式 van-multi-ellipsis--l3)-->
    <div slot="title" class="title van-multi-ellipsis--l3">{{article.title}}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <!-- 当文章有三张封面时，将图片显示在作者、评论、发布时间的上方 -->
        <div
          class="cover-wrap-item"
          v-for="(img,index) in article.cover.images"
          :key="index"
        >
           <van-image
              class="cover-item"
              fit="cover"
              :src="img"
            />
            <!-- :src="article.cover.images[0]" -->
        </div>
      </div>
      <!-- 使用插槽来显示文章的 作者、评论、发布时间 -->
      <div class="lable-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <!-- 默认插槽的名字可以叫default，名字可以省略 -->
    <!-- 当文章只有一张封面时，将其显示与文章右侧 -->
    <van-image
    class="right-cover"
      v-if="article.cover.type === 1"
      fit="cover"
      :src="article.cover.images[0]"
    />
      <!-- :src="article.cover.images[0]" -->

  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
 .article-item {
  .title {
     font-size:32px;
     color:#3a3a3a;
  }
  // 取消图片封面显示的flex属性，以便左侧文章区域均分剩余区域
  /deep/.van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    margin-left: 12px;
  }
  // 为文章右侧封面单独设置样式，在行内设置样式不会被 rem 转换
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-wrap-item{
      flex: 1;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item {
        height: 146px;
        width: 100%;
      }
    }
  }

  .lable-wrap {
    font-size: 16px;
    color: #b4b4b4;
    span {
      margin-right: 12px;
    }
  }

}

</style>
