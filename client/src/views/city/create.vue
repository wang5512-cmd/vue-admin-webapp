<template>
  <div class="createcity">
    <el-row>
      <el-col :span="24">
        <div>
          <el-form>
            <el-form-item label="城市名称">
              <el-input v-model="city.name" @input="firstLetter"></el-input>
            </el-form-item>
            <el-form-item label="城市索引">
              <el-input v-model="city.index"></el-input>
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
import pinyin from "pinyin";
export default {
  data() {
    return {
      city: {
        name: "",
        index: "A",
      },
      regionList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
    };
  },
  created() {

  },
  methods: {
    onSubmit() {
      axios
        .post("/city/create", {
          name: this.city.name,
          index: this.city.index
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.$router.push({
              path: "/city/list",
            });
          }
        });
    },
    firstLetter() {
      var first = pinyin(this.city.name[0], {
        style: pinyin.STYLE_FIRST_LETTER,
      });
      console.log(first)
      this.city.index = first[0][0].toUpperCase()
    },
  },
};
</script>
<style scoped>
.createcity {
  margin: 30px;
}
</style>
