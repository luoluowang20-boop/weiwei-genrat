# UUID Generator：从这里开始

一个英文单页 UUID v4 生成网站。打开即生成，支持复制和重新生成；不注册、不保存历史。使用原生 HTML、CSS、JavaScript，运行和构建都不需要安装第三方依赖。

## 本地运行

1. 电脑需要 Node.js 22 或更新版本。在终端输入 `node --version` 检查；如果提示找不到命令，从 [Node.js 官网](https://nodejs.org/)安装 LTS 版本，然后重新打开终端。
2. 在此项目文件夹打开 PowerShell。当前电脑可直接粘贴：

```powershell
cd "C:\Users\Administrator\Documents\Codex\2026-10-10\new-chat-5\outputs\uuid-generator"
node scripts/serve.mjs
```

3. 保持终端开启，在浏览器访问 <http://localhost:3000>。
4. 修改 `src` 中的文件后，刷新浏览器。停止运行时，在终端按 `Ctrl+C`。

不需要运行 `npm install`。如果安装了 npm，也可以用 `npm run dev` 启动。

如果提示 3000 端口被占用，先访问该网址确认是否已经运行了本项目，或使用：

```powershell
$env:PORT="3001"
node scripts/serve.mjs
```

此时访问 <http://localhost:3001>。不要直接双击 HTML 文件运行，浏览器会限制文件方式加载脚本。

## 文件结构

```text
uuid-generator/
├── src/
│   ├── index.html       页面文字与结构
│   ├── styles.css       颜色、布局、手机适配
│   ├── app.js           按钮、复制、状态提示
│   ├── uuid.js          UUID 生成逻辑
│   ├── favicon.svg     浏览器标签小图标
│   └── 404.html         不存在页面的提示
├── scripts/
│   ├── serve.mjs        本地预览
│   └── build.mjs        生成上线文件与站点地图
├── tests/uuid.test.mjs  UUID 自动检查
├── docs/需求文档.md
├── docs/部署文档.md
├── package.json        项目信息与运行命令
├── vercel.json         Vercel 部署配置
├── .gitignore          不上传的文件清单
└── dist/               构建后生成，不要手动修改
```

自动检查：`node --test tests/uuid.test.mjs`。

构建：`node scripts/build.mjs`。本地预览读取 `src`；`dist` 是上线文件，所以本地预览地址没有站点地图。部署设置见 [部署文档](docs/部署文档.md)。

没有设置网址时，构建结果默认不允许搜索引擎收录。正式上线请设置 `SITE_URL` 并重新部署。不要将示例域名当成真实域名。
