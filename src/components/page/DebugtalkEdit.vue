<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="debugtalk" prop="desc">
            <el-input type="textarea" v-model="ruleForm.debugtalk"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {fetchData} from '../../api/index';
    import axios from 'axios';

    export default {
        data() {
            return {
                ruleForm: {
                    debugtalk: ''
                }
            };
        },
        created() {
            this.getData();
        },
        methods: {
            getData(val) {
                axios.get(this.Global.HOST+'/debugtalks/'+val).then(
                    res => {
                        console.log(res);
                        this.pageTotal = res.data.count;
                        this.query.pageIndex = res.data.current_page_num;
                        this.tableData = res.data.results;
                    });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put(this.Global.HOST+'/debugtalks/1/', this.ruleForm)
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

<style>

</style>