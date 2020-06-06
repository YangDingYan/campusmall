import axios from '../config/axios-client';

//用户登录v
export function login(data) {
  const res = axios.post('/user/login', data);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 200) {
          resolve(json);
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//用户注册v
export function signup(data) {
  const res = axios.post('/user/signup', data);
  console.log(data)
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 200) {
          resolve(json.name);
        } else {
          reject(json.code);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

// 得到类目v
export function getTypes () {
  const res = axios.get('/admin/getTypes');
  return new Promise((resolve, reject) => {
    res.then((result) => {
      if (result.status === 200) {
        return result.data;
      } else {
        reject(result.status)
      }
    }).then((json) => {
      if (json.code === 200) {
        resolve(json.types)
      } else {
        reject(json.code);
      }
    })
  })
}

//获得不同类目的商品v
export function getGoodsList(typeId) {
  const res = axios.get('/mall/getGoodsByType?typeId=' + typeId);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 200) {
          resolve(json.goods);
        } else {
          reject(json.code);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//获得商品详情页信息
export function getGoodsInfo(id) {
  const res = axios.get('/mall/getGoodsInfo?id=' + id);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 200) {
          resolve(json.goods);
        } else {
          reject(json.code);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//获得商品详情页问答区数据
export function getGoodsMsg(id) {
  const res = axios.get('/mall/getGoodsMsg?id=' + id);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve(json.data);
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//发送商品msg
export function askGoodsMsg(data) {
  const res = axios.post('/mall/askGoodsMsg', data);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve();
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//加入购物车
export function addOrder(data) {
  const res = axios.post('/mall/addOrder', data);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 200) {
          resolve();
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//获得用户订单列表
export function getOrderByState(state, userId) {
  const res = axios.get('/mall/getOrderByState?state=' + state + '&userId=' + userId);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 200) {
          resolve(json.orders);
        } else {
          reject(json.code);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//删除订单
export function deleteOrder(id) {
  const res = axios.delete('/admin/deleteOrder?id=' + id);
  return new Promise((resolve, reject) => {
    res.then((result) => {
      if (result.status === 200) {
        return result.data;
      } else {
        reject(result.status)
      }
    }).then((json) => {
      if (json.code === 200) {
        resolve(json.influence);
      } else {
        reject(json.code);
      }
    }).catch((e) => {
      reject(e.toString())
    })
  })
}

//确认收货
export function confirmReceive(id) {
  const res = axios.get('/mall/confirmReceive?id=' + id);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve();
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//确认付款
export function pay(id) {
  const res = axios.get('/mall/pay?id=' + id);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve();
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//获得用户资料
export function getUserData(id) {
  const res = axios.get('/user/data?id=' + id);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 200) {
          resolve(json.user);
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//更改用户资料
export function updateUserData(data) {
  const res = axios.post('/user/updateUserData', data);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve();
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//更改用户密码
export function updatePwd(data) {
  const res = axios.post('/user/updatePwd', data);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve();
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//结算购物车
export function settleAccounts(data) {
  const res = axios.post('/mall/settleAccounts', data);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve();
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//发送评价
export function sendComment(data) {
  const res = axios.post('/mall/sendComment', data);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve();
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//获得商品评论
export function getComment(goodsId) {
  const res = axios.get('/mall/getGoodsComment?goodsId=' + goodsId);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve(json.data);
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

//关键词搜索商品
export function searchGoods(keyword = '') {
  const res = axios.get('/mall/searchGoods?keyword=' + keyword);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
        } else {
          reject(result.status)
        }
      })
      .then((json) => {
        if (json.code === 0) {
          resolve(json.data);
        } else {
          reject(json.message);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}
