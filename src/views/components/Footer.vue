<template>
  <el-container>
    <el-row style="width: 100%">
      <el-col :span="8">
        <i
          class="el-icon-platform-eleme el-icon"
          :class="{ blue: isOrder }"
        ></i>
        <span class="total">￥{{ total }}</span>
      </el-col>
      <el-col :span="16">
        <el-button v-if="!isOrder" type="info" class="btn" round disabled >￥10元起送</el-button>
        <el-button
          v-else
          type="primary"
          class="btn"
          @click.native="submit"
          round
          >去结算</el-button>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      isOrder: false,
      orderList:{}
    };
  },
  props: {
    total: {
      type: Number,
      require: true,
      default: 0,
    },
    foodList: {
      type: Array,
      default: [],
    },
    status:{
      type:Object,
      default:{},
    }
  },
  methods: {
    submit() {
      // 抛数据
      this.orderList = this.foodList.filter((item)=>{
        return item.total > 0;
      });
      console.log(this.orderList);

      // 检测登录授权状态
      if(!this.status.isLogin){
        this.$alert('请登录','检测到你未登录',{
          confirmButtonText:'确定',
          center:true,
          callback:action=>{
            this.$message({
              type:'info',
              message:`action:${action}`
            })
          }
        })
        return ;
      }
      this.$router.push({name:'pay',params:{data:this.orderList,total:this.total}});
    },
  },
  watch:{
    total:{
      handler(val){
        if(val > 0){
          this.isOrder = true;
        }else{
          this.isOrder = false;
        }
      }
    }
  }
};
</script>

<style scoped>
.el-container{
  height: 100%;
}
.el-row{
  height: 100%;
}
.el-col{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-icon {
  font-size: 32px;
  background-color: #fff;
  color: #909399;
}
.total {
  font-size: 16px;
}
.btn {
  width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 切换样式 */
.blue {
  color: #409eff;
}
</style>