var vm=new Vue({
	el:'#app',
	data:{
		totalMoney:0,
		productList:[],
        checkAllFlag:false,
		delFlag:false,
        curProduct:''
	},
	filters:{
		formatMoney:function(value){
			return "￥"+value.toFixed(2);
		}
	},
	mounted:function(){
		this.cartView();
	},
	methods:{
		/*上来请求数据*/
		cartView:function(){
			let _this=this;
			this.$http.get('data/cart.json',{'id':123}).then(function(res){
				_this.productList=res.body.result.productList;
			});
		},
        /*增加减少数量金额的变化*/
        changeMoney:function(product,way){
			if(way>0){
				product.productQuentity++;
			}else{
                product.productQuentity--;
                if(product.productQuentity<1){
                    product.productQuentity=1;
				}
			}
            this.calcTotalPrice();
		},
        /*选择产品*/
        selectedProduct:function (item) {
			if(typeof item.checked == 'undefined'){
				// Vue.set(item,"checked",true);
				this.$set(item,"checked",true);
			}else{
				item.checked=!item.checked;
			}
			this.calcTotalPrice();
        },
		/*全选*/
		checkAll:function (flag) {
			this.checkAllFlag=flag;
			var _this=this;
			this.productList.forEach(function (item,index) {
				if(typeof item.checked == 'undefined'){
					// Vue.set(item,"checked",true);
					_this.$set(item,"checked",_this.checkAllFlag);
				}else{
					item.checked=_this.checkAllFlag;
				}
			})
            this.calcTotalPrice();
        },
		/*计算商品的总金额*/
		calcTotalPrice:function(){
			var _this=this;
            _this.totalMoney=0;
			this.productList.forEach(function (item,index) {
				if(item.checked){
					_this.totalMoney+=item.productPrice*item.productQuentity;
				}
            })
		},
		/*删除商品*/
        delConfirm:function (item) {
			this.delFlag=true;
			this.curProduct=item;
        },
		delProduct:function () {
			var index=this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
            this.delFlag=false;
        }
	}
});
Vue.filter('money',function(value,type){
	return "￥"+value.toFixed(2)+type;
})