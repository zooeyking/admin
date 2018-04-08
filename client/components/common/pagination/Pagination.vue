<template>
  <div class="page"  v-show="show"> 
    <div class="pagelist"> 
      <span class="jump" v-show="current_page > 1" @click="prev()">上一页</span> 
      <span v-show="current_page > 5" class="jump" @click="jumpPage(1)">1</span> 
      <span class="ellipsis"  v-show="efont">...</span> 
      <span class="jump" v-for = "num in indexs" :class = "{ bgprimary : current_page == num }" @click="jumpPage(num)">{{num}}</span> 
      <span class="ellipsis"  v-show="efont && current_page < pages-4">...</span> 
 
      <span class="jump" v-show="current_page < pages" @click="next()">下一页</span> 
      <span v-show="current_page < pages-1" class="jump" @click="jumpPage(pages)">{{pages}}</span> 
 
      <span class="jumppoint">跳转到:</span> 
      <span class="jumpinp"><input type="text" v-model="changePage" @keyup.enter="jumpPage(goNum)"></span> 
      <span class="jump gobtn" @click="jumpPage(goNum)">GO</span> 
    </div> 
  </div>
</template>

<script>

export default {
  props: {
    allItems: {
      type: Number,
      default: 100
    },
    pernum: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      current_page: 1,  
      changePage: '',
      nowIndex: 0 
    }
  },
  computed: {
    pages() {
      let allNum = this.allItems;
      return Math.ceil(allNum / this.pernum);
    },
    goNum() {
      let changePage = parseInt(this.changePage);
      let pages = this.pages;
      return changePage > pages ? pages : changePage < 1 ? 1 : changePage;
    },
    show() { 
      return this.pages && this.pages !=1 
    }, 
    efont() { 
      if (this.pages <= 7) { return false;} 
      return this.current_page > 5 
    }, 
    indexs() { 
      var left = 1, 
          right = this.pages, 
          ar = []; 
       if (this.pages >= 7) { 
         if (this.current_page > 5 && this.current_page < this.pages - 4) { 
           left = Number(this.current_page) - 3; 
           right = Number(this.current_page) + 3; 
         } else { 
           if (this.current_page <= 5) { 
             left = 1; 
             right = 7; 
           } else { 
             right = this.pages; 
             left = this.pages - 6; 
           } 
         } 
       } 
       while (left <= right) { 
         ar.push(left); 
         left++; 
       } 
       return ar; 
    }, 
  },
  methods: {
    prev() {
      this.current_page --
    },
    next() {
      this.current_page ++;
    },
    jumpPage(index) { 
      this.current_page = index
    }
  },
  watch: {
    current_page() {
      this.$emit('changeIndex', this.current_page);
    }
  }
}

</script>

<style>

.page { 
  font-weight: 900; 
  height: 40px; 
  text-align: center; 
  color: #888; 
  margin: 20px auto 0; 
  background: #f2f2f2; 
} 
 
.pagelist { 
  font-size: 0; 
  background: #fff; 
  height: 50px; 
  line-height: 50px; 
} 
 
.pagelist span { 
  font-size: 14px; 
} 
 
.pagelist .jump { 
  border: 1px solid #ccc; 
  padding: 5px 8px; 
  -webkit-border-radius: 4px; 
  -moz-border-radius: 4px; 
  border-radius: 4px; 
  cursor: pointer; 
  margin-left: 5px; 
} 
 
.pagelist .bgprimary { 
  cursor: default; 
  color: #fff; 
  background: #00d1b2; 
  border-color: #00d1b2; 
} 
 
.jumpinp input { 
  width: 55px; 
  height: 26px; 
  font-size: 13px; 
  border: 1px solid #ccc; 
  -webkit-border-radius: 4px; 
  -moz-border-radius: 4px; 
  border-radius: 4px; 
  text-align: center; 
} 
 
.ellipsis { 
  padding: 0px 8px; 
} 
 
.jumppoint { 
  margin-left: 30px; 
} 
 
.pagelist .gobtn {} 
 
.bgprimary { 
  cursor: default; 
  color: #fff; 
  background: #337ab7; 
  border-color: #337ab7; 
}

</style>