<template>
    <div id="reportmessage">
        <div v-html="message"></div>
    </div>
</template>

<script>
    export default {
        name: "reportMessage",
        data() {
            return {
                message: '',
            }
        },
        mounted() {
            this.showData();
        },
        methods: {
            showData(){
                this.reportId = this.$route.query.id;
                this.$axios.get(this.$api.Reports + this.reportId + '/').then((response) => {
                    var str = response.data['html'];
                    var find="height:370px";
                    var replace = "display: none";
                    document.write(str.replace(replace, find));
                    this.message = str

                });
            }
        }
    }

</script>

<style scoped>

</style>