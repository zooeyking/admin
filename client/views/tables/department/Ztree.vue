<template>
	<!--（ztree－🌲）-->
	<div class="tile is-parent">
		<article class="tile is-child box">
			<div class="pageHeader partmentHeader">
				<h3 class="subtitle is-5"><strong>新部门名称 :</strong></h3>
				<p class="control textBox"><input type="text"  v-model="newPartment['dName']" class="input is-primary is-small"></p>
				<h3 class="subtitle is-5"><strong>上级部门 :</strong></h3>
				<div class="select textBox is-small">
	                <select v-model="newPartment['parentId']">
	                  <option value="">无</option>
	                  <option v-for="item in allPartments" :value="item.dId">{{item.dName}}</option>
	                </select>
	            </div>
	            <h3 class="subtitle is-5"><strong>备注 :</strong></h3>
				<p class="control textBox"><input type="text"  v-model="newPartment['dRemark']" class="input is-primary is-small"></p>
		        <button class="button is-primary is-small"  @click="add">添  加</button>
		    </div>
			<ul class="ztree">
				<ztree-item v-for='(m,i) in treeDataSource' :key='i' :model="m" :num='i' root='0' :nodes='treeDataSource.length' :callback='func'  :trees='treeDataSource' @remove="remove" @editUser="editUser"></ztree-item>
			</ul>
		</article>
		<!--
		<article class="tile is-child box" v-else>
			<div class="pageHeader partmentHeader">
				<h3 class="subtitle is-5"><strong>暂无数据</strong></h3>
		    </div>
		</article>
		-->
	</div>
</template>

<script>
import Vue from 'vue'
export default{
	data(){
       return {
       	  treeDataSource:[],
       	  newPartment: {
       	  	parentId: ''
       	  }
       }
	},
	props:{
		//所有部门列表
		allPartments: [Array, Object],
		// 树数据
        list:{
       	  	type:Array,
        },
        // 点击节点回调
		func:{
			type:Function,
			default:null
		},
		// 点击展开回调
		expand:{
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
        }
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
        },
        add() {
        	console.log(this.newPartment)
        	this.$emit('addPartment', this.newPartment);
        },
        remove(item) {
        	this.$emit('remove',item)
        },
        edit(item) {
        	this.$emit('edit',item)
        },
        editUser(item) {
        	this.$emit('editUser',item)
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

                    recurFunc(this.trees,this.trees);
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
                //删除方法
                del(item){
                	this.$emit('remove',item)
                	//console.log(item)
                },
                remove(item) {
		        	this.$emit('remove',item)
		        	//console.log(item)
		        },
		        //编辑
		        edit(item) {
		        	this.$emit('edit',item)
		        },
		        //管理职员
		        editUser(item) {
		        	this.$emit('editUser',item)
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

                	 return  strRootClass
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
                }
        	},
            template: 
            `<li>
				<span class="icon is-small my-fold" @click='open(model)'><i class="fa" :class="prefixClass === 'close' ? 'fa-plus' : 'fa-minus'"></i></span>
				<p class="item-content" @click='Func(model)' >
					<div class="info mebox">
						<!-- <span :class="{loadSyncNode:model.loadNode==1}" v-if='model.loadNode==1'></span> -->
					    <span :class='model.iconClass' v-show='model.iconClass'></span>
						<span class="node_name">{{model.dName}}</span>
						
					</div>
					
					<span class="item-line" v-show="model.children.length == 0"></span>
					<div class="option mebox"  v-show="model.children.length == 0">
				    	<!-- <a class="button is-primary is-small" @click="edit(model)"><span>编辑</span></a> -->
				    	<a class="button is-primary is-small" @click="editUser(model)"><span>管理职员</span></a>
				    	<a class="button is-danger is-small" @click="del(model)"><span>删除</span></a>
					</div>
				</p>
				<ul :class="ulClassVal" v-show='model.isFolder'>
					<ztree-item v-for="(item,i) in model.children" :key='i' :callback='callback' :model="item" :num='i' root='1' :nodes='model.children.length' :trees='trees' @remove="remove" @editUser="editUser"></ztree-item>
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
		justify-content: flex-start !important;
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
	.ztree li p:hover {
		text-decoration:underline; 
		color:blue;
	}
	.ztree li p:after {
		display: block;
		content: '';
		clear: both;
	}
	.ztree .item-content {
		position: relative;
	}
	.ztree .item-line{
		position: absolute;
		top: 16px;
		border-top: dotted 1px #369;
		margin-left: 10%;
		width: 60%;
	}
	.ztree li .mebox {
		display: inline-block;
	}
	.ztree li .insert {
		margin-left: 10rem;
		float: right;
	}
	
	.ztree li .option {
		float: right;
	}
	
	
	@media screen and (max-width:1219px) {
 	   .ztree .item-line{
			margin-left: 5%;
			width: 50%;
		}	
	}
	
	.ztree .icon {
		line-height: 2;
	}
	.ztree .my-fold {
		cursor: pointer
	}
	
	.loadSyncNode {
		width: 16px;
        height: 16px;
        position: relative;
        display: inline-block;
		background-image:url("data:image/gif;base64,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")
	}
</style>