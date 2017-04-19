// 保存到本地localStore
export function setLocalStore(id, key, value) {
  let seller = window.localStorage._seller_; // 准备保存到这个属性下面
  if (!seller) { // 不存在 第一次保存时
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    };
  };
  seller[id][key] = value;
  window.localStorage._seller_ = JSON.stringify(seller);
};

// 取得localStore的内容
export function getLocalStore(id, key, def) {
  let seller = window.localStorage._seller_;
  if (!seller) { // 如果local不存在没存储过
    return def;
  };
  seller = JSON.parse(seller)[id];
  if (!seller) { // 值为false
    return def;
  }
  let ret = seller[key];
  return ret || def; // set有值就返回没有就返回默认值
};
