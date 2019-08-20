<template>
  <section class="box">
    <div class="head">
      <h1>head</h1>
    </div>
    <div class="content">
      <div class="left" ref="left">
        <ul>
          <li
            v-for="(item,index) of left"
            :class="{current:currentIndex==index}"
            @click="selectItem(index,$event)"
          >
            <span class="left-item">{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="right" ref="right">
      <ul>
        <li v-for="item of right" class="right-item right-item-hook">
          <h2>{{item.name}}</h2>
          <ul>
            <li v-for="num of item.content">
              <div>{{item.name+num}}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="foot">
      <h1>foot</h1>
    </div>
  </section>
</template>
<script>
import BScroll from "better-scroll";
import scrolldiv from "../components/Scroll.vue";
export default {
  name:"LeftToRight",
  data() {
    return {
      left:['数学','语文','英语','物理','化学','其他'],
      right:[
        {
          name:"数学",
          content:['1','2','3','4','5','6','7']
        },
        {
          name:"语文",
          content:['3','4','5','6']
        },
        {
          name:"英语",
          content:['1','2','3','4','5','6','7']
        },
        {
          name:"物理",
          content:['5','6','7']
        },
        {
          name:"化学",
          content:['4','5','6','7']
        },
        {
          name:"其他",
          content:['3','4','5','6','7']
        },
      ],
      listHeight:[],
      scrollY:0,// 实时获取当前Y轴的高度
      clickEvent:false
    }
  },
  methods:{
    _initScroll() {
      this.lefts = new BScroll(this.$refs.left,{
        click:true
      })
    }
  },
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