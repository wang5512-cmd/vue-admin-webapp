<template>
  <div class="app-container">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column label="日期">
          <template scope="scope">{{scope.row['createdAt'] | dataFormat }}</template>
        </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column label="操作">
          <template scope="scope">
            <el-button type="primary">修改</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
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
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
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
