<template>
    <el-container class="register">
        <goBack></goBack>
       <el-form ref="registerForm" :model="form" :rules='rules' label-width="35%" >
           <el-form-item label="用户名" prop="user">
               <el-input v-model="form.user" type="text" placeholder="请输入用户名"></el-input>
           </el-form-item>
           <el-form-item label="密码" prop="pwd">
               <el-input v-model="form.pwd" type="password" placeholder="请输入密码" ></el-input>
           </el-form-item>
           <el-form-item>
               <el-button type="primary" @click.native="onSubmit('registerForm')">登录</el-button>
               <el-button type="primary" @click.native="register()">注册</el-button>
           </el-form-item>
       </el-form>
    </el-container>
</template>
<script>

import { CHANGE_LOGIN_STATUS } from '@/store/mutations-types.js'
import goBack from "@/views/components/Goback";

export default {
    components:{
        goBack
    },
    data(){
        //验证密码
        let checkPwd = (rule,value,callback)=>{
            if(!value){
                return callback(new Error('请输入密码'));
            }else{
                let user = this.$store.getters.getUserInfo(this.form.user);
                if(!user){
                    return callback(new Error('没有该账户'));
                }
                if(user.pwd !==  this.form.pwd){
                    return callback(new Error('密码错误，请重新输入'));
                }
                return callback();
            }
        }
        return {
            form:{
                user:'',
                pwd:'',
            },
            rules:{
                user:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {min:6,max:15,message:'长度在6-15个之间',trigger:'blur'}
                ],
                pwd:[
                    {validator:checkPwd,trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        onSubmit(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    let obj = {user:this.form.user,isLogin:true};
                    this.$store.commit(CHANGE_LOGIN_STATUS,obj);
                    this.$router.push({name:'home'});
                }else{
                    return false;
                }
            })
        },
        register(){
           this.$router.push({name:'register'});
        },
        goBack(){
            this.$router.push({name:'home'});
        }
    }
}
</script>
<style scoped>
/* logon */
.logon,
.register{
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: url('../../../assets/images/login-bk.jpg') no-repeat;
    background-size: cover;
}

/* register */
.el-form{
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.el-page-header{
    display: flex;
    height: 5%;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.el-form-item{
    width: 80%;
}
</style>