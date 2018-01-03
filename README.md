## 後臺管理系統
## Build Setup
``` bash
npm install
# serve with hot reload at localhost:8088
npm run dev
npm run build
```

- #### 打包发布,修改根路径名
1. 修改 **[./Vue-Admin/config/index.js](https://github.com/lanux/Vue-Admin/blob/master/config/index.js)**   参数:build.assetsPublicPath
```javascript
//eg.  assetsPublicPath: '/Vue-Admin/'
assetsPublicPath: 'Your path name';
```
2. 修改 **[./Vue-Admin/src/api.js](https://github.com/lanux/Vue-Admin/blob/master/src/api.js)**
```javascript
// export const CONTEXT = './Vue-Admin';
export const CONTEXT = 'Your path name';
```

## 页面截图
暫無
