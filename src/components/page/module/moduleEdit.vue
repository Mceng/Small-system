<template>
    <div class="moduleEdit">

        <el-dialog title="添加模块" :visible.sync="form.modelFormVisible" width="50%">
            <el-tabs value="second">
                <el-tab-pane label="添加信息" name="second" style="margin-top: 10px">
                    <el-form :inline="true" size="small">
                        <el-form-item label="项目名称">
                            <el-select v-model="form.projectId" disabled placeholder="请选择项目" size="small">
                                <el-option
                                        v-for="(item) in proAndIdData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">

                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="模块名称">
                            <el-input v-model="form.name" size="small">
                            </el-input>
                        </el-form-item>
                    </el-form>

                    <hr style="height:1px;border:none;border-top:1px solid rgb(241, 215, 215);margin-top: -5px"/>

                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="form.modelFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click.native="but()" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'moduleEdit',
        props: ['proAndIdData', 'projectId','tableData'],
        data() {
            return {
                moduleid:'',
                form: {
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
                this.form.id = null;
                this.form.modelFormVisible = true;

            },
            but() {
                if(this.form.name ==null){
                    this.addModule()
                }
                else {
                    this.putModule()
                }

            },
            putModule(){
                this.data={
                    'project_id': this.form.projectId,
                    'id': this.moduleid,
                    'name': this.form.name,
                };
                this.$axios.put(this.$api.putModule+this.moduleid+'/',this.data)
                    .then((response) => {
                            this.form.projectId = response.data['project_id'];
                            this.form.modelFormVisible = false;
                            this.getModules();

                        }
                    );
            },
            addModule(){
                this.$axios.post(this.$api.addModules, {
                    'project_id': this.form.projectId,
                    'name': this.form.name,
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.form.modelFormVisible = false;
                            this.getModules();
                        }
                    }
                )
            },

            getmMdule(id) {
                if (!id) {
                    this.$message({
                        showClose: true,
                        message: '请选择模块',
                        type: 'warning',
                    });
                    return
                }
                this.moduleid = id;
                this.$axios.get(this.$api.getModule + id + '/',).then((response) => {
                        this.form.name = response.data['name'];
                        this.form.projectId = this.projectId;
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
