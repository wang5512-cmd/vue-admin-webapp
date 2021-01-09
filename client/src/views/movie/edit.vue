<template>
  <div class="createmovie">
    <el-row>
      <el-col :span="24">
        <div>
          <el-upload
            class="avatar-uploader"
            action="uploadData"
            :http-request="UploadImage"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" style="width: 100px;height: 100px;" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-form>
            <el-form-item label="电影名称">
              <el-input v-model="movie.title"></el-input>
            </el-form-item>

            <el-form-item label="演员">
              <el-input v-model="movie.stars"></el-input>
            </el-form-item>
            <el-form-item label="所属城市">
              <el-select v-model="region" placeholder="请选择活动区域">
                <el-option :label="item.name" :value="item._id" v-for="item in citys" :key="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评分">
              <el-input v-model="movie.ratings"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="movie.description"></el-input>
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
import axios from "axios";
export default {
  data() {
    return {
      movie: {
        title: "",
        imgurl: "",
        description: "",
        stars: "",
        ratings: "",
      },
      imageUrl: "",
      region: "",
      citys: [],
      id:''
    };
  },
  created(){
    this.id = this.$route.params.id
    this.getCitys()
    this.getMovie()
  },
  methods: {
    onSubmit() {
      axios
        .post("/movie/edit", {
          id:this.id,
          title: this.movie.title,
          imgurl: this.imageUrl,
          description: this.movie.description,
          stars: this.movie.stars,
          ratings: this.movie.ratings,
          p:this.region
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.$router.push({
              path: "/movie/list",
            });
          }
        });
    },
    // 图片上传之前处理
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type == 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 上传图片
      UploadImage(param) {
        let uploadData = new FormData();
        uploadData.append('avatar', param.file);
         // 上传图片的接口  传上去后让后台返回一个地址
        axios.post('/upload',uploadData).then(res=>{
          this.imageUrl=res.data.path
        })
      },
      // 获取电影信息
      getMovie(){
        axios.get('/movie/'+this.id).then(res=>{
          this.movie.title = res.data.movie.title
          this.movie.imgurl = res.data.movie.imgurl
          this.movie.description = res.data.movie.description
          this.movie.stars = res.data.movie.stars
          this.movie.ratings = res.data.movie.ratings
          this.imageUrl=res.data.movie.imgurl
        })
      },
      // 获取城市接口，将数据放在select里面
      getCitys(){
        axios.get('/getcitys').then(res=>{
          this.citys = res.data.list
        })
      }
  },
};
</script>
<style scoped>
.createmovie {
  margin: 30px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
