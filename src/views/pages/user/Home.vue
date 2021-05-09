<template>
  <el-container class="home">

    <el-header>
      
      <el-row v-if="status.isLogin" class="user-info">
        <span class="el-icon-user-solid"></span>
        <span>{{ status.user }}：{{ nowTime }}</span>
        <router-link class="my" to="./account">
          <span class="el-icon-setting">我的信息</span>
        </router-link>
      </el-row>

      <el-row v-else class="user-info">
        <router-link class="router" to="./login" >登录</router-link>
        <router-link class="router" to="./register" >注册</router-link>
      </el-row>

      <el-row class="hot-show">
        <el-carousel :interval="3000">
          <el-carousel-item v-for="item in getHotFood" :key="item.key">
            <el-image
              style="height: 100%"
              :src="item.url"
              :fit="item.fit"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-row>
    </el-header>


    <el-container class="main">

      <el-aside ref="leftInfo">
        <el-row
          v-for="(item, index) in leftInfo"
          :key="index"
          @click.native="goTarget(index)"
          ><a :href="item.prop">{{ item.title }}</a></el-row
        >
      </el-aside>

      <el-main ref="rightInfo">
        <el-row
          v-for="(item, index) in foodList"
          :key="item.key"
          class="list-box"
          :id="[item.target]"
        >
          <el-col :span="10">
            <el-image
              style="height: 100%"
              :src="item.url"
              :fit="item.fit"
            ></el-image
          ></el-col>
          <el-col :span="14" class="list-title">
            <el-row
              ><b>{{ item.title }}</b></el-row
            >
            <el-row
              v-if="item.isdiscount"
              style="
                border: 1px solid red;
                border-radius: 5px;
                color: red;
                width: 100%；
                height: 30%;
                padding: 5px;
                text-align: center;
              "
              >{{ item.discount * 10 }}折</el-row
            >
            <el-row>
              <el-col :span="10" style="color: red">
                ￥{{
                  item.isdiscount
                    ? discountPrice(index, item.discount).toFixed(2)
                    : item.price
                }}</el-col
              >
              <el-col
                :span="8"
                v-if="item.isdiscount"
                :class="{ del: item.isdiscount }"
                style="color: #909399; position: relative; bottom: -2px"
              >
                ￥{{ item.price }}</el-col
              >
            </el-row>
          </el-col>
          
          <div class="add-btn-box">
            <span
              @click="addfood(index, item.total, item.discount)"
              class="el-icon-circle-plus-outline add-btn"
            ></span>
            <transition name="el-zoom-in-center">
              <div v-show="item.total">
                <span
                  @click="subfood(index, item.total, item.discount)"
                  class="el-icon-remove-outline"
                ></span>
                <span class="count">{{ item.total }}</span>
              </div>
            </transition>
          </div>
          <span v-if="item.ishot" class="hot-icon">招牌</span>
        </el-row>
      </el-main>
    </el-container>

    <el-footer>
      <Footer :status='status' :total="total" :food-list="foodList"></Footer>
    </el-footer>
  </el-container>
</template>

<script>

import Footer from "@/views/components/Footer.vue";
import $ from "jquery";

export default {
  components: {
    Footer,
  },
  data() {
    return {
      status: {
        isLogin: false,
        user: "",
      },
      nowTime: "",
      //总价格
      total: 0,
      leftInfo: [
        { title: "智能推荐", prop: "#recommand" },
        { title: "限时福利", prop: "#welfare" },
        { title: "地道湘味", prop: "#hunan" },
        { title: "超值套餐", prop: "#super" },
        { title: "田园时蔬", prop: "#vegtable" },
      ],
      leftPre: 0,
      //食物信息列表
      foodList: [
        {
          key: 1,
          title: "辣椒炒肉+米饭",
          fit: "cover", //背景图片如何适应容器框
          url:require('@/assets/images/meat2.jpg'),
          ishot: true,
          isdiscount: false,
          discount: 1,
          price: 12.88,
          total: 0,
          target: "recommand",
        },
        {
          key: 2,
          title: "脆笋炒腊肉+米饭",
          fit: "cover", //背景图片如何适应容器框
          url:require('@/assets/images/meat1.jpg'),
          ishot: false,
          isdiscount: true,
          discount: 0.738,
          price: 22.88,
          total: 0,
          target: "",
        },
        {
          key: 3,
          title: "小炒黄牛肉+米饭",
          fit: "cover", //背景图片如何适应容器框
          url:require('@/assets/images/meat3.jpg'),
          ishot: true,
          isdiscount: true,
          discount: 0.665,
          price: 30,
          total: 0,
          target: "welfare",
        },
        {
          key: 4,
          title: "小葱煎蛋+米饭",
          fit: "cover", //背景图片如何适应容器框
          url:require('@/assets/images/egg.jpg'),
          ishot: false,
          isdiscount: false,
          discount: 1,
          price: 13.88,
          total: 0,
          target: "hunan",
        },
        {
          key: 5,
          title: "黄焖鸡+米饭+时蔬",
          fit: "cover", //背景图片如何适应容器框
          url:require('@/assets/images/meat4.jpg'),
          ishot: true,
          isdiscount: true,
          discount: 0.666,
          price: 21.88,
          total: 0,
          target: "vegtable",
        },
      ],
    };
  },
  methods: {
    addfood(i, count, discount) {
      //没有点该食物
      if (!count) {
        this.foodList[i].show = !this.foodList[i].show;
      }
      this.foodList[i].total += 1;
      this.total += this.discountPrice(i, discount);
      this.total = parseFloat(this.total.toFixed(2));

    },
    subfood(i, count, discount) {
      count--;
      if (count < 0) {
        this.foodList[i].show = !this.foodList[i].show;
        return ;
      }
      this.foodList[i].total -= 1;
      this.total -= this.discountPrice(i, discount);
      if (this.total > 0) {
        this.total = parseFloat(this.total.toFixed(2));
      } else {
        this.total = 0;
      }
    },
  },
  computed: {
    discountPrice() {
      return function (i, discount) {
        return this.foodList[i].price * discount;
      };
    },
    getHotFood() {
      let hotList = [];
      hotList = this.foodList.filter((item) => {
        return item.ishot;
      });
      return hotList;
    },
    goTarget() {
      //获得锚点
      return function (cur) {
        let leftNode = this.$refs.leftInfo.$children;
        if (cur !== this.leftPre) {
          $(leftNode[cur].$el.children).addClass("target");
          $(leftNode[this.leftPre].$el.children).removeClass("target");
          this.leftPre = cur;
        }
      };
    },
  },
  created() {
    //获取菜肴信息
    //用户信息显示
    ({ ...this.status } = this.$store.getters.getUserInfo(
      this.$store.state.curUser
    ));
    let time = new Date().getHours();
    switch(true){
      case time < 4:
        this.nowTime = '深夜了,早点休息';
        break;
      case time < 8:
        this.nowTime = '早上好';
        break;
      case time < 12:
        this.nowTime = '上午好';
        break;
      case time < 14:
        this.nowTime = '中午好';
        break;
      case time < 18:
        this.nowTime = '下午好';
      case time < 24:
        this.nowTime = '晚上好';
        break;
    }
    //在这里从后端加载食物信息数据
  },
  mounted() {
    //事件锚点
    $(this.$refs.leftInfo.$children[0].$el.children[0]).addClass("target");
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}
.home {
  font-size: 13px;
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.el-header {
  height: 30% !important;
  padding: 0px;
}
.user-info {
  height: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #409eff;
}

/* 路由跳转 */
.router {
  display: flex;
  align-items: center;
  height: 70%;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #409eff;
  border-radius: 10px;
  padding: 2% 5%;
}
.router:hover,
.my:hover {
  opacity: 0.7;
}
.my {
  text-decoration: none;
  color: #409eff;
}

/* banner */
.hot-show {
  height: 80%;
  border-style: solid;
  border-width: 1px 0px;
  border-color: rgba(0, 0, 0, 0.12);
}
.el-carousel {
  height: 100%;
}

/* main */
.main {
  height: 60% !important;
  position: relative;
  overflow: hidden;
}

.el-aside {
  background-color: #dcdfe6;
  width: 20% !important;
}
.el-aside .el-row {
  display: flex;
  align-items: center;
  height: 10%;
  text-align: left;
}
.el-aside a{
  text-align: center;
  line-height: 1rem;
  height: 100%;
  width:100%;
}

.el-main {
  height: auto;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.list-box {
  height: 3rem;
  position: relative;
  margin-bottom: 5%;
}
.list-box .el-col {
  height: 100%;
}
.list-title {
  padding-left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.list-title .el-row:nth-child(2) {
  width: 50%;
}
.del {
  text-decoration: line-through;
}
.add-btn-box {
  height: 30%;
  position: absolute;
  font-size: 23px;
  background-color: #fff;
  color: #409eff;
  right: 5%;
  bottom: 28%;
  display: flex;
  flex-direction: row-reverse;
}
.add-btn {
  position: relative;
}
.count {
  padding: 5px;
}
.hot-icon {
  position: absolute;
  left: 0px;
  background: chocolate;
  color: #fff;
  padding: 2px;
  border-radius: 2px;
}

.el-footer {
  height: 10% !important;
  width: 100%;
  border-style: solid;
  border-width: 1px 0px 0px 0px;
  border-color: rgba(0, 0, 0, 0.12);
  padding: 0;
}

.target {
  background-color: #fff;
  color: #409eff !important;
}
</style>