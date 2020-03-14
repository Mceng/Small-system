<template>
    <div class="moduleManage">

        <el-form :inline="true" class="demo-form-inline search-style" size="small">
            <el-form-item label="项目名称" labelWidth="110px">
                <el-select v-model="form.projectId" @change="getModules" placeholder="请选择项目">
                    <el-option
                            v-for="(item) in proAndIdData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <!--<el-button type="primary" icon="el-icon-search" @click.native="configHandleCurrentChange(1)">-->
                    <!--搜索-->
                <!--</el-button>-->
                <el-button type="primary" @click.native="$refs.EditFunc.initConfigData()">添加模块</el-button>
            </el-form-item>
        </el-form>

        <el-tabs value="first" class="table_padding">
            <el-tab-pane label="模块列表" name="first" style="margin: 0 0 -10px;">
                <el-table :data="tableData"
                          max-height="725"
                          stripe>
                    <el-table-column
                            prop="id"
                            label="编号"
                            min-width="40">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="模块名称"
                            min-width="250">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            min-width="250">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini"
                                       @click.native="$refs.EditFunc.getmMdule(tableData[scope.$index]['id'])">
                                编辑
                            </el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                       @click.native="sureView(delmodule,tableData[scope.$index]['id'],tableData[scope.$index]['name'])">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="pagination">
                    <el-pagination
                            @current-change="configHandleCurrentChange"
                            @size-change="configHandleSizeChange"
                            :current-page="currentPage"
                            :page-size="sizePage"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="this.total">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>

        <moduleEdit
                :proAndIdData="proAndIdData"
                :projectId="form.projectId"
                :tableData="tableData.id"
                ref="EditFunc">
        </moduleEdit>

    </div>
</template>

<script>
    import moduleEdit from './moduleEdit.vue'

    export default {
        components: {
            moduleEdit: moduleEdit,

        },
        name: 'module',
        data() {
            return {
                proAndIdData: '',
                tableData: Array(),
                total: 1,
                currentPage: 1,
                sizePage: 10,
                form: {
                    projectId: null,
                },
            }
        },


        methods: {
            httpSend() {
                this.$axios.get(this.$api.getProName).then((response) => {
                        this.proAndIdData = response.data;
                        console.log(this.proAndIdData);
                        if (response.data) {
                            this.form.projectId = this.proAndIdData[0].id;
                            this.getModules();
                        }
                    }
                );
            },
            configHandleCurrentChange(val) {
                this.currentPage = val;
                this.getModules()
            },
            configHandleSizeChange(val) {
                this.sizePage = val;
                this.getModules()
            },
            getModules() {
                this.$axios.get(this.$api.getModules + this.form.projectId + '/modules/', {
                    params: {
                        'page': this.currentPage,
                        'size': this.sizePage,
                    }
                }).then((response) => {
                        if (this.messageShow(this, response)) {
                            this.tableData = response.data['results'];
                            this.total = response.data['count'];
                        }
                    }
                )
            },
            delmodule(id) {
                this.$axios.delete(this.$api.delModule+id+'/').then((response) => {
                        this.messageShow(this, response);
                        if ((this.currentPage - 1) * this.sizePage + 1 === this.total) {
                            this.currentPage = this.currentPage - 1
                        }
                        this.getModules();
                    }
                )
            },
        },
        mounted() {
            this.httpSend();
        },
    }
</script>
<style>
</style>
