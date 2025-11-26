# OTab - macOS 风格浏览器新标签页需求文档

## 1. 产品概述 (Product Overview)

- **产品类型**: 浏览器扩展 (Browser Extension) - 适用于 Chrome, Edge, Firefox 等。
- **核心功能**: 替换浏览器默认的“新标签页” (New Tab Page)。
- **设计理念**: 极致的 macOS 美学，提供类似原生操作系统的流畅与精致体验。

## 2. 设计规范 (Design Specifications - macOS Style)

### 2.1 视觉语言

- **毛玻璃效果 (Glassmorphism)**:
  - 广泛使用背景模糊 (`backdrop-filter: blur()`) 和半透明背景。
  - 模拟 macOS 的 Dock 栏、菜单栏和窗口的质感。
- **圆角与阴影**:
  - 统一的大圆角设计 (如 16px - 24px)。
  - 细腻的阴影处理，营造层级感。
- **图标设计**:
  - 采用 macOS Big Sur 风格的“圆角矩形” (Squircle) 图标。
  - 统一的图标尺寸和视觉重量。
- **字体排印**:
  - 优先使用系统字体 (San Francisco on Mac, Segoe UI on Windows)。
  - 保持简洁、易读。
- **动效 (Animations)**:
  - 模拟 macOS 的非线性动画 (Spring animations)。
  - Dock 栏图标的放大/缩小效果 (Magnification effect)。
  - 窗口打开/关闭的缩放动画。

### 2.2 主题模式

- **自动适应**: 跟随系统或浏览器设置自动切换深色/浅色模式。
- **动态壁纸**: 支持随时间变化的动态壁纸 (如 macOS 的动态沙漠、海岛壁纸)。

## 3. 核心功能 (Key Features)

### 3.1 桌面与壁纸 (Desktop & Wallpaper)

- **高清壁纸**: 内置精选 macOS 风格壁纸 (4K/5K)。
- **自定义壁纸**: 支持用户上传图片或使用 URL。
- **每日壁纸**: 集成 Unsplash 或 Bing 每日壁纸源。

### 3.2 底部 Dock 栏 (The Dock)

- **常用快捷方式**: 用户可以将最常访问的网站固定在底部 Dock 栏。
- **交互效果**: 鼠标悬停时图标放大 (鱼眼效果)。
- **智能收纳**: 支持文件夹或分组。

### 3.3 聚焦搜索 (Spotlight Search)

- **居中搜索框**: 类似 macOS Spotlight 的搜索体验。
- **多引擎支持**: Google, Bing, Baidu, DuckDuckGo 等，可快速切换。
- **快捷键唤起**: 支持键盘快捷键激活搜索。

### 3.4 桌面小组件 (Widgets)

- **时钟**: 模拟 macOS 时钟组件 (数字/模拟表盘)。
- **天气**: 当前天气与未来预报，精致的图标展示。
- **日历**: 简单的月视图日历。
- **备忘录/便签**: 简单的文本记录功能。

### 3.5 设置中心 (System Preferences)

- **界面风格**: 模仿 macOS “系统偏好设置” 的布局。
- **个性化选项**:
  - 调整模糊强度。
  - 调整图标大小。
  - 切换壁纸源。
  - 数据备份与恢复 (导入/导出配置)。

## 4. 技术栈 (Technical Stack)

- **前端框架**: React + TypeScript
- **构建工具**: Vite
- **样式处理**: SCSS / CSS Modules (支持变量定义主题)
- **状态管理**: React Context 或 Zustand
- **持久化存储**:
  - `localStorage` (基础配置)
  - `chrome.storage` (扩展同步)

## 5. 开发计划 (Roadmap)

1. **MVP 阶段**: 实现基础布局、壁纸背景、静态 Dock 栏、基础搜索。
2. **V1.0**: 完善 Dock 交互 (放大效果)、添加时钟/天气组件、设置面板。
3. **V1.5**: 增加更多小组件、自定义壁纸、数据同步功能。
