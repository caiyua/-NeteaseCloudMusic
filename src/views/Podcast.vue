<template>
  <div class="container">
    播客
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <p>刷新次数: {{ count }}</p>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'Podcast',
  data () {
    return {
      count: 0,
      isLoading: false,
    };
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        console.log(1);
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100% !important;
  .van-pull-refresh {
    height: 100%;
  }
}
</style>