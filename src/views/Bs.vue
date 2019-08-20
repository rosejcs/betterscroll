<template>
  <div>
    <div v-if="isreFresh">刷新...</div>
    <scrolldiv class="wrapper" :data="data" :pulldown="pulldown" @pulldown="loadData($event)">
      <ul class="content">
        <li v-for="item in data">{{item}}</li>
      </ul>
      <div class="loading-wrapper"></div>
    </scrolldiv>
    <div @click="loadData">12314314141111111111</div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import scrolldiv from "../components/Scroll.vue";
export default {
  components: {
    scrolldiv
  },
  data() {
    return {
      data: [],
      pno: 0,
      pulldown: true,
      // val:0,
      isreFresh: true
    };
  },
  created() {
    this.loadData();
    // this.loadData()
  },
  methods: {
    loadData(val) {
      // this.isreFresh = val;
      // console.log(this.isreFresh);
      this.pno++;
      console.log(this.pno);
      let pno = this.pno;
      this.axios.get("/", { params: { pno } }).then(res => {
        console.log(res.data);
        this.data = res.data.concat(this.data);
        // console.log(this.data);
      });
      this.isreFresh = val;
      setTimeout(()=>{
        this.isreFresh = false;
      },1000)
    }
  },
  mounted() {
    // console.log(this.loadData);
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 500px;
  overflow: hidden;
}
.content {
}
.content li {
  width: 100%;
  height: 700px;
  background: pink;
  overflow: hidden;
}
</style>