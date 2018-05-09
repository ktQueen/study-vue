/**
 * Created by daojia on 2017-4-21.
 */
new Vue({
    el:'.container',
    data:{
        limitNum:3,
        addressList:[],
        currentIndex:0,
        shippingMethod:1
    },
    mounted:function () {
        /*mounted不代表vue实例已经插入到DOM里面去*/
        /*为了保证万无一使用$nextTick*/
        var _this=this;
        this.$nextTick(function () {
            _this.getAddressList();
        })
    },
    /*实时计算*/
    computed:{
        filterAddress:function () {
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList:function () {
            var _this=this;
            this.$http.get("data/address.json").then(function (response) {
                var res=response.data;
                if(res.status=='0'){
                    _this.addressList=res.result;
                }
            })
        },
        /*设为默认地址*/
        setDefault:function (addressId) {
            this.addressList.forEach(function (address,index) {
                if(address.addressId==addressId){
                    address.isDefault=true;
                }else{
                    address.isDefault=false;
                }
            })
        }
    }
});