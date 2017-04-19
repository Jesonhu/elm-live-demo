/**
* 解析url参数
* @example ?id=123456&a=b
* @return Object {id:12345,a:b}
*/

export function urlParse() {
  // 正则表达式方法
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=12345', &a=b]
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
                      // 去掉? & 并以 '='分隔
      let key = decodeURIComponent(tempArr[0]); // 对非标准字符串进行解码
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  };
  return obj;
};
