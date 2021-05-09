<template>
  <el-container class="pay">
    <el-header>
      <goBack class="goback"></goBack>
    </el-header>

    <el-main>
      <el-row v-for="item in orderList" :key="item.key" class="food-detail">
        <el-col :span="8">
          <el-image
            style="width: 100px; height: 100px"
            :src="item.url"
            :fit="item.fit"
          ></el-image>
        </el-col>
        <el-col :span="16" class="food-info">
          <el-row>
            <el-col :span="16">{{ item.title }}</el-col>
            <el-col :span="8" v-if="item.isdiscount"
              >￥{{
                getCountPrice(item.total, item.price, item.discount)
              }}</el-col
            >
            <el-col :span="8" v-else> ￥{{ item.total * item.price }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="16">×{{ item.total }}</el-col>
            <el-col :span="8" class="discount" v-if="item.isdiscount"
              >￥{{ item.total * item.price }}</el-col
            >
          </el-row>
        </el-col>
      </el-row>
    </el-main>

    <el-footer>
      <span>合计：</span>
      <div class="total">{{ total }}</div>
      <el-button type="primary" @click.native='submit'>提交订单</el-button>
    </el-footer>
  </el-container>
</template>
<script>
import goBack from "@/views/components/Goback";
import { ADD_USER_ORDER_LIST } from '@/store/mutations-types.js';

export default {
  components: {
    goBack,
  },
  data() {
    return {
      orderList: {},
      total: 0,
    };
  },
  computed: {
    getCountPrice() {
      return function (n, price, discount) {
        return (n * price * discount).toFixed(2);
      };
    },
  },
  methods:{
      submit(){
          this.$store.commit(ADD_USER_ORDER_LIST,this.orderList);
      }
  },
  created() {
    this.orderList = this.$route.params.data;
    this.total = this.$route.params.total;
  },
};
</script>

<style scoped>
.pay {
  height: 100%;
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F04%2F91%2F43%2F25590aee8cd0c9a.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622986534&t=0555e81e8edf0543f2dfb68c0ae6cf8a) no-repeat;
  background-size:cover;
}

/* header */
.el-header .goback {
  height: 100%;
}

/* main */
.el-main {
  position: relative;
  font-size: 16px;
  color: #000;
  height: 50%;
  overflow: scroll;
  box-shadow: 0 0 3px 1px #e9e9eb;
}
.food-detail {
  padding: 5px;
  margin-bottom: 10px;
  height: 112px;
  border: 1px solid #e9e9eb;
}

.food-info {
  position: relative;
  height: 100%;
}

.food-info .el-row:first-child {
  margin-bottom: 5px;
}

.food-info .discount {
  text-decoration: line-through;
  font-size: 14px;
  color: #666;
}

/* footer */
.el-footer{
    display: flex;
    align-items:center;
    justify-content:flex-end;
}
.el-footer span{
    font-size: 16px;
    font-weight:bold;
}
.el-footer .total{
    font-size: 20px;
    color: #f00;
    margin-right:5px;
}
.el-footer .el-button{
    border-radius:20px;
}
</style>>