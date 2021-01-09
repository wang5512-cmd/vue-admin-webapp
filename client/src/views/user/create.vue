<template>
  <div class="createcity">
    <el-row>
      <el-col :span="24">
        <div>
          <el-form>
            <el-form-item label="城市名称">
              <el-input v-model="city.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      city: {
        name: ''
      },

    }
  },
  methods: {
    onSubmit(){
      axios.post('/city/create',{
        name: this.city.name
      }).then(res => {
        if(res.data.code == 20000){
          this.$router.push({
            path: '/city/list'
          })
        }
      })
    }
  }
};
</script>
<style scoped>
.createcity {
  margin: 30px;
}
</style>
