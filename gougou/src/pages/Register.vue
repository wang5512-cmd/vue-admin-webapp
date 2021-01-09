<template>
  <div class="reg">
    <!-- <img src="../../public/傻瓜.jpg" alt="" class="logo" /> -->
    <el-upload
      class="avatar-uploader"
      action="uploadData"
      :http-request="UploadImage"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img
        v-if="imageUrl"
        :src="'http://localhost:8888/' + imageUrl"
        style="width: 100px; height: 100px"
      />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="repwd"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="请再次输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
    <div class="link">
      <router-link :to="{ name: 'Login' }">已有账号，我要登录!</router-link>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  name: "Reg",
  data() {
    return {
      username: "",
      password: "",
      repwd: "",
      avatar: "",
      imageUrl: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.password === this.repwd) {
        this.$http
          .post("/api//movie/create", {
            title: this.username,
            stars: this.password,
            imgurl: this.imageUrl,
          })
          .then((res) => {
            console.log(res);
            if (res.data.code == 20000) {
              Notify({ type: "success", message: "注册成功" });
              this.$router.push("/login");
            } else {
              Notify({ type: "danger", message: "用户已存在" });
            }
          });
      } else {
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(11111, res);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type == "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传图片
    UploadImage(param) {
      let uploadData = new FormData();
      uploadData.append("avatar", param.file);
      // 上传图片的接口  传上去后让后台返回一个地址
      this.$http.post("/api/upload", uploadData).then((res) => {
        this.imageUrl = res.data.path;
      });
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}
.reg {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 3rem;
}
.link {
  width: 100%;
}
.link a {
  float: right;
  margin-right: 1.5rem;
  font-size: 0.8rem;
  color: blue;
}
.van-radio-group {
  margin: 1rem;
}
.logo {
  margin-bottom: 2.5rem;
}
.van-form {
  margin-top: 2rem;
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
  width: 125px;
  height: 125px;
  border-radius: 50%;
  display: block;
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
</style>
