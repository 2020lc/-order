<template>
  <el-container class="go-home">
    <el-row>
      <el-col :span="2" class="el-icon-back" @click.native="goBack"></el-col>
    </el-row>
  </el-container>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>
<style scoped>
.el-row{
  width: 100%;
}
.el-row .el-col{
  font-size: 24px;
  color: #409eff;
}
</style>