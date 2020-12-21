<template>
    <div class="reportManage">

        <!--<el-form :inline="true" class="demo-form-inline search-style" size="small">-->
        <!--<el-form-item label="项目" labelWidth="110px">-->
        <!--<el-select v-model="form.projectId" placeholder="请选择项目">-->
        <!--<el-option-->
        <!--v-for="(item) in proAndIdData"-->
        <!--:key="item.id"-->
        <!--:label="item.name"-->
        <!--:value="item.id">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--<el-form-item labelWidth="110px">-->
        <!--<el-input placeholder="请输入用例名称" v-model="form.caseName" style="left: 10px">-->
        <!--</el-input>-->
        <!--</el-form-item>-->
        <!--&lt;!&ndash;<el-select v-module="form.gathers" multiple placeholder="请选择模块" style="width: 400px;">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-option&ndash;&gt;-->
        <!--&lt;!&ndash;v-for="item in proAndIdData[this.form.projectName]"&ndash;&gt;-->
        <!--&lt;!&ndash;:key="item.id"&ndash;&gt;-->
        <!--&lt;!&ndash;:value="item.value">&ndash;&gt;-->
        <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-select v-module="form.scenes" multiple placeholder="请选择业务集" style="width: 400px;">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-option&ndash;&gt;-->
        <!--&lt;!&ndash;v-for="item in proSceneData[this.form.projectName]"&ndash;&gt;-->
        <!--&lt;!&ndash;:key="item.id"&ndash;&gt;-->
        <!--&lt;!&ndash;:value="item.value">&ndash;&gt;-->
        <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-button type="primary" @click.native="handleCurrentChange(1)" size="small">搜索</el-button>-->

        <!--&lt;!&ndash;<el-button type="primary" @click.native="reset()" size="small">重置</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button type="primary" size="small" @click.native="runProject()">跑项目</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button type="primary" size="small"@click.native="runModel()" >跑模块</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button type="primary" size="small" @click.native="runScene()" :loading="this.loading">跑业务&ndash;&gt;-->
        <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
        <!--</el-form-item>-->
        <!--</el-form>-->

        <el-tabs value="first" class="table_padding">
            <el-tab-pane label="报告列表" name="first" style="margin: 0 0 -10px;">

                <!--<el-scrollbar wrap-class="scrollbarList">-->
                <el-table :data="tableData"
                          max-height="725"
                          stripe>

                    <!--<el-table-column-->
                    <!--prop="project_name"-->
                    <!--label="所属项目"-->
                    <!--minWidth="50">-->
                    <!--</el-table-column>-->

                    <el-table-column
                            :show-overflow-tooltip=true
                            minWidth="200"
                            prop="name"
                            label="名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="create_time"
                            label="时间"
                            minWidth="100">
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--prop="performer"-->
                    <!--label="执行者"-->
                    <!--minWidth="100">-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="read_status"
                            label="状态"
                            width="80">
                        <template slot-scope="scope">
                            <!--<div :style="scope.row.read_status === '已读' ? 'color:#2bef2b': 'color:rgb(255, 74, 74)'">-->
                            <!--{{scope.row.read_status}}-->
                            <!--</div>-->
                            <el-tag size="small" :type="scope.row.read_status === '已读' ? 'success' : 'danger'">
                                {{scope.row.read_status}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="300"
                    >
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-zoom-in" size="mini"
                                       @click="check(tableData[scope.$index]['id'])">

                                查看
                            </el-button>
                            <el-button type="primary" icon="el-icon-download" size="mini"
                                       @click.native="downReport(tableData[scope.$index]['id'])">下载
                            </el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                       @click.native="sureView(delReport, tableData[scope.$index]['id'],'【'+tableData[scope.$index]['name']+'】'+'该测试报告')">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--</el-scrollbar>-->
                <div class="pagination">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            @size-change="handleSizeChange"
                            :current-page="currentPage"
                            :page-size="sizePage"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="this.total">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>

        <reportMessage
                :ReportHtmlData="ReportHtmlData"
                ref="EditFunc">
        </reportMessage>
    </div>
</template>

<script>
    import reportMessage from './reportMessage'

    export default {
        components: {
            reportMessage: reportMessage,
        },
        name: 'report',
        data() {
            return {
                ReportHtmlData: '',
                proAndIdData: '',
                tableData: [],
                total: 1,
                currentPage: 1,
                sizePage: 20,
                form: {
                    projectId: '',
                    caseName: '',
                    gathers: [],
                    scenes: [],
                },
                reportData: {
                    'data': {'records': []},
                    'body': {
                        'platform': {'duration': '', 'python_version': ''},
                        'stat': {'skipped': '', 'testsRun': '', 'successes': '', 'failures': '', 'errors': ''}
                    },

                },
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.currentPage = val;
                this.findReport()
            },
            // handleCurrentChange1(proId) {
            //     // let index = this.tableData.map(1)
            //     for (let i = 0; i < this.proAndIdData.length; i++) {
            //         if (this.proAndIdData[i].id === proId) {
            //             return this.proAndIdData[i].name
            //         }
            //     }
            // },

            handleSizeChange(val) {
                this.sizePage = val;
                this.findReport()
            },
            initData() {
                this.$axios.get(this.$api.Reports).then((response) => {

                        this.proAndIdData = response.data['results'];
                        if (response.data) {
                            this.form.projectId = this.proAndIdData[0].id;
                            this.findReport()
                        }
                    }
                );
            },
            findReport() {
                this.$axios.get(this.$api.Reports, {
                    params: {
                        'page': this.currentPage,
                        // 'projectId': this.form.projectId,
                        // 'caseName': this.form.caseName,
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
            delReport(report_id) {
                this.$axios.delete(this.$api.Reports + report_id + '/').then((response) => {
                        this.messageShow(this, response);
                        if ((this.currentPage - 1) * this.sizePage + 1 === this.total) {
                            this.currentPage = this.currentPage - 1
                        }
                        this.findReport();
                    }
                )
            },
            check(reportId) {
                // this.$router.push({ path: `/system/role/permission/${row.id}` })

                // this.$axios.get(this.$api.Reports + reportId + '/').then((response) => {
                //     this.ReportHtmlData = response.data;
                //     console.log(this.ReportHtmlData);
                //     // this.$emit("change",this.ReportHtmlData);
                //
                //
                //
                // });

                let {href} = this.$router.resolve({path: 'reportMessage', query: {id: reportId}});
                console.log(href);

                window.open(href, '_blank');
            },
            downReport(reportId) {

                this.$axios.get(this.$api.Reports + reportId + '/').then((response) => {

                        this.download(response.data['html'], response.data['name'], "text/html")
                    }
                )
            },
            download(data, strFileName, strMimeType) {

                let self = window, // this script is only for browsers anyway...
                    defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
                    mimeType = strMimeType || defaultMime,
                    payload = data,
                    anchor = document.createElement("a"),
                    toString = function (a) {
                        return String(a);
                    },
                    myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
                    fileName = strFileName || "download",
                    blob,
                    reader;
                myBlob = myBlob.call ? myBlob.bind(self) : Blob;

                //go ahead and download dataURLs right away
                blob = payload instanceof myBlob ?
                    payload :
                    new myBlob([payload], {type: mimeType});


                function saver(url, winMode) {
                    if ('download' in anchor) { //html5 A[download]
                        anchor.href = url;
                        anchor.setAttribute("download", fileName);
                        anchor.className = "download-js-link";
                        anchor.innerHTML = "downloading...";
                        anchor.style.display = "none";
                        document.body.appendChild(anchor);
                        setTimeout(function () {
                            anchor.click();
                            document.body.removeChild(anchor);
                            if (winMode === true) {
                                setTimeout(function () {
                                    self.URL.revokeObjectURL(anchor.href);
                                }, 250);
                            }
                        }, 66);
                        return true;
                    }

                }//end saver

                if (self.URL) { // simple fast and modern way using Blob and URL:
                    saver(self.URL.createObjectURL(blob), true);
                } else {
                    // handle non-Blob()+non-URL browsers:
                    if (typeof blob === "string" || blob.constructor === toString) {
                        try {
                            return saver("data:" + mimeType + ";base64," + self.btoa(blob));
                        } catch (y) {
                            return saver("data:" + mimeType + "," + encodeURIComponent(blob));
                        }
                    }

                    // Blob but not URL support:
                    reader = new FileReader();
                    reader.onload = function () {
                        saver(this.result);
                    };
                    reader.readAsDataURL(blob);
                }
                return true;
            },

        },
        mounted() {
            this.initData();
            // this.findReport();


        },
    }
</script>

<style>


    .el-footer {
        background-color: #8db7ef;
        color: #333;
        text-align: left;
        line-height: 30px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    /*.el-tabs__header {*/
    /*margin: 0 0 10px;*/
    /*}*/

    .el-button--mini {
        padding: 5px 9px;
    }

    .el-dialog__body {
        padding: 5px 10px;
    }

    .row-bg {
        padding: 5px 0;
    }

    .el-breadcrumb {
        line-height: 3;
    }

</style>
