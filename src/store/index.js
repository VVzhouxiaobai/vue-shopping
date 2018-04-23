import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    // 加入购物车的总数据
    carPanelData: [],
    receiveInfo: [{
      'name': '王某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际西6号楼319室',
      'default': true
    }, {
      'name': '李某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际东6号楼350室',
      'default': false
    }],
    maxOff: false,
    carShow: false,
    carTimer: null,
    // 创建一个小球
    ball: {
      show: false,
      el: null,
      img: ''
    },
    orderData: []
  },
  getters: {
    // 加入购物车总数
    totleCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        count += goods.count
      })
      return count
    },
    // 加入购物车总价格
    totlePrice (state) {
      let price = 0
      state.carPanelData.forEach((goods) => {
        price += goods.price * goods.count
      })
      return price
    },
    allChecked (state) {
      let allChecked = true
      state.carPanelData.forEach((goods) => {
        if (!goods.checked) {
          allChecked = false
          return
        }
      })
      return allChecked
    },
    // 购物车列表计算商品总数
    checkedCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          count += goods.count
        }
      })
      console.log(count)
      return count
    },
    // 购物车列表计算商品总价
    checkedPrice (state) {
      let price = 0
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          price += goods.count * goods.price
        }
      })
      // console.log(price)
      return price
    },
    // 清单页面
    checkedGoods (state) {
      let checkedGoods = []
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          checkedGoods.push(goods)
        }
      })
      return checkedGoods
    }
  },
  mutations: {
    // 加入购物车方法并且判断购物车所能加的最大值
    addCarPanelData (state, data) {
      let bOff = true
      if (!state.ball.show) {
        state.carPanelData.forEach((goods) => {
          if (goods.sku_id === data.info.sku_id) {
            goods.count += data.count
            bOff = false
            if (goods.count > goods.limit_num) {
              state.maxOff = true
              goods.count -= data.count
              return
            }
            state.carShow = true
            state.ball.show = true
            state.ball.img = data.info.ali_image
            state.ball.el = event.path[0]
            console.log(event)
          }
        })
        if (bOff) {
          let goodsData = data.info
          Vue.set(goodsData, 'count', data.count)
          Vue.set(goodsData, 'checked', true)
          state.carPanelData.push(goodsData)
          state.carShow = true
          state.ball.show = true
          state.ball.img = data.info.ali_image
          state.ball.el = event.path[0]
          console.log(event)
        }
        console.log(state.carPanelData)
      }
    },
    // 删除购物车方法
    delCarPanelData (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          state.carPanelData.splice(index, 1)
          return
        }
      })
    },
    // 购物车列表商品添加
    plusCarPanelData (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          if (goods.count >= goods.limit_num) {
            return
          }
          goods.count++
          return
        }
      })
    },
    // 购物车列表商品添加
    subCarPanelData (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          if (goods.count <= 1) {
            return
          }
          goods.count--
          return
        }
      })
    },
    // 实现当商品全部选中，全选按钮也选中
    checkGoods (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          goods.checked = !goods.checked
          return
        }
      })
    },
    // 点击全选按钮实现商品全部选中
    allCheckGoods (state, allChecked) {
      state.carPanelData.forEach((goods, index) => {
        goods.checked = !allChecked
      })
    },
    // 购物车列表选中删除
    delCheckGoods (state) {
      let i = state.carPanelData.length
      while (i--) {
        if (state.carPanelData[i].checked) {
          state.carPanelData.splice(i, 1)
        }
      }
    },
    // 关闭弹框
    closePrompt (state) {
      state.maxOff = false
    },
    // 显示购物车
    showCar (state) {
      clearTimeout(state.carTimer)
      state.carShow = true
    },
    // 隐藏购物车
    hideCar (state) {
      state.carTimer = setTimeout(() => {
        state.carShow = false
      }, 500)
    },
    // 提交订单联系人情况
    submitReceive (state, data) {
      if (data.default) {
        state.receiveInfo.forEach((receive) => {
          receive.default = false
        })
      }
      state.receiveInfo.push(data)
    },
    submitOrder (state, data) {
      state.orderData.unshift(data)
      let i = state.carPanelData.length
      while (i--) {
        if (state.carPanelData[i].shecked) {
          state.carPanelData.splice(i, 1)
        }
      }
    },
    payNow (state, id) {
      state.orderData.forEach((order) => {
        if (order.orderId === id) {
          order.isPay = true
          return
        }
      })
    }
  }
})
export default store
