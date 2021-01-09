<template>
  <div class="editcity">
    <el-row>
      <el-col :span="24">
        <div>
          <el-form>
            <el-form-item label="城市名称">
              <el-input v-model="city.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即修改</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      city: {
        name: "",
      },
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getcity()
  },
  methods: {
    onSubmit() {
      axios
        .post(`/city/edit`, {
          id: this.id,
          name: this.city.name,
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.$router.push({
              path: "/city/list",
            });
          }
        });
    },
    getcity() {
      axios.get("/city/" + this.id).then((res) => {
        console.log(res);
        this.city.name = res.data.city.name;
        // 获取数据库中的_id 重新赋值为数据库中的_id
        this.id = res.data.city._id;
      });
    },
  },
};
</script>
<style scoped>
.editcity {
  margin: 30px;
}
</style>
