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
                <el-table-column prop="name" label="项目名称"></el-table-column>
                <el-table-column prop="leader" label="项目负责人"></el-table-column>

                <el-table-column prop="tester" label="测试人员"></el-table-column>
                <el-table-column prop="programmer" label="开发人员"></el-table-column>
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
            <!--<div class="block">-->
            <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="currentPage"-->
            <!--:page-sizes="[1, 2, 3, 4]"-->
            <!--:page-size="100"-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--:total="count">-->
            <!--</el-pagination>-->
            <!--</div>-->
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="项目负责人">
                    <el-input v-model="form.leader"></el-input>
                </el-form-item>
                <el-form-item label="测试人员">
                    <el-input v-model="form.tester"></el-input>
                </el-form-item>
                <el-form-item label="开发人员">
                    <el-input v-model="form.programmer"></el-input>
                </el-form-item>
                <el-form-item label="发布应用">
                    <el-input v-model="form.publish_app"></el-input>
                </el-form-item>
                <el-form-item label="简介">
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
    import axios from 'axios';

    export default {
        name: 'ProjectsList',
        data() {
            return {
                query: {
                    pageIndex: 1,
                    pageSize: 2
                },
                tableData: [],
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
                axios.get('http://127.0.0.1:9000/projects/?size=2').then(
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
            // 删除操作
            handleDelete(index, row) {
                // console.log(index,row.id);
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        axios.delete('http://127.0.0.1:9000/projects/' + row.id).then(res => {
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
                console.log(this.tableData[this.idx]);
                this.data = {
                    "name": this.tableData[this.idx].name,
                    "leader": this.tableData[this.idx].leader,
                    "tester": this.tableData[this.idx].tester,
                    "programmer": this.tableData[this.idx].programmer,
                    "publish_app": this.tableData[this.idx].publish_app,
                    "desc": this.tableData[this.idx].desc,
                };
                axios.put('http://127.0.0.1:9000/projects/' + this.form.id + '/', this.data)
                    .then(res => {
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        this.$set(this.tableData, this.idx, this.form);
                    })

            },
            // 分页导航
            // handleSizeChange(val) {
            //     axios.get('http://127.0.0.1:9000/projects/?size=${val}').then(res => {
            //         this.currentPage = res.data.current_page_num;
            //         console.log(res)
            //     }).catch(res => {
            //         console.log(res)
            //     })
            //
            // },
            // handleCurrentChange(val) {
            //     this.getData();
            //     console.log(`当前页: ${val}`);
            // },
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                axios.get('http://127.0.0.1:9000/projects/?size=2&page=' + val).then(res => {
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
