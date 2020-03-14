<template>
    <div class="configEdit">

        <el-dialog title="配置管理" :visible.sync="form.modelFormVisible" width="50%">
            <el-tabs value="second">


                <el-tab-pane label="基础信息" name="second" style="margin-top: 10px">
                    <el-form :inline="true" size="small">
                        <el-form-item label="项目名称">
                            <el-select v-model="form.projectId" placeholder="请选择项目" size="small">
                                <el-option
                                        v-for="(item) in proAndIdData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="配置名称">
                            <el-input v-model="form.name" size="small">
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true" size="small" class="demo-form-inline">
                        <el-form-item label="函数文件">
                            <el-select v-model="form.funcAddress" multiple placeholder="请选择导入函数文件" size="small">
                                <el-option
                                        v-for="item in this.funcAddress"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="配置序号"
                                      v-if="form.id">
                            <el-input v-model.number="form.num" size="small">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="small" @click="addConfigVariable()">添加变量</el-button>
                        </el-form-item>
                    </el-form>

                    <hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);margin-top: -5px"/>
                    <el-table :data="form.variable" stripe :show-header="false">
                        <el-table-column label="Key" header-align="center" minWidth="100">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.key" size="mini" placeholder="key">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="Value" header-align="center" minWidth="200">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.value" size="mini" placeholder="Value">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" header-align="center" minWidth="80">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.remark" size="mini" placeholder="备注">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" header-align="center" width="80">
                            <template slot-scope="scope">
                                <el-button type="danger" icon="el-icon-delete" size="mini"
                                           @click.native="delConfigVariable(scope.$index)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="form.modelFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click.native="addSceneConfig()" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'configEdit',
        props: ['proAndIdData', 'funcAddress', 'projectId'],
        data() {
            return {
                form: {
                    funcAddress: Array(),
                    id: null,
                    num: null,
                    modelFormVisible: false,
                    projectId: null,
                    name: null,
                    formLabelWidth: '80px',
                }
            }
        },
        methods: {
            initConfigData() {
                this.form.name = null;
                this.form.projectId = this.projectId;
                this.form.funcAddress = Array();
                this.form.id = null;
                this.form.num = null;
                this.form.variable = [{key: null, value: null, remark: null}];
                this.form.modelFormVisible = true;

            },
            addConfigVariable() {
                this.form.variable.push({key: null, value: null, remark: null});
            },
            delConfigVariable(i) {
                this.form.variable.splice(i, 1);
            },
            addSceneConfig() {
                this.$axios.post(this.$api.addConfigApi, {
                    'projectId': this.form.projectId,
                    'sceneConfigName': this.form.name,
                    'funcAddress': this.form.funcAddress,
                    'num': this.form.num,
                    'id': this.form.id,
                    'variable': JSON.stringify(this.form.variable),
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.form.modelFormVisible = false;
                            if (typeof this.$parent.findConfig === "function") {
                                this.$parent.findConfig();
                            }

                            // this.findConfig();
                        }
                    }
                )
            },
            editSceneConfig(id) {
                if (!id) {
                    this.$message({
                        showClose: true,
                        message: '请选择配置',
                        type: 'warning',
                    });
                    // if(response.data['error']){
                    //     return 'error'
                    // }
                    return
                }
                this.$axios.post(this.$api.editConfigApi, {'id': id}).then((response) => {
                        this.form.name = response.data['data']['name'];
                        this.form.num = response.data['data']['num'];
                        this.form.variable = response.data['data']['variables'];
                        this.form.funcAddress = response.data['data']['func_address'];
                        this.form.projectId = this.projectId;
                        this.form.id = id;
                        this.form.modelFormVisible = true;
                    }
                )
            },
        },
        mounted() {
        },
    }
</script>
<style>
</style>
