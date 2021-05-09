<template>
  <div class="Account">
    <goBack class="goBack"></goBack>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane class="userinfo" label="用户信息" name="first">
        <el-row>
          <span class="el-icon-user-solid">账号：</span>
          <span>123456789</span>
        </el-row>
        <el-row>
          <span class="el-icon-info">密码：</span>
          <span>123456789</span>
        </el-row>
        <el-row>
          <span class="el-icon-phone">电话：</span>
          <span>123456789</span>
        </el-row>
      </el-tab-pane>
      <el-tab-pane class="editInfo" label="修改信息" name="second">
        <el-row v-for="(item,index) in userInfo" :key="item.label">
          <el-col :span="4">
            <el-button @click.native="edit(index)" type="primary" icon="el-icon-edit" circle></el-button>
          </el-col>
          <el-col :span="4">
            <span>{{ item.label }}：</span>
          </el-col>
          <el-col :span="16">
            <el-input v-if="item.isEdit" v-model="item.key"></el-input>
            <span v-else>{{ item.key }}</span>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="历史订单" name="third"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import goBack from "@/views/components/Goback";

export default {
  components: {
    goBack,
  },
  data() {
    return {
      activeName: "first",
      userInfo:[
        {
          label:'密码',
          key:'123456789',
          isEdit:false,
        },
        {
          label:'电话',
          key:'178732278',
          isEdit:false,
        }
      ]
    };
  },
  methods: {
    edit(i){
      this.userInfo[i].isEdit = !this.userInfo[i].isEdit;
    }
  },
};
</script>
<style scoped>
.Account{
  font-size:16px;
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201609%2F11%2F153731uuksqetqd4cdulsc.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622987816&t=2c072f746366c725df9636ffb092a0bd) no-repeat;
  background-size: cover;
  height: 100%;
}

.userinfo {
  color: #409eef;
}
.userinfo .el-row {
  padding: 0.3rem 0;
}



.editInfo .el-row{
  display: flex;
  align-items:center;
  margin-bottom:10px;
  color: #409eff;
}


.goBack {
  height: 2rem;
}
</style>