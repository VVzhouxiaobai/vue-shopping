<template>
    <li class="nav-cart" @mouseenter="showCarHandle" @mouseleave="hideCarHandle">
      <a href="javascript:;" class="ball-rect">购物车</a>
      <!--根据class改变颜色-->
      <span class="cart-empty-num" :class="{' cart-num':count>0}">
              <i>{{count}}</i>
            </span>
      <div class="nav-cart-wrapper" v-show="carShow">
        <div class="nav-cart-list">
          <div class="empty" v-if="count<=0">
            <h3>购物车为空</h3>
            <p>您还没有选购任何商品，现在前往商城选购吧!</p>
          </div>
          <div class="full" v-else>
            <div class="nav-cart-items">
              <ul>
                <li class="clear" v-for="(item,index) in carPanelData" :key="index">
                  <div class="cart-item js-cart-item cart-item-sell">
                    <div class="cart-item-inner">
                      <div class="item-thumb">
                        <img :src="item.ali_image+'?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'">
                      </div>
                      <div class="item-desc">
                        <div class="cart-cell">
                          <h4>
                            <a href="#/item/100027401">{{item.title}}</a>
                          </h4>
                          <p class="attrs">
                            <span>{{item.spec_json.show_name}}</span>
                          </p>
                          <h6>
                            <span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x{{item.count}}</span>
                          </h6>
                        </div>
                      </div>
                      <div class="del-btn" @click="delCarPanelHandle (item.sku_id)">删除</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="nav-cart-total">
              <p>共 <strong class="ng-binding">{{count}}</strong> 件商品</p>
              <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{totle}}</span></h5>
              <h6>
                <router-link class="nav-cart-btn" to="/cart">去购物车</router-link>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <transition
        name="ball"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-bind:css="true"
      >
        <div class="addcart-mask" v-show="ball.show">
          <img class="mask-item">
        </div>
      </transition>
    </li>
</template>
<script>
export default {
  // 获取store中state值
  computed: {
    carPanelData () {
      return this.$store.state.carPanelData
    },
    count () {
      return this.$store.getters.totleCount
    },
    totle () {
      return this.$store.getters.totlePrice
    },
    carShow () {
      return this.$store.state.carShow
    },
    ball () {
      return this.$store.state.ball
    }
  },
  methods: {
    // 删除操作
    delCarPanelHandle (id) {
      this.$store.commit('delCarPanelData', id)
    },
    // 展示购物框
    showCarHandle () {
      this.$store.commit('showCar')
    },
    // 隐藏购物框
    hideCarHandle () {
      this.$store.commit('hideCar')
    },
    // 加入购物车小球动画
    beforeEnter (el) {
      console.log(el)
      let rect = this.ball.el.getBoundingClientRect()
      let rectEl = document.getElementsByClassName('ball-rect')[0].getBoundingClientRect()
      let ball = document.getElementsByClassName('mask-item')[0]
      console.log(ball)
      console.log(111111)
      let x = (rectEl.left + 16) - (rect.left + rect.width / 2)
      let y = rect.top + rect.height / 2 - rectEl.top + 5 - 16
      el.style.transform = 'translate3d(0,' + y + 'px,0)'
      ball.style.transform = 'translate3d(-' + x + 'px,0,0)'
      ball.src = this.ball.img
    },
    enter (el) {
      console.log(el)
      console.log(111111)
      let a = el.offsetHeight
      el.a = a
      el.style.transform = 'translate3d(0,0,0)'
      document.getElementsByClassName('mask-item')[0].style.transform = 'translate3d(0,0,0)'
    },
    afterEnter (el) {
      this.ball.show = false
    }
  }
}
</script>
<style>
  .ball-enter-active{
    transition: 1s cubic-bezier(.32,.89,.72,1.32);
  }
  .ball-enter-active .mask-item{
    transition: 1s cubic-bezier(0,0,1,1);
  }
  .nav-global .addcart-mask{
    position: absolute;
    left: 0;
    top: -5px;
    padding: 0;
    width: 32px;
    height: 32px;
    pointer-events: none;
    z-index: 240;
    transform: translate3d(0,0,0);
  }
  .nav-global .addcart-mask .mask-item{
    pointer-events: none;
    width: 32px;
    height: 32px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0,0,0,.05), 0 3px 8px rgba(0,0,0,.1);
    background-size: contain;
    transform: translate3d(0,0,0);
  }
</style>
