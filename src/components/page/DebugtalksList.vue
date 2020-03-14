<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 项目列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除
                </el-button>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
                <el-table-column prop="project" label="项目名称"></el-table-column>
                <el-table-column prop="name" label="文件名"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑
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
                <el-form-item label="编辑debugtalks">
                    <el-input type="textarea" v-model="form.debugtalk"></el-input>
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
    import {fetchData} from '../../api/index';
    import axios from 'axios';

    export default {
        name: 'EnvsList',
        data() {
            return {
                query: {
                    pageIndex: 1,
                    pageSize: 2
                },
                tableData: [],
                debugtalk: '',
                pageTotal: '',
                editVisible: false,
                form: {},
            };
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                axios.get(this.Global.HOST+'/debugtalks/?size=2').then(
                    res => {
                        console.log(res);
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

            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
                axios.get(this.Global.HOST+'/debugtalks/' + this.form.id + '/', this.data)
                    .then(res => {
                        console.log(res);
                        console.log(res.data.debugtalk);
                        // this.$set(this.debugtalk, res.data.debugtalk);
                    })
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                console.log(this.tableData[this.idx]);
                this.data = {
                    "debugtalk": this.tableData[this.idx].debugtalk,
                };
                axios.put(this.Global.HOST+'/debugtalks/' + this.form.id + '/', this.data)
                    .then(res => {
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        this.$set(this.tableData, this.idx, this.form);
                    })
            },
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                axios.get(this.Global.HOST+'/debugtalks/?size=2&page=' + val).then(res => {
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
