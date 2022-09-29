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

Then just enjoy it~

---

### 项目启动 / How to Start

在项目目录的命令行中输入 `python -u main.py`运行入口脚本

**注意：要求Python版本<=3.9（建议使用我们的开发环境：3.8.10）**
