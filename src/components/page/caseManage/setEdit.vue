<template>
    <div class="setEdit">

        <el-dialog title="用例集配置" :visible.sync="setData.viewStatus" width="30%">
            <el-form>
                <el-form-item label="用例集名称" label-width="100px">
                    <el-input v-model="setData.name">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="setData.viewStatus = false">取 消</el-button>
                <el-button type="primary" size="small" @click.native="addSet()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'setEdit',
        props: ['projectId', 'setTempData'],
        data() {
            return {
                setData: {
                    viewStatus: false,
                    id: '',
                    num: '',
                    name: '',
                },
            }
        },
        methods: {
            addSet() {
                if (this.setData.id) {
                    this.$axios.put(this.$api.Testsuits + this.setData.id + '/', {
                        'project_id': this.projectId,
                        'name': this.setData.name,
                    }).then((response) => {
                            if (this.messageShow(this, response)) {
                                this.$parent.findSet();
                                this.setData.viewStatus = false;
                            }
                        }
                    )

                } else {
                    console.log('-------------------------');
                    console.log(this.setData.id);
                    console.log('-------------------------');
                    this.$axios.post(this.$api.Testsuits, {
                        'project_id': this.projectId,
                        'name': this.setData.name,
                    }).then((response) => {
                            if (this.messageShow(this, response)) {
                                this.$parent.findSet();
                                this.setData.viewStatus = false;
                            }
                        }
                    )

                }
            },
            initSet() {
                this.setData.viewStatus = true;
                this.setData.name = '';
                this.setData.id = '';
            },
            editSet() {
                this.setData.name = this.setTempData.name;
                this.setData.id = this.setTempData.setId;
                this.setData.viewStatus = true;
            },
            stickSet(id) {
                this.$axios.post(this.$api.stickCaseSetApi, {
                    'id': id,
                    'projectId': this.projectId,
                }).then((response) => {
                        this.messageShow(this, response);
                        this.$parent.findSet();
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
