<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div>
            <el-form-item label="配置名称" prop="name" class="input">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="编写人员" prop="author" class="input">
                <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>

            <el-form-item label="选择项目">
                <el-select v-model="project" filterable @change="getInsterface" placeholder="请选择选项项目"
                           style="margin-right: 50px">
                    <el-option
                            v-for="item in project_options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择接口">
                <el-select v-model="interface" filterable placeholder="请选择接口"
                           style="margin-right: 50px">
                    <el-option
                            v-for="i in interface_options"
                            :key="i.id"
                            :label="i.name"
                            :value="i.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="头部" name="first">
                    <div class="demo-input-suffix" id="app">
                        <div v-for="(list,index) in header_lists" :key="index" style="margin-top:15px">
                            <el-input placeholder="请输入内容" v-model="list.key"
                                      style="width: 200px;margin-right: 25px"></el-input>
                            <el-input placeholder="请输入内容" v-model="list.value"
                                      style="width: 200px"></el-input>
                        </div>
                        <el-button type="success" icon="el-icon-check" v-on:click="add" circle class="but"></el-button>
                        <el-button type="danger" icon="el-icon-delete" v-on:click="del(index)" class="but"
                                   circle></el-button>

                    </div>
                </el-tab-pane>
                <el-tab-pane label="全局变量variables" name="config">
                    <div class="demo-input-suffix">
                        <div class="demo-input-suffix" id="config_app">
                            <div v-for="(list,index) in config_lists" :key="index">
                                <div style="margin-top: 15px;" class="demo-input-size">

                                    <el-input placeholder="请输入内容" v-model="list.key" class="input-with-select"
                                              style="width: 200px;margin-right: 25px"></el-input>

                                    <el-input placeholder="请输入内容" v-model="list.value" class="input-with-select"
                                              style="width: 400px">

                                        <el-select v-model="list.param_tpye" slot="prepend" placeholder="类型">
                                            <el-option label="string" value="string"></el-option>
                                            <el-option label="int" value="int"></el-option>
                                            <el-option label="str" value="str"></el-option>
                                            <el-option label="float" value="float"></el-option>
                                            <el-option label="boolean" value="boolean"></el-option>
                                        </el-select>
                                    </el-input>
                                </div>
                            </div>
                            <el-button type="success" icon="el-icon-check" v-on:click="config_add" circle
                                       class="but"></el-button>
                            <el-button type="danger" icon="el-icon-delete" v-on:click="config_del(index)" class="but"
                                       circle></el-button>

                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="margin-top: 50px">
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>
<script>
    import axios from 'axios';


    export default {
        data() {
            return {
                input2: '',
                input3: '',
                // param_tpye: '',
                project: '',
                project_options: [],
                interface: '',
                interface_options: [],
                textarea: '',
                ruleForm: {
                    name: '',
                    header: '',
                    author: '',
                    config: '',
                },
                rules: {
                    name: [
                        {required: true, message: '配置名称', trigger: 'blur'},
                        {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
                    ],

                },
                activeName: 'first',
                tables: [],
                header_lists: [{}],
                config_lists: [{}]
            };
        }, created() {
            this.getData();
        },
        methods: {
            getData() {
                axios.get(this.Global.HOST + '/projects/names/').then(
                    res => {
                        console.log(res.data);
                        this.interface = '';
                        this.project_options = res.data;
                    });
            },
            getInsterface() {
                axios.get(this.Global.HOST + '/projects/' + this.project + '/interfaces/')
                    .then(res => {
                        console.log(res.data);
                        this.interface_options = res.data;
                    })
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            submitForm(formName) {
                this.ruleForm = {
                    "request": {
                        "config": {
                            "name": this.ruleForm.name,
                            "base_url": "",
                            "request": {
                                "headers": this.header_lists,
                            },
                            "variables": this.config_lists
                        }
                    },
                    "author": this.ruleForm.author,
                    "name": this.ruleForm.name,
                    "interface": {
                        "iid": this.interface,
                        "pid": this.project
                    }
                };
                console.log(this.ruleForm);
                console.log('------------------------');

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post(this.Global.HOST + '/configures/', this.ruleForm)
                            .then(response => {
                                this.$message.success('创建成功！！！');
                            })
                            .catch(response => {
                                this.$message.error('创建失败！！！');
                                console.log(error);
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            add() {
                let cope = {
                    key: "",
                    value: ""
                };
                this.header_lists.push(cope);
                console.log(this.lists)
            },
            del: function (index) {
                this.header_lists.splice(index, 1);
                console.log(this.lists)
            },
            config_add() {
                let cope = {
                    key: "",
                    value: "",
                    param_tpye: ""
                };
                this.config_lists.push(cope);
                console.log(this.lists)
            },
            config_del: function (index) {
                this.config_lists.splice(index, 1);
                console.log(this.lists)
            }

        }
    }
    ;
</script>

<style>
    .but {
        margin-top: 20px;
    }

    .el-select {
        width: 200px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;

    }

    .input {
        width: 300px;
        margin-right: 20px;
    }
</style>