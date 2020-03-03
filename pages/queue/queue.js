// pages/queue/queue.js
const { $Toast } = require('../../dist/base/index');
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    elements: [
      { title: '个人业务', name: 'Owner', color: 'purple', icon: 'people' },
      { title: 'VIP业务 ', name: 'VIP', color: 'mauve', icon: 'vip' },
      { title: '理财业务', name: 'Money', color: 'pink', icon: 'moneybagfill' },
      { title: '对公业务', name: 'DuiG', color: 'brown', icon: 'friendfill' }
    ],
    queue:{

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleFruitChange({ detail = {} }) {
      this.setData({
        current: detail.value
      });
    },
    toAgreement(){
      console.log("aaa")
      wx.navigateTo({
        url: '../agreement/aggreement'
      })
    },
    handleClick() {
      this.setData({
        position: this.data.position.indexOf('left') !== -1 ? 'right' : 'left',
      });
    },
    handleDisabled() {
      this.setData({
        disabled: !this.data.disabled
      });
    },
    handleAnimalChange({ detail = {} }) {
      console.log("sss")
      this.setData({
        checked: detail.current
      });
    },
    findCustomer(){
      console.log("查询顾客的信息")
      // wx.navigateTo({
      //   url: '../queue/queue'
      // })
    },
    findNow(){
      console.log("查询当前进度")
      // wx.navigateTo({
      //   url: '../queue/queue'
      // })
    },
    // 选择业务
    handleChange(event){
      console.log(event.currentTarget.dataset.record)
      this.setData({
        queue: { title: event.currentTarget.dataset.record.title}
      })
    },
    showModal(event){
      console.log(event.currentTarget.dataset.target)
      if (this.data.queue.title==undefined){
        console.log("11")
        $Toast({
          content: '您还没有选择办理的业务',
          type: 'warning'
        });
      }else{
        this.setData({
          modalName: event.currentTarget.dataset.target
        })
      }
     
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    handleOk(e){
       wx.navigateTo({
        url: '../nowqueue/nowqueue'
      })
      this.setData({
        modalName: null
      })
    }
  }
})
