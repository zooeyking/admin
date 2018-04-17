import {mapGetters, mapMutations, mapActions} from 'vuex'

export const Mixin = {
	data() {
		return {
			initPage : false,
			errInfo : ''
		}
	},

	methods: {
		//失败回调
	    __failed(err) {
	      this.showMessage = true;
	      
	      this.messageType = 1;
	      //console.log(err);
	      this.errInfo = err.message;
	      /*
	      switch(err.code) {
	        
	        case  401 :
	          this.messageType = 1;
	          break;
	        case  402 :
	          this.messageType = 2;
	          break;
	        case  499 :
	          this.messageType = 3;
	          break;
	        case  404 :
	          this.messageType = 4;
	          break;
	        case  556 :
	          this.messageType = 5;
	          break;
	        case  500 :
	          this.messageType = 7;
	          break;
	        case  555 :
	          this.messageType = 8;
	          break;
	        default:
	          this.messageType = 9;
	        }
	      */
	    }
	}
}


export const ButtonMixin = {
	props: {
		initPage: {
			type: Boolean,
			default: false,
		}
	},

	data() {
		return {
			pernum: 20,
			currentPage: 0
		}
	},

	computed: {
		...mapGetters([
			'userPermission'
		])
	},

	methods: {
		//分页当前页码
	    getIndex(num) {
	    	this.currentPage = num-1 > 0 ? num-1 : 0;
	      	this.$emit('pageSearch', {pageNum: num});
	    },

	    //搜索操作
	    paramsSearch(params) {
	      	this.$emit('paramsSearch', params);
	    },

	    //搜索后跳到第一页
		pageStart() {
			this.$refs.pages.jumpPage(1);
		}
	},

	watch: {
		initPage() {
			
			this.pageStart();
		}
	}
} 
