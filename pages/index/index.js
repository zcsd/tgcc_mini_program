Page({
    data: {
    appid: 'aaaaaaaa',
    websocketServer: '开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名',
    sendMessageAbility: false,
    toSendMessage: 'test',
    closeLinkAbility: false,
    log: '',
    text: '初始化消息'
  },

  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);

    my.tg.playTTS({ text: '你好，欢迎来到小游戏。' })

    my.onSocketClose((res) => {
      my.alert({content: '连接已关闭！'});
      this.setData({
        sendMessageAbility: false,
        closeLinkAbility: false,
      });
    });

    my.onSocketOpen((res) => {
      my.alert({content: '连接已打开！'});
      this.setData({
        sendMessageAbility: true,
        closeLinkAbility: true,
      });
    });

    my.onSocketError(function(res){
      my.alert('WebSocket 连接打开失败，请检查！' + res);
    });

    my.onSocketMessage((res) => {
      my.tg.playTTS({ text: res.data, openMic: false })
      this.setData({
        text: res.data,
      });
    });
  },

  onServerAddressComplete(e) {
    this.setData({
      websocketServer:e.detail.value,
    });
  },

  onSendMessageReady(e) {
    this.setData({
      toSendMessage:e.detail.value,
    });
  },

  connect_start() {
    my.connectSocket({
      url: this.data.websocketServer, // 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
      success: (res) => {
        my.showToast({
          content: 'success', 
        });
      },
      fail:()=>{
        my.showToast({
          content: 'fail', 
        });
      }
    });
  },

  send_start() {
    my.sendSocketMessage({
      data: this.data.toSendMessage, // 需要发送的内容
      success: (res) => {
        my.alert({content: '数据发送！' + this.data.toSendMessage});
      },
    });
  },

  close_start() {
    my.closeSocket();
  },

  onReady() {
    // 页面加载完成
  },

  onShow() {
    // 页面显示
    //只允许应用内的语音技能调用，不跳出
    my.call('useSystemSkill', {
      skillName: 'chat'
    })
  },

    //默认的语音指令回调
  onVoiceEvent(event){
    var query = event.param.query;
    //my.alert({content: "语音指令" + query});
    if (query.includes('扩散作用')){
      my.tg.playTTS({ text: '扩散作用是指物质从含量高的地方向含量低的地方扩散' })
    }else if(query.includes('渗透作用')){
      my.tg.playTTS({ text: '渗透作用是指两种不同浓度的溶液隔以半透膜，水分子或其它溶剂分子从低浓度的溶液通过半透膜进入高浓度溶液中的现象' })
    }else if(query.includes('温度') && (query.includes('高') || query.includes('加') || query.includes('多'))){
      my.sendSocketMessage({
        data: 'hotter', // 需要发送的内容
        success: (res) => {
          //my.alert({content: '数据发送！' + this.data.toSendMessage});
        },
      });
    }else if(query.includes('温度') && (query.includes('低') || query.includes('减') || query.includes('少'))){
      my.sendSocketMessage({
        data: 'colder', // 需要发送的内容
        success: (res) => {
          //my.alert({content: '数据发送！' + this.data.toSendMessage});
        },
      });
    }else if(query.includes('左') && query.includes('加') ){
      my.sendSocketMessage({
        data: 'leftsalt', // 需要发送的内容
        success: (res) => {
          //my.alert({content: '数据发送！' + this.data.toSendMessage});
        },
      });
    }else{
      my.tg.nlpRequest({text: query}); 
    }
  },

  respond() {
    my.tg.playTTS({ text: '你好，欢迎来到小游戏。' })
  },

  onHide() {
    // 页面隐藏
  },

  onUnload() {
    // 页面被关闭
  },

  onTitleClick() {
    // 标题被点击
  },

  onPullDownRefresh() {
    // 页面被下拉
  },

  onReachBottom() {
    // 页面被拉到底部
  },

  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
