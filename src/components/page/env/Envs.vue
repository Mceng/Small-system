<template>
    <div>
        <!--<div class="crumbs">-->
        <!--<el-breadcrumb separator="/">-->
        <!--<el-breadcrumb-item>-->
        <!--<i class="el-icon-lx-cascades"></i> 项目列表-->
        <!--</el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
        <!--</div>-->
        <div class="container">
            <div class="handle-box">
                <!--<el-button-->
                        <!--type="primary"-->
                        <!--icon="el-icon-delete"-->
                        <!--class="handle-del mr10"-->
                        <!--@click="delAllSelection"-->
                <!--&gt;批量删除-->
                <!--</el-button>-->环境名称
                <el-input v-model="query.name" placeholder="环境名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" @click.native="initProjectData()">添加环境</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="环境名称"></el-table-column>
                <el-table-column prop="base_url" label="Base_url"></el-table-column>
                <el-table-column prop="desc" label="描述"></el-table-column>
                <el-table-column prop="create_time" label="创建时间"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>


            </el-table>
            <!--分页-->
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>

        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="环境名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="base_url">
                    <el-input v-model="form.base_url"></el-input>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: 'EnvsList',
        data() {
            return {
                query: {
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                pageTotal: '',
                editVisible: false,
                form: {
                    name: '',
                    base_url: '',
                    desc: '',
                },
            };
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.$axios.get(this.$api.Envs, {
                    params: {
                        'page': this.query.pageIndex,
                        'size': this.query.pageSize,
                    }
                }).then(
                    res => {
                        // console.log(res);
                        this.pageTotal = res.data.count;
                        this.query.pageIndex = res.data.current_page_num;
                        this.tableData = res.data.results;
                    });
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData();
            },
            initProjectData() {
                this.form.name = '';
                this.form.base_url = '';
                this.form.desc = '';
                this.editVisible = true;
            },


            // 删除操作
            handleDelete(index, row) {
                // console.log(index,row.id);
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$axios.delete(this.$api.Envs + row.id + '/').then(res => {
                            this.$message.success('删除成功');
                            this.tableData.splice(index, 1);
                        })
                    })
                    .catch(() => {
                    });
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                if (this.tableData[this.idx]) {
                    this.data = {
                        "name": this.tableData[this.idx].name,
                        "base_url": this.tableData[this.idx].base_url,
                        "desc": this.tableData[this.idx].desc,
                    };
                    this.$axios.put(this.$api.Envs + this.form.id + '/', this.data)
                        .then(res => {
                            this.$message.success(`修改ID: ${this.form.id} 成功`);
                            this.$set(this.tableData, this.idx, this.form);
                        })
                } else {
                    this.data = {
                        "name": this.form.name,
                        "base_url": this.form.base_url,
                        "desc": this.form.desc,
                    };
                    this.$axios.post(this.$api.Envs, this.data)
                        .then(res => {
                            this.getData()
                        })
                }


            },
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.$axios.get(this.$api.Envs,{
                    params: {
                        'page': this.query.pageIndex,
                        'size': this.query.pageSize,
                    }
                }).then(res => {
                    console.log(res);
                    this.tableData = res.data.results;
                })

            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }

</style>
