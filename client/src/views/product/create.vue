<template>
  <div class="createcity">
    <el-row>
      <el-col :span="24">
        <div>
          <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
          </el-radio-group>
          <div style="margin: 20px;"></div>
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input v-model="formLabelAlign.type"></el-input>
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
      city: {
        name: "",
      },
      labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
    };
  },
  methods: {
    onSubmit() {
      axios
        .post("/city/create", {
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
  },
};
</script>
<style scoped>
.createcity {
  margin: 30px;
}
</style>
