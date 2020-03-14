<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">用户登录</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="输入用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            placeholder="输入密码"
                            v-model="param.password"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item class="remember_me" label="记住我" size="mini" label-width="100px">
                    <el-switch v-model="param.remember_me"></el-switch>

                    <router-link to="/register" style="margin-left: 50px">注册</router-link>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <!--<p class="login-tips">Tips : 用户名和密码。</p>-->
            </el-form>
        </div>
    </div>
</template>

<script>
    import {login} from '../../api/api';
    import axios from 'axios';

    export default {
        data: function () {
            return {
                param: {
                    username: '',
                    password: '',
                    remember_me: false,
                },
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                },
            };
        },
        methods: {
            submitForm() {
                var that = this;
                this.$refs.login.validate((valid) => {
                    if (valid) {
                        // login(this.param)
                        axios.post('http://127.0.0.1:9000/user/login/', this.param)
                            .then(response => {
                                if (that.remember_me) {
                                    // 记住登录
                                    sessionStorage.clear();
                                    localStorage.token = response.data.token;
                                    localStorage.user_id = response.data.user_id;
                                    localStorage.username = response.data.username;
                                } else {
                                    // 未记住登录
                                    localStorage.clear();
                                    sessionStorage.token = response.data.token;
                                    sessionStorage.user_id = response.data.user_id;
                                    sessionStorage.username = response.data.username;
                                }

                                // 登录成功后路由切换
                                that.$router.push({name: 'index'});
                                that.$message.success('登录成功');
                            })
                            .catch(error => {
                                console.log("errors", error.message);
                                that.$message.error('登录失败');

                            })
                        ;
                    } else {
                        this.$message.error('请输入账号和密码');
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
    };
</script>

<style scoped>

    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>