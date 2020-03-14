<template>

    <div style="width: 30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="项目名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="项目负责人" prop="leader">
                <el-input v-model="ruleForm.leader"></el-input>
            </el-form-item>
            <el-form-item label="测试人员" prop="tester">
                <el-input v-model="ruleForm.tester"></el-input>
            </el-form-item>
            <el-form-item label="开发人员" prop="programmer">
                <el-input v-model="ruleForm.programmer"></el-input>
            </el-form-item>
            <el-form-item label="发布应用" prop="publish_app">
                <el-input v-model="ruleForm.publish_app"></el-input>
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


    export default {
        data() {
            return {
                apiEditViewStatus: true,//接口配置组件显示控制
                ruleForm: {
                    name: '',
                    leader: '',
                    tester: '',
                    programmer: '',
                    publish_app: '',
                    desc: ''
                },
                rules: {
                    name: [
                        {required: true, message: '项目名称', trigger: 'blur'},
                        {min: 6, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://127.0.0.1:9000/projects/', this.ruleForm)
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
