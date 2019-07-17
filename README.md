## 写在前面的话
近期因为工作压力不大，所以利用空闲时间学学koa2,都说实践才是检验真理的唯一途径吗。所以就撸个小项目玩玩。温馨提示，本文只适合初学者，如我一般的菜鸟。大神请你走开，谢谢~

那就先上图吧

![登录页](https://user-gold-cdn.xitu.io/2019/7/17/16bff02fca0e07d3?w=1920&h=968&f=png&s=545717)

![主要功能页](https://user-gold-cdn.xitu.io/2019/7/17/16bff0389f7040f0?w=1917&h=967&f=png&s=57899)

```
技术栈
```
- react
- react-redux
- koa2
- mongodb
- axios
- antd

```
项目结构
```

![项目结构](https://user-gold-cdn.xitu.io/2019/7/17/16bff13ec190d195?w=273&h=338&f=png&s=10804)

## 项目运行
```
# 克隆到本地：
git clone https://github.com/wzz5304/koaTodoList
# 安装依赖
react:
cd koaTodoList
npm install或yarn
npm start或yarn start
koa：
cd server
npm install(安装依赖)
npm run dev(启动项目)

# 本地开发，开启服务器，浏览器访问http://localhost:3000,koa监听的是8081端口http://localhost:8081，
注意：代理配置在koaTodoList/package.json文件端口不同自行修改

```

## 实现功能
- 用户登录
- 注销登录
- token验证
- 列表页的增删改查
- 列表分页

## 代码实现
- 前端
  
    - 脚手架配置参考 [antd在 create-react-app 中使用](https://ant-design.gitee.io/docs/react/use-with-create-react-app-cn) 很详细
    - http请求封装主要参考http文件夹，所有的请求方法我都写在public.api.js文件内
    - rApi(所有的请求方法)注入在redux的store仓库内
- 后端
    
    - 文件结构
![文件结构](https://user-gold-cdn.xitu.io/2019/7/17/16bff3525142530e?w=273&h=243&f=png&s=12809)

    ```
    主要流程：数据模型->控制器->路由->入口文件
    ```
    - 数据库相关
    ```
    # 数据库名
    mydb
    # 表结构
    - 用户表user
        userName：用户名
        passWord：密码
    - 车辆信息表carTable
        carCode: 车牌号,
        carTypeName: 车辆类型,
        driverName: 司机名字,
        remark: 备注,
        createTime: 创建时间,
        operatorName: 操作人
        
    具体参考 models文件
    ```
    
## 踩到的坑及解决方案
- 安装完数据库记得配置环境变量 [参考](https://jingyan.baidu.com/article/6525d4b1af0d9bac7d2e941f.html)
- nodejs不支持es6所以需要自行配置 [参考](https://segmentfault.com/a/1190000012709705)
- 使用mongoose.Schema实例化的时候记得最好加上collection配置，因为koa默认会给你的表名加s所以这里有点坑，我踩到了如下：
    ```
    const UserSchema = Schema(
        {
            carCode: { type: String },
            carTypeName: { type: String },
            driverName: { type: String },
            remark: { type: String },
            createTime: { type: Number },
            operatorName: { type: String }
        },
        {
            collection: 'carTable'
        }
    )
    ```
- 在redux或者自己封装的http里面想使用react-router的history方法很麻烦，所以可以自己导入，如下
    ```
    import createHistory from 'history/createBrowserHistory'
    export default createHistory()
    需要用的地方import就ok了，我用的是react-router4.xx版本
    ```
    
## 写在最后的话
利用空余时间自己玩玩平常项目没有接触到的东西，其实也挺好的。本项目适合新手练手，koa我也是新手。刚好有空然后自己玩玩，顺便记录下开发心得。
希望与有缘人一同交流交流。这只是开始，学习还在继续。

