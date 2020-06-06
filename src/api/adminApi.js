import axios from '../config/axios-admin.js'

// adminLogin.vue 管理员登录请求
export function adminlogin (data) {
  console.log(data.account + data.password);
  const res = axios.post('/admin/login', data);
  return new Promise((resolve, reject) => {
    res
      .then((result) => {
        if (result.status === 200) {
          return result.data;
          // alert(result.data.admins.account)
        } else {
          reject(result.status);
        }
      })
      .then((json) => {
        if (json.code === 200) {
          resolve(json.admins);
        } else {
          reject(json.code);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}

// editUser.vue 获得所有的用户信息
export function getAllUser () {
  const res = axios.get('/admin/allUser');
  return new Promise((resolve, reject) => {
    res.then((result) => {
      if (result.status === 200) {
        // alert('数据获取到了')
        return result.data;
      } else {
        reject(result.status)
      }
    }).then((json) => {
      if (json.code === 200) {
        resolve(json.users)
      } else {
        reject(json.code);
      }
    }).catch((e) => {
      reject(e.toString())
    })
  })
}

// editUser.vue 删除指定的用户信息
// 使用DELETE方式请求时，要手动将参数拼接到url中，而非写到data中,不然报错。
export function deleteUser (id) {
  // alert(id)
  const res = axios.delete('/admin/deleteUser?id=' + id);
  return new Promise((resolve, reject) => {
    res.then((result) => {
      if (result.status === 200) {
        return result.data;
      } else {
        reject(result.status)
      }
    }).then((json) => {
      if (json.code === 200) {
        resolve()
      } else {
        reject(json.influence)
      }
    }).catch((e) => {
      // alert('6')
      reject(e.toString())
    })
  })
}

// Goods.vue
// 查询所有商品的分类
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

// 添加新的商品分类
export function addType (data) {
  const res = axios.post('/admin/addType', data);
  // alert(data.name)
  return new Promise((resolve, reject) => {
    res.then((result) => {
      if (result.status === 200) {
        return result.data;
      } else {
        reject(result.status);
      }
    }).then((json) => {
      if (json.code === 200) {
        resolve(json.admins);
      } else {
        reject(json.code);
      }
    }).catch((e) => {
      reject(e.toString())
    })
  })
}

// 获取指定typeId中的所有商品信息
export function getGoods (id) {
  const res = axios.get('/admin/getGoodsByType?typeId=' + id);
  return new Promise((resolve, reject) => {
    res.then((result) => {
      // alert(id + '请求当前数据')
      if (result.status === 200) {
        return result.data;
      } else {
        reject(result.status)
      }
    }).then((json) => {
      if (json.code === 200) {
        resolve(json.goods);
      } else {
        reject(json.code);
      }
    }).catch((e) => {
      alert('6')
      reject(e.toString())
    })
  })
}
// 删除指定typeId的分类信息和相关的商品信息
export function deleteTypeAndGoods (typeId) {
  const res = axios.delete('/admin/deleteTypeAndGoods?typeId=' + typeId);
  return new Promise((resolve, reject) => {
    res.then((result) => {
      if (result.status === 200) {
        return result.data;
      } else {
        reject(result.status)
      }
    }).then((json) => {
      if (json.code === 200) {
        resolve()
      } else {
        reject(json.influence)
      }
    }).catch((e) => {
      // alert('6')
      reject(e.toString())
    })
  })
}

// 获取Id的商品的详细信息
export function getGoodInfo (id) {
  const res = axios.get('/admin/getGoodInfoById?id=' + id);
  return new Promise((resolve, reject) => {
    res.then((result) => {
      // alert(id + '请求当前数据')
      if (result.status === 200) {
        return result.data;
      } else {
        reject(result.status)
      }
    }).then((json) => {
      if (json.code === 200) {
        resolve(json.goods);
      } else {
        reject(json.code);
      }
    }).catch((e) => {
      alert('6')
      reject(e.toString())
    })
  })
}

// 提交修改/新增商品信息
export function addGood (data) {
  const res = axios.post('/admin/addGood', data);
  // alert(data.typeId)
  return new Promise((resolve, reject) => {
    res.then((result) => {
      if (result.status === 200) {
        return result.data;
      } else {
        reject(result.status)
      }
    }).then((json) => {
      if (json.code === 200) {
        resolve(json.goods);
      } else {
        reject(json.code);
      }
    }).catch((e) => {
      reject(e.toString())
    })
  })
}
// 删除指定Id的商品信息
export function deleteGood (goodId) {
  const res = axios.delete('/admin/deleteGood?goodId=' + goodId);
  return new Promise((resolve, reject) => {
    res.then((result) => {
     if (result.status === 200) {
       return result.data;
     } else {
       reject(result.status)
     }
   }).then((json) => {
     if (json.code === 200) {
       resolve();
     } else {
       reject(json.influence);
     }
   }).catch((e) => {
     reject(e.toString())
   })
 })
}

// 获取指定state的订单信息
export function getOrders (state) {
  const res = axios.get('/admin/orders?state=' + state);
  return new Promise((resolve, reject) => {
    res.then((result) => {
      if (result.status === 200) {
        return result.data;
      } else {
        reject(result.status)
      }
    }).then((json) => {
      if (json.code === 200) {
        resolve(json.orders);
      } else {
        reject();
      }
    }).catch((e) => {
      reject(e.toString())
    })
  })
}

// 删除指定的订单信息
export function deleteOrder (id) {
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
// 编辑订单信息
export function editOrder(data) {
  const res = axios.post('/admin/editOrder', data);
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
          reject(json.influence);
        }
      })
      .catch((e) => {
        reject(e.toString())
      })
  })
}
