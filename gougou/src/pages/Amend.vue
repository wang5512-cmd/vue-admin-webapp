<template>
  <div class="amend">
    <van-swipe-cell v-for="(item, index) in movielist" :key="index">
      <van-card
        :price="item.ratings"
        :desc="item.description"
        :title="item.title"
        class="goods-card"
        :thumb="'http://localhost:8888/' + item.imgurl"
      />
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="del(item._id)"
        />
      </template>
    </van-swipe-cell>
    <van-button type="primary" @click="edit">用户修改</van-button>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      movielist: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    getList() {
      this.$http.get("/api/mmovies").then((res) => {
        // console.log(res);
        this.movielist = res.data.list;
        console.log(this.movielist);
      });
    },
    del(id) {
      //   alert(id);
      this.$http.post("/api/movie/delete/" + id).then((res) => {
        console.log(res);
        if (res.data.code === 20000) {
          Toast("删除成功");

          this.getList();
        }
      });
    },
    edit() {
      this.$router.push("/edit");
    },
  },
  created() {
    this.getList();
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {},
};
</script>

<style scoped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>
