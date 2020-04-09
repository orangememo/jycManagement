<template>
    <div style="width: 90%;">
        <!-- <el-image :src="require('../../../assets/my/admin-banner.png')"></el-image> -->
        <div class="form-box" style="margin-top:20px">
                <div class="form-title text-red flex">
                    <el-image :src="require('../../../assets/my/ordertotal.png')" class="img-icon margin-lr-sm head_pic">
                    </el-image>
                    <div>总部酒库存</div>
                </div>
            </div>
        <el-table :data="list" stripe style="margin: 30px 0;" row-class-name="row-class-jy" header-row-class-name="head-row-class-jy">
                <el-table-column prop="jname" label="名称" width="180"></el-table-column>
                <el-table-column prop="img" label="图片" width="180">
                    <template slot-scope="scope">
                        <img :src="hostUrl+scope.row.img" width="40" height="40" class="head_pic" />
                    </template>
                </el-table-column>
                <el-table-column prop="repertory" label="剩余酒库存"></el-table-column>
            </el-table>
    </div>
</template>
<script>
    import echarts from "echarts";
    export default {
        data() {
            return {
                tabIndex: 0,
                activeClass: 0,
                list: [
                    {
                        img:
                            "/uploads/20190604/5e60fbc0db632a875241736f12b29b06.jpg",
                        jname: "豪情",
                        everys: null,
                        week: null,
                        month: null,
                        repertory: 12
                    },
                    {
                        img:
                            "/uploads/20190604/8d7bf1d8c7572c408564dcffa8ce8ab7.jpg",
                        jname: "豪爽",
                        everys: null,
                        week: null,
                        month: null,
                        repertory: 15
                    },
                    {
                        img:
                            "/uploads/20190604/f6507d2aaf66f6fb473bce56027ccde9.jpg",
                        jname: "豪饮",
                        everys: null,
                        week: null,
                        month: null,
                        repertory: 8
                    }
                ],
                winlist: [
                    {
                        id: 2,
                        jname: "豪情"
                    },
                    {
                        id: 3,
                        jname: "豪爽"
                    },
                    {
                        id: 4,
                        jname: "豪饮"
                    }
                ]
            };
        },
        created() {
        },
        mounted() {
        },
        computed: {
        },
        methods: {
            showSum(index) {
                this.activeClass = index
            },
        }
    };
</script>

<style scoped>
.form-box .form-title {
    font-family: SourceHanSansCN-Regular;
    font-size: 24px;
    font-weight: 400;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0;
    color: #eb3335;
    border-bottom: 1px solid #eb3335;
    padding-bottom: 14px;
}
.flex{
    display: flex;
}
.form-box .form-title .img-icon {
        width: 30px;
    height: 30px;
    margin-right: 20px;
    }
    .head_pic {
    width: 100%;
    height: 100%;
}
</style>