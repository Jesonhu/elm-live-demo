let vmAddress = new Vue({
	el: '.container',
	data: {
		limitNum: 3, //限制地址列表显示的长度
		addressList: [],
		currentIndex: 0, //用来保存当前点击的li
		shippingMethod: 1, //配送类型1 标准 2高级
	},
	mounted: function () {
		this.$nextTick(function () {
			this.addressView();
		})
	},
	methods: {
		addressView: function () {
			axios.get('data/address.json')
			.then((res) => {
				if(res.status === 200){
					this.addressList = res.data.result;
				}
			})
			.catch((err) => {
				console.log('get address data error');
			})
		},
		loadMore: function () {
			this.limitNum = (this.limitNum==3)?this.addressList.length:3; //显示3条或显示全部
		},
		setDefault: function (_index) {
			this.addressList.forEach((address, index) => {
				address.isDefault = false;
				_index == index && (address.isDefault = true); //点击当前的li设为默认地址
			});
		},
		delAddress: function (_index) {
			this.addressList.splice(_index,1);
		}
	},
	computed: {
		filterAddress: function () {
			return this.addressList.slice(0,this.limitNum);
		},
	}
});