<template>
	<div class="loading">
		<div class="content">
			<!--<img width="24" height="24" src="./loading.gif">-->
			<p class="control is-loading"></p>
			<p class="desc">{{title}}</p>
		</div>
	</div>
</template>

<script>
export default{
	props: {
		title: {
			type: String,
			default: "正在搜索..."
		} 
	}
}
</script>

<style>
/*
.loading {
	height: 100%;
	width: 100%;
	justify-content;
	position: relative;
	text-align: center;
	background: #333;
	opacity: 0.5;
	align-content: center;
}
.content {
	position: absolute;
	height: 50px;
	margin: auto;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
*/
.loading {
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	text-align: center;
	background: #333;
}
.content {
}
.desc {
	line-height: 20px;
	font-size: 0.5rem;
	color: #fff;
}
</style>
