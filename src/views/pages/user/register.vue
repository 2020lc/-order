<template>
    <el-container class="register">
        <el-page-header @back="goBack" content="首页"></el-page-header>
       <el-form ref="registerForm" :model="form" :rules='rules' label-width="35%" >
           <el-form-item label="用户名" prop="user">
               <el-input v-model="form.user" type="text" placeholder="请输入用户名"></el-input>
           </el-form-item>
           <el-form-item label="密码" prop="pwd">
               <el-input v-model="form.pwd" type="password" placeholder="请输入密码" ></el-input>
           </el-form-item>
            <el-form-item label="确认密码" prop="repeatpwd">
               <el-input v-model="form.repeatpwd" type="password" placeholder="请再次输入密码"></el-input>
           </el-form-item>
           <el-form-item label="电话" prop="telephone">
               <el-input v-model="form.telephone" placeholder="电话号码"></el-input>
           </el-form-item>
           <el-form-item>
               <el-button type="primary" @click.native="onSubmit('registerForm')">提交</el-button>
               <el-button type="primary" @click.native="reset('registerForm')">重置</el-button>
           </el-form-item>
       </el-form>
    </el-container>
</template>
<script>
import  { ADD_USER } from '@/store/mutations-types.js'
export default {
    data(){
        //验证电话号码
        let checkTelePhone = (rule,value,callback)=> {
            let reg = /\d{9,15}/g;
            if(!value){
                return callback(new Error('电话不能为空'));
            }else if(!reg.test(value)){
                return callback(new Error('9-15位数字'));
            }else{
                callback();
            }
        }
        //验证第二次输入密码
        let checkPwd = (rule,value,callback)=>{
            if(!value){
                return callback(new Error('请再次输入密码'));
            }else if(value != this.form.pwd){
                return callback(new Error('两次输入密码不一致'));
            }else{
                return callback();
            }
        }
        return {
            pageId:'',
            form:{
                user:'',
                pwd:'',
                repeatpwd:'',
                telephone:'',
            },
            rules:{
                user:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {min:6,max:15,message:'长度在6-15个之间',trigger:'blur'}
                ],
                pwd:[
                    {required:true,message:'请输入密码',trigger:'blur'},
                    {min:6,max:15,message:'长度在6-15个之间',trigger:'blur'}
                ],
                repeatpwd:[
                    {validator:checkPwd,trigger:'blur'}   
                ],
                telephone:[
                    {validator:checkTelePhone,trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        onSubmit(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    this.$delete(this.form,'repeatpwd')
                    this.$store.commit(ADD_USER,this.form);
                    confirm('提交成功');
                    this.$router.push({name:'home'});
                }else{
                    console.log('请检查是否正确填写信息!!!');
                    return false;
                }
            })
        },
        reset(formName){
            this.$refs[formName].resetFields();
        },
        goBack(){
            this.$router.push({name:'home'});
        }
    },
    created(){
        this.pageId = this.$route.params.id;
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
    background-image: linear-gradient(45deg,#E6A23C,#409EFF);
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