<template>
	<!--（ztree－🌲）-->
	<div class="tile is-parent">
		
		<ul class="ztree">
			<ztree-item v-for='(m,i) in treeDataSource' :key='i' :model="m" :num='i' root='0' :nodes='treeDataSource.length' :callback='func'  :trees='treeDataSource'></ztree-item>
		</ul>
		
	</div>
</template>

<script>

export default{
	data(){
       return {
       	  treeDataSource:[]
       }
	},

	props:{
		//所有部门列表
		allPartments: {
			type: Array,
		},
		// 树数据
        list:{
       	  	type:Array,
        },
        // 点击节点回调
		func:{
			type:Function,
			default:null
		},
		// 是否展开
		isOpen:{
			type:Boolean,
			default:false
		}
	},

	watch:{
		
        'list': {
            handler:function(){
            	this.initTreeData();
            },
            deep:true
        },

        'treeDataSource': {
            handler(newVal) {
	        	this.$emit('setPowers', newVal)
	        },
            deep:true
        }
        
	},

	computed: {
		/*
	    operats: {
	    	get() {
	    		return this.$store.getters.operats;
	    	},
	    	set(value) {
	    		this.$store.commit('SET_SYS_OPERATS', value)
	    	}
	    }
	    */
	},

	methods:{
        initTreeData(){
            var tempList = JSON.parse(JSON.stringify(this.list));
            
            // 递归操作，增加删除一些属性。比如: 展开/收起
            var recurrenceFunc = (data) => {
                data.forEach((m)=>{
                    if(!m.hasOwnProperty("clickNode")){
	                    m.clickNode = m.hasOwnProperty("clickNode") ? m.clickNode : false;
	                }

                    //m.children = m.children || [];
            
                    if(	!m.hasOwnProperty("isFolder") ) {
	               		m.isFolder =  m.hasOwnProperty("open") ? m.open : this.isOpen;
	                }

	                if(	!m.hasOwnProperty("isExpand") ) {
	               		m.isExpand =  m.hasOwnProperty("open") ? m.open : this.isOpen;
	               	}

	               	//m.loadNode = 0; 

	               	if(m.children) {
	               		recurrenceFunc(m.children);
	               	}
       
                })
            };

            recurrenceFunc(tempList);

            this.treeDataSource = tempList;
        }
        
	},

	components:{
		// 组件
        ztreeItem:{
        	name: 'ztreeItem',
        	props: {
        		model:{
        			type:Object
        		},
        		num:{
                    type:Number
        		},
        		nodes:{
                    type:Number,
                    default:0
        		},
        		trees:{
		       	  	type:Array,
		       	  	default:[]
		        },
        		root:{
                    type:String
        		},
        		callback:{
					type:Function
				}
        	},

        	methods:{
                Func(m){
                    // 查找点击的子节点
                    var recurFunc = (data,list) => {
                        data.forEach((i)=>{
                            if(i.dId==m.dId){
                                i.clickNode = true;

                                if(typeof this.callback == "function") {
				                    this.callback.call(null,m,list,this.trees);
				                }
                            }else {
                              i.clickNode = false;
                            }

                            if(i.children){
                               recurFunc(i.children,i);
                            }
                        })
                    }

                    recurFunc(this.trees, this.trees);
                },

                open(m){
                	m.isExpand = !m.isExpand;
           
                	if(typeof this.expandfunc == "function" && m.isExpand) {
                		if(m.loadNode!=2) {
		                    this.expandfunc.call(null,m);
		                }else {
		                	m.isFolder = !m.isFolder;
		                }
	                } else {
                        m.isFolder = !m.isFolder;
	                }
                },

                //切换开关
		        toggleCheck(model) {
		        	model.checked = !model.checked;
		        	this.__toggleChildren(model, model.checked);
		        },

		        //设置后代选中状态
		        __toggleChildren(root, flag) {
		            var lists = [].slice.call(root.children);
		            var item;
		            while (lists.length) {
		                item = lists.shift();
		                item.checked = flag;
		                if (item.children.length) {
		                    lists = lists.concat([].slice.call(item.children));
		                }
		            }
		        }

        	},
        	computed:{
        		// 给（根 和 子树）赋值不同的样式
                rootClass(){
                	 var strRootClass = '';
                     // 根判断
                	 if(this.root=='0'){
                       this.model.children = this.model.children || [];
                       strRootClass =  (this.num==0 && this.model.children.length==0) ? "roots_docu" : (this.nodes==1) || (this.num==0 && this.nodes!=this.num+1) ? 
                         "root_" : (this.nodes == this.num+1) ? "bottom_" : "center_";
                     
                     // 子树判断
                	 }else if(this.root=='1') {
                        this.model.children = this.model.children || [];
                        strRootClass =  this.nodes>1 && this.model.children.length>0 && this.nodes!=this.num+1
                         ? "center_" : 
                            (this.num == 0 && this.nodes>1) || (this.nodes!=this.num+1) ? "center_docu" : 
                                 this.nodes == 1&&this.num!=0 || (this.nodes==this.num+1 && this.model.children.length>0)   ? "bottom_" : "bottom_docu";
                	 }

                	 return  strRootClass;
                },

                // 是否有儿子节点
                isChildren(){
                     return this.num+1 != this.nodes;
                },

                // 展开/收起
                prefixClass(){
                	var returnChar = "";
                	if(this.rootClass.indexOf("docu")==-1){
	                	if(this.model.isFolder){
                           returnChar = "open";
	                	}else {
                           returnChar = 'close'
	                	}
	                }

	                if(this.model.children.length==0 && this.rootClass.indexOf("docu")==-1){
                        returnChar = 'docu'
	                }
	                
	                return returnChar;
                },

                liClassVal(){
                	 return "level"+this.num;
                },

                spanClassVal(){
                	 return "button level"+this.num+this.rootClass+this.prefixClass;
                },

                aClassVal(){
                     return this.model.clickNode ? "level"+this.num+' curSelectedNode':"level"+this.num;
                },

                ulClassVal(){
                	return this.isChildren && this.model.children.length>0 ?"level"+this.num+' line':"level"+this.num;
                },
                /*
                operats: {
			    	get() {
			    		return this.$store.getters.operats;
			    	},
			    	set(value) {
			    		this.$store.commit('SET_SYS_OPERATS', value)
			    	}
			    }
			    */
        	},

            template: 
            `<li>
				<span class="icon is-small my-fold" @click='open(model)'><i class="fa" :class="prefixClass === 'close' ? 'fa-plus' : 'fa-minus'"></i></span>
				<p  >
					<div class="info mebox">
						
					    <span :class='model.iconClass' v-show='model.iconClass'></span>
						<span class="node_name">{{model.operateName}}</span>
						<label class="checkbox treeCheck" @click="toggleCheck(model)"><input type="checkbox" v-model="model.checked" :value="model.operateId"></span></label>
					</div>
				</p>
				<ul :class="ulClassVal" v-show='model.isFolder'>
					<ztree-item v-for="(item,i) in model.children" :key='i' :callback='callback' :model="item" :num='i' root='1' :nodes='model.children.length' :trees='trees' ></ztree-item>
				</ul>
			</li>`
		}
	},

	update(){
		this.initTreeData();
	},

	mounted(){
		this.$nextTick(()=>{
			this.initTreeData();
		})
	}
}
</script>

<style>
	.partmentHeader{
		justify-content: flex-start
	}
	.textBox{
		margin: 0 1rem
	}
	.ztree li{ 
		position: relative; 
		padding:0.2rem 0; 
		margin:0; 
		list-style:none; 
		line-height:2; 
		text-align:left; 
		white-space:nowrap; 
	}
	.ztree li ul{ 
		margin:0; 
		padding:0 0 0 18px
	}

	.ztree li .treeCheck{
		padding: 8px;
		margin-left: 10px;
	}
	
	.ztree li p {
		padding:1px 3px 0 5px; 
		margin:0; 
		cursor:pointer; 
		height:17px; 
		color:#333; 
		background-color: transparent;
		text-decoration:none; 
		vertical-align:top; 
		display: inline-block
	}
	.ztree .my-fold {
		cursor: pointer
	}
	.ztree li p:hover {
		text-decoration:underline; 
		color:blue;
	}
	.ztree li p:after {
		display: block;
		content: '';
		clear: both;
	}
	.ztree li .mebox {
		display: inline-block;
	}
	.ztree li .insert {
		margin-left: 10rem;
		float: right;
	}
	.ztree li .option {
		margin-left: 10rem;
		float: right;
	}
	.ztree .icon {
		line-height: 2;
	}
	.loadSyncNode {
		width: 16px;
        height: 16px;
        position: relative;
        display: inline-block;
		background-image:url("data:image/gif;base64,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")
	}
</style>