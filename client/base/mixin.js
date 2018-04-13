import {mapGetters, mapMutations, mapActions} from 'vuex'

export const Mixin = {
	data() {
		return {
			initPage : false
		}
	},

	methods: {
		//失败回调
	    __failed(err) {
	      this.showMessage = true;
	      
	      switch(err) {
	        
	        case err.code === 401 :
	          this.messageType = 1;
	          break;
	        case err.code === 402 :
	          this.messageType = 2;
	          break;
	        case err.code === 499 :
	          this.messageType = 3;
	          break;
	        case err.code === 404 :
	          this.messageType = 4;
	          break;
	        case err.code === 556 :
	          this.messageType = 5;
	          break;
	        case err.code === 500 :
	          this.messageType = 7;
	          break;
	        case err.code === 555 :
	          this.messageType = 8;
	          break;
	        default:
	          this.messageType = 9;
	        }
	      
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
