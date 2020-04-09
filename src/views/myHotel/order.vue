<template>
	<div>
		<div class="filter-container">
			<el-select v-model="orderType" placeholder="订单日期分类" style="width: 200px" class="filter-item">
				<el-option label="全部订单" selected />
				<el-option label="日订单" value="1" />
				<el-option label="周订单" value="2" />
				<el-option label="月订单" value="3" />
			</el-select>
			<el-date-picker v-model="startDate" type="date" placeholder="选择开始日期"></el-date-picker>-
			<el-date-picker v-model="endDate" type="date" placeholder="选择结束日期"></el-date-picker>
			<el-button class="filter-item" type="primary" icon="el-icon-download" @click="getOrderList">查询</el-button>
			<el-button class="filter-item" type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>
		</div>
		<div>
			<el-table ref="multipleTable" :data="orderList" tooltip-effect="dark" style="width: 100%">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-table :data="props.row.consumerOrders1s">
							<el-table-column label="商品名称" prop="jname"></el-table-column>
							<el-table-column label="商品价格" prop="dmoney"></el-table-column>
							<el-table-column label="购买数量" prop="num"></el-table-column>
							<el-table-column label="消费用户" prop="rname"></el-table-column>
						</el-table>
					</template>
				</el-table-column>
				<el-table-column prop="order" label="订单编号" width="200"></el-table-column>
				<el-table-column label="酒类图片" width="80">
					<template slot-scope="scope">
						<el-image :src="hostUrl+scope.row.images"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="totalPrice" label="订单总价" width="100"></el-table-column>
				<el-table-column prop="consumption" label="红包减免" width="100"></el-table-column>
				<el-table-column prop="originalPrice" label="实际支付" width="100"></el-table-column>
				<el-table-column prop="otherExpenses" label="其他消费" width="100"></el-table-column>
				<el-table-column prop="paymentamount" label="酒店收益" width="100"></el-table-column>
				<el-table-column prop="commPrice" label="酒品价格" width="100"></el-table-column>
				<el-table-column prop="createtime" label="下单时间" width="200"></el-table-column>
				<el-table-column label="订单状态" width="200">
					<template slot-scope="scope">
						<span v-if="scope.row.status=='order_1'">待核销</span>
						<span v-if="scope.row.status=='order_2'">已核销</span>
						<span v-if="scope.row.status=='order_3'">异常订单</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pagination
			v-show="res.total>0"
			:total="res.total"
			:page.sync="res.page"
			:limit.sync="res.limit"
			@pagination="searchFood"
		/>
	</div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
	components: {
		Pagination
	},
	data() {
		return {
			res: {
				total: 1000,
				page: 1,
				limit: [5, 10, 15, 20]
			},
			orderType: '',
			startDate: '',
			endDate: '',
			orderList: [
				{
					id: 447,
					hotelId: '20',
					commodityIds: '3',
					images:
						'/uploads/20191213/41fa50e63b8ca29c32fa7bb597401662.png',
					num: 1,
					status: 'order_2',
					price: 0.0,
					originalPrice: 0.0,
					consumption: 80.0,
					totalPrice: 680.0,
					commPrice: 600.0,
					order: '3359184076522748',
					userId: 3520,
					channel: '0',
					otherExpenses: '680',
					corder: '20200331060306s47619052',
					createtime: 1585662989,
					totalJiu: 600,
					consumerOrders1s: [
						{
							img:
								'/uploads/20190604/8d7bf1d8c7572c408564dcffa8ce8ab7.jpg',
							jname: '豪爽',
							rname: '13003138681',
							num: 1,
							dmoney: '600.00',
							repertory: '77',
							id: 3
						}
					],
					paymentamount: 612.0
				},
				{
					id: 446,
					hotelId: '20',
					commodityIds: '2',
					images:
						'/uploads/20191216/afaade9b9c243ff1b5c1a71a9534a7ba.png',
					num: 1,
					status: 'order_2',
					price: 0.0,
					originalPrice: 0.0,
					consumption: 80.0,
					totalPrice: 980.0,
					commPrice: 900.0,
					order: '9207058371328146',
					userId: 3541,
					channel: '0',
					otherExpenses: '980',
					corder: '20200331092957s68197302',
					createtime: 1585661440,
					totalJiu: 900,
					consumerOrders1s: [
						{
							img:
								'/uploads/20190604/5e60fbc0db632a875241736f12b29b06.jpg',
							jname: '豪情',
							rname: '15601759051',
							num: 1,
							dmoney: '900.00',
							repertory: '38',
							id: 2
						}
					],
					paymentamount: 882.0
				},
				{
					id: 445,
					hotelId: '20',
					commodityIds: '3',
					images:
						'/uploads/20191213/41fa50e63b8ca29c32fa7bb597401662.png',
					num: 1,
					status: 'order_2',
					price: 0.0,
					originalPrice: 0.0,
					consumption: 80.0,
					totalPrice: 680.0,
					commPrice: 600.0,
					order: '5276837181909065',
					userId: 3518,
					channel: '0',
					otherExpenses: '680',
					corder: '20200331053946s07528693',
					createtime: 1585655452,
					totalJiu: 600,
					consumerOrders1s: [
						{
							img:
								'/uploads/20190604/8d7bf1d8c7572c408564dcffa8ce8ab7.jpg',
							jname: '豪爽',
							rname: '18917331999',
							num: 1,
							dmoney: '600.00',
							repertory: '77',
							id: 3
						}
					],
					paymentamount: 612.0
				},
				{
					id: 439,
					hotelId: '20',
					commodityIds: '3',
					images:
						'/uploads/20191213/41fa50e63b8ca29c32fa7bb597401662.png',
					num: 1,
					status: 'order_2',
					price: 0.0,
					originalPrice: 0.0,
					consumption: 46.0,
					totalPrice: 646.0,
					commPrice: 600.0,
					order: '4154318832067529',
					userId: 3479,
					channel: '0',
					otherExpenses: '646',
					corder: '20200330054042s12604587',
					createtime: 1585570482,
					totalJiu: 600,
					consumerOrders1s: [
						{
							img:
								'/uploads/20190604/8d7bf1d8c7572c408564dcffa8ce8ab7.jpg',
							jname: '豪爽',
							rname: '13524175821',
							num: 1,
							dmoney: '600.00',
							repertory: '77',
							id: 3
						}
					],
					paymentamount: 581.4
				},
				{
					id: 429,
					hotelId: '20',
					commodityIds: '2',
					images:
						'/uploads/20191216/afaade9b9c243ff1b5c1a71a9534a7ba.png',
					num: 1,
					status: 'order_2',
					price: 14.0,
					originalPrice: 14.0,
					consumption: 80.0,
					totalPrice: 994.0,
					commPrice: 900.0,
					order: '3152986640287530',
					userId: 3483,
					channel: '0',
					otherExpenses: '994',
					corder: '20200330064620s36219507',
					createtime: 1585565232,
					totalJiu: 900,
					consumerOrders1s: [
						{
							img:
								'/uploads/20190604/5e60fbc0db632a875241736f12b29b06.jpg',
							jname: '豪情',
							rname: '13641693773',
							num: 1,
							dmoney: '900.00',
							repertory: '38',
							id: 2
						}
					],
					paymentamount: 880.6
				},
				{
					id: 428,
					hotelId: '20',
					commodityIds: '4',
					images:
						'/uploads/20191216/1e42fb71f76bd25e9fe743741088d90d.png',
					num: 1,
					status: 'order_2',
					price: 17.0,
					originalPrice: 17.0,
					consumption: 80.0,
					totalPrice: 397.0,
					commPrice: 300.0,
					order: '0987130348655492',
					userId: 3482,
					channel: '0',
					otherExpenses: '397',
					corder: '20200330061131s54032869',
					createtime: 1585563157,
					totalJiu: 300,
					consumerOrders1s: [
						{
							img:
								'/uploads/20190604/f6507d2aaf66f6fb473bce56027ccde9.jpg',
							jname: '豪饮',
							rname: '18917869050',
							num: 1,
							dmoney: '300.00',
							repertory: '15',
							id: 4
						}
					],
					paymentamount: 340.3
				},
				{
					id: 421,
					hotelId: '20',
					commodityIds: '4',
					images:
						'/uploads/20191216/1e42fb71f76bd25e9fe743741088d90d.png',
					num: 1,
					status: 'order_2',
					price: 0.0,
					originalPrice: 0.0,
					consumption: 80.0,
					totalPrice: 380.0,
					commPrice: 300.0,
					order: '9643516375721842',
					userId: 3447,
					channel: '0',
					otherExpenses: '380',
					corder: '20200329080237s04986753',
					createtime: 1585483388,
					totalJiu: 300,
					consumerOrders1s: [
						{
							img:
								'/uploads/20190604/f6507d2aaf66f6fb473bce56027ccde9.jpg',
							jname: '豪饮',
							rname: '13122000016',
							num: 1,
							dmoney: '300.00',
							repertory: '15',
							id: 4
						}
					],
					paymentamount: 342.0
				},
				{
					id: 420,
					hotelId: '20',
					commodityIds: '2',
					images:
						'/uploads/20191216/afaade9b9c243ff1b5c1a71a9534a7ba.png',
					num: 1,
					status: 'order_2',
					price: 0.0,
					originalPrice: 0.0,
					consumption: 50.0,
					totalPrice: 950.0,
					commPrice: 900.0,
					order: '2966435771095413',
					userId: 3444,
					channel: '0',
					otherExpenses: '950',
					corder: '20200329064131s07548361',
					createtime: 1585478531,
					totalJiu: 900,
					consumerOrders1s: [
						{
							img:
								'/uploads/20190604/5e60fbc0db632a875241736f12b29b06.jpg',
							jname: '豪情',
							rname: '18916065757',
							num: 1,
							dmoney: '900.00',
							repertory: '38',
							id: 2
						}
					],
					paymentamount: 855.0
				},
				{
					id: 419,
					hotelId: '20',
					commodityIds: '4',
					images:
						'/uploads/20191216/1e42fb71f76bd25e9fe743741088d90d.png',
					num: 1,
					status: 'order_2',
					price: 0.0,
					originalPrice: 0.0,
					consumption: 0.0,
					totalPrice: 300.0,
					commPrice: 300.0,
					order: '0715361362499087',
					userId: 1028,
					channel: '0',
					otherExpenses: '300',
					corder: '20200122095025s17603829',
					createtime: 1585472435,
					totalJiu: 300,
					consumerOrders1s: [
						{
							img:
								'/uploads/20190604/f6507d2aaf66f6fb473bce56027ccde9.jpg',
							jname: '豪饮',
							rname: '18217382639',
							num: 1,
							dmoney: '300.00',
							repertory: '15',
							id: 4
						}
					],
					paymentamount: 270.0
				},
				{
					id: 417,
					hotelId: '20',
					commodityIds: '4',
					images:
						'/uploads/20191216/1e42fb71f76bd25e9fe743741088d90d.png',
					num: 1,
					status: 'order_2',
					price: 4.0,
					originalPrice: 4.0,
					consumption: 80.0,
					totalPrice: 384.0,
					commPrice: 300.0,
					order: '8705692161503234',
					userId: 1599,
					channel: '0',
					otherExpenses: '384',
					corder: '20200122100217s13279806',
					createtime: 1585454952,
					totalJiu: 300,
					consumerOrders1s: [
						{
							img:
								'/uploads/20190604/f6507d2aaf66f6fb473bce56027ccde9.jpg',
							jname: '豪饮',
							rname: '13764070171',
							num: 1,
							dmoney: '300.00',
							repertory: '15',
							id: 4
						}
					],
					paymentamount: 341.6
				}
			]
		}
	},
	mounted() {
		this.getOrderList()
	},
	methods: {
		getOrderList() {
			let _this = this
			_this.orderList.map(item => {
				item.createtime = _this.$dateFormat(item.createtime)
				item.updatetime = _this.$dateFormat(item.updatetime)
			})
		},
		exportExcel() {}
	}
}
</script>

<style>
</style>