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
  name: "LeftToRight",
  data() {
    return {
      left: ["数学", "语文", "英语", "物理", "化学", "其他"],
      right: [
        {
          name: "数学",
          content: ["1", "2", "3", "4", "5", "6", "7"]
        },
        {
          name: "语文",
          content: ["3", "4", "5", "6"]
        },
        {
          name: "英语",
          content: ["1", "2", "3", "4", "5", "6", "7"]
        },
        {
          name: "物理",
          content: ["5", "6", "7"]
        },
        {
          name: "化学",
          content: ["4", "5", "6", "7"]
        },
        {
          name: "其他",
          content: ["3", "4", "5", "6", "7"]
        }
      ],
      listHeight: [],
      scrollY: 0, // 实时获取当前Y轴的高度
      clickEvent: false
    };
  },
  methods: {
    _initScroll() {
      this.lefts = new BScroll(this.$refs.left, {
        click: true
      });
      this.rights = new BScroll(this.$refs.right, {
        probeType: 3
      });
      this.rights.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _getHeight() {
      let rightItems = this.$refs.right.getElementsByClassName(
        "right-item-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < rightItems.length; i++) {
        let item = rightItems[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectItem(index, event) {
      this.clickEvent = true;

      if (!event._constructed) {
        return;
      } else {
        let rightItems = this.$refs.right.getElementsByClassName(
          "right-item-hook"
        );
        let el = rightItems[index];
        this.rights.scrollToElement(el, 300);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
      this._getHeight();
    });
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          // if (this.clickEvent) {
          //   return i + 1;
          // } else {
            return i;
          // }
        }
      }
      return 0;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
.box {
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  position: relative;
  /* top: 100px; */
  /* bottom: 100px; */
  width: 100%;
  height: 530px;
  overflow: hidden;
  background: #eee;
}
.left {
  flex: 0 0 80px;
  width: 80px;
  height: 100%;
  background: #f3f5f7;
}
.left ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.left li {
  flex: 1;
  /* width: 100%;
  height: 100%; */
}
.current {
  background: pink;
}
.left-item {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid yellow;
}

.right {
  flex: 1;
}
.right-item li {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border-bottom: 1px solid yellow;
}
</style>