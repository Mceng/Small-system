<template>
    <div style="width: 30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="环境名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="base_url" prop="base_url">
                <el-input v-model="ruleForm.base_url"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {fetchData} from '../../api/index';
    import axios from 'axios';

    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    base_url: '',
                    desc: ''
                },
                rules: {
                    name: [
                        {required: true, message: '配置名称', trigger: 'blur'},
                        {min: 6, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur'}
                    ],
                    base_url: [
                        {required: true, message: '输入base_url', trigger: 'blur'},
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post(this.Global.HOST + '/envs/', this.ruleForm)
                            .then(response => {
                                this.$message.success('创建成功！！！');
                            })
                            .catch(response => {
                                this.$message.error('创建失败！！！');
                                console.log(error);
                            })
                    } else {
                        this.$message.error('请输入内容');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
