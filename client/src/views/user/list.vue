<template>
  <div class="app-container">
    <div class="citylist">
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" ref="colInd" width="50"></el-table-column>
        <el-table-column label="日期">
          <template scope="scope">{{scope.row['createdAt'] | dataFormat }}</template>
        </el-table-column>
        <el-table-column prop="name" label="城市"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="primary" @click="jumpedit(scope.row._id)">修改</el-button>
            <el-button type="danger" @click="deletecity(scope.row._id)">删除</el-button>
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
      ></el-pagination>
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
      total: 0,
      page: 1,
      pagesize: 3,
    };
  },
  created() {
    this.getCityList();
  },

  methods: {
    getCityList() {
      var start = (this.page - 1) * this.pagesize;
      var end = this.pagesize;
      axios.get("/citys?start=" + start + "&end=" + end).then((res) => {
        if (res.data.code == 20000) {
          console.log(res);
          this.list = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    jumpedit(id) {
      this.$router.push({
        path: "/city/edit/" + id,
      });
    },
    deletecity(id) {
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.post("/city/delete/" + id).then((res) => {
            if (res.data.code === 20000) {
              // 删除的时候如果删除的是最后一条数据那么让它的page-1
              if(this.list.length%3==1){
                this.page-=1
              }
              // 删除的时候如果第一页只有一条数据那么就让他的page=1
              if(this.list.length==1){
                this.page = 1
              }
              this.getCityList();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // axios.get('/city/delete/'+id).then(res => {

      // })
    },
    // 点击显示当前的页码
    changePage(page) {
      this.page = page;
      this.getCityList();
    },
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
.citylist {
  margin: 30px;
}
</style>
