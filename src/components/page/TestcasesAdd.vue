<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <div>
                    <el-form-item label="用例名称" prop="name" class="input">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="编写人员" prop="author" class="input">
                        <el-input v-model="ruleForm.author"></el-input>
                    </el-form-item>
                    <el-form-item label="选择项目">
                        <el-select v-model="value" filterable @change="getInsterface" placeholder="请选择选项项目"
                                   style="margin-right: 50px">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择接口">
                        <el-select v-model="value1" filterable @change="getCase" placeholder="请选择接口"
                                   style="margin-right: 50px">
                            <el-option
                                    v-for="i in options1"
                                    :key="i.id"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="运行环境">
                        <el-select v-model="value2" filterable placeholder="请选择运行环境">
                            <el-option
                                    v-for="i in options2"
                                    :key="i.id"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-transfer
                            v-model="value4"
                            :props="{key: 'id',label: 'name'}"
                            :data="data">
                    </el-transfer>
                </div>
            </el-tab-pane>
            <el-tab-pane label="请求信息" name="second">请求信息</el-tab-pane>
            <el-tab-pane label="环境变量" name="third">环境变量</el-tab-pane>
            <el-tab-pane label="参数化" name="fourth">参数化</el-tab-pane>
            <el-tab-pane label="勾子" name="fifth">参数化</el-tab-pane>

        </el-tabs>
    </el-form>
</template>

<script>
    import {fetchData} from '../../api/index';
    import axios from 'axios';

    export default {
        data() {
            return {
                activeName: 'first',
                // 用例选择
                data: [],//没有选择的用例数据
                value4: [],//已选择的用例数据
                // 下面几个是选择项目、接口及运行环境
                options: [],
                value: '',
                options1: [],
                value1: '',
                options2: [],
                value2: '',
                ruleForm:{
                    name: '',
                    author: ''
                }

            };
        },
        created() {
            this.getData();
            this.getEnvs();
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getData() {
                axios.get(this.Global.HOST + '/projects/names/').then(
                    res => {
                        console.log(res.data);
                        this.value1 = '';
                        this.options = res.data;
                    });
            },
            getInsterface() {
                axios.get(this.Global.HOST + '/projects/' + this.value + '/interfaces/')
                    .then(res => {
                        console.log(res.data);
                        this.options1 = res.data;
                    })
            },
            getCase() {
                axios.get(this.Global.HOST + '/testcases/')
                    .then(res => {
                        console.log(res.data.results);
                        this.data = res.data.results;
                    })
            },
            getEnvs() {
                axios.get(this.Global.HOST + '/envs/names/')
                    .then((res => {
                        this.options2 = res.data;
                    }))
            },

        }
    }
</script>