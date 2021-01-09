<template>
  <div class="app-container">
    <div class="citylist">
      <el-table :data="list" style="width: 100%">
        <el-table-column label="日期">
          <template scope="scope">{{scope.row['createdAt'] | dataFormat }}</template>
        </el-table-column>
        <el-table-column prop="title" label="电影名字"></el-table-column>
        <el-table-column prop="stars" label="电影演员"></el-table-column>
        <el-table-column prop="ratings" label="电影评分"></el-table-column>
        <el-table-column prop="description" label="电影描述"></el-table-column>
        <el-table-column prop="p.name" label="所属城市"></el-table-column>
        <el-table-column label="电影图片">
          <template scope="scope">
            <img :src="scope.row.imgurl" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template scope="scope">
            <el-button type="primary" @click="jumpedit(scope.row._id)">修改</el-button>
            <el-button type="danger" @click="deletemovie(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pagesize"
        :current-page="page"
        @current-change="changePage"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CityList",
  data() {
    return {
      list: [],
      total:0,
      page: 1,
      pagesize: 3,
    };
  },
  created() {
    this.getMovieList();
  },

  methods: {
    // 获取电影列表
    getMovieList() {
      var start = (this.page - 1) * this.pagesize;
      var end   =  this.pagesize;
      axios.get("/movies?start="+start+'&end='+end).then((res) => {
        if (res.data.code == 20000) {
          console.log(res);
          this.list = res.data.list;
          this.total = res.data.total
        }
      });
    },
    jumpedit(id) {
      this.$router.push({
        path: "/movie/edit/" + id,
      });
    },
    deletemovie(id) {
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.post("/movie/delete/" + id).then((res) => {
            if (res.data.code === 20000) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getMovieList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // axios.get('/movie/delete/'+id).then(res => {

      // })
    },
    // 点击显示当前的页码
    changePage(page){
      this.page = page
      this.getMovieList()
    }
  },
  filters: {
    dataFormat(str) {
      var time = new Date(str);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      return `${y}-${m}-${d}`;
    },
  },
};
</script>

<style scoped>
.movielist {
  margin: 30px;
}
img{
  width:100px;
  height:100px;
}
</style>
