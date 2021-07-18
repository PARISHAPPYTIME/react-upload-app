import React from 'react';
import ReactDOM from 'react-dom';
import '@/index.less';
import App from '@/App';
import { Provider } from 'react-redux';
import store from '@/store/index.js'
import { message } from 'antd'
import sock from '@/utils/socket.js'
import cookie from 'react-cookies'

sock.on('login', (data) => {
  message.success('1登录部分 => ' + data)
});
sock.on('user', (data) => {
  message.success('2用户 => ' + data)
});
sock.on('message', (data) => {
  message.success(data)
});

const name = cookie.load('username')
if (!name) {
  message.warning('请先登录')
}

// 客户端在这里手动出发一下自己出场的 事件
sock.emit('message', {
  name: name,
  message: `进入房间`
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
