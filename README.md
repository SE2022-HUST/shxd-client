# 视频自动打码工具

### 项目介绍 / Intro

**Produced By: SHXD Team@HUST**

视频自动打码工具，前后端分离设计~~但是同时运行在一个客户端里~~。

前端采用React+Typescript实现GUI，利用Pywebview提供Webview环境，方便后续跨平台部署。

后端采用Flask框架与前端以C/S模型通信，实现前后端异步处理，并为后续拓展留出空间。

---

### 依赖项 / Dependencies

- Python环境配置：`pip install -r requirements.txt`
- Node环境配置：`npm install`

具体依赖项请见`requirements.txt`和`package.json`

---

### 项目结构 / Folder Structure

**根目录**
 ├─config               Webpack配置文件
 ├─core                 CV模型
 ├─gui                  Webpack打包生成的网页
 ├─src                  React网页源码
 ├─static               静态资源
 ├─.balbelrc            babel配置文件
 ├─main.py              程序入口
 ├─main.spec            pyinstaller配置
 ├─package.json         npm配置
 ├─requirements.txt     pip配置
 └─tsconfig.json        Typescript配置

---

### 项目启动 / How to Start

#### 编译UI界面

命令行输入 `npm run build` 即可生成界面

在浏览器中调试界面请输入 `npm run start`（注意：不手动运行后端会导致上传失效）

#### 运行程序

命令行输入 `python -u main.py`运行入口脚本

**注意：要求Python版本<=3.9（建议使用我们的开发环境：3.8.10）**
