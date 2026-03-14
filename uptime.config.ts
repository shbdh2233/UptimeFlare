import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: "小小的博客状态监控",
  links: [
    { link: 'https://195306.xyz', label: '博客首页', highlight: true },
    { link: 'https://github.com/lyc8503/UptimeFlare', label: 'Powered by UptimeFlare' },
  ],
}

const workerConfig: WorkerConfig = {
  monitors: [
    {
      id: 'xiaoxiao_homepage',
      name: '博客首页',
      method: 'GET',
      target: 'https://195306.xyz',
      tooltip: 'WordPress 前台首页访问状态',
      statusPageLink: 'https://195306.xyz',
      expectedCodes: [200],
      timeout: 10000,
      responseKeyword: '小小',
    },
    {
      id: 'xiaoxiao_post',
      name: '博客文章页',
      method: 'GET',
      target: 'https://195306.xyz/2026/03/15/最近用了kimi-code/',
      tooltip: '文章详情页加载状态',
      statusPageLink: 'https://195306.xyz/2026/03/15/最近用了kimi-code/',
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'xiaoxiao_wp_login',
      name: 'WordPress 后台登录页',
      method: 'GET',
      target: 'https://195306.xyz/wp-login.php',
      tooltip: '后台登录页面可访问性',
      statusPageLink: 'https://195306.xyz/wp-admin/',
      expectedCodes: [200],
      timeout: 15000,
      responseKeyword: 'wp-submit',
    },
    {
      id: 'xiaoxiao_wp_api',
      name: 'WordPress REST API',
      method: 'GET',
      target: 'https://195306.xyz/wp-json/wp/v2/',
      tooltip: 'WordPress 核心 API 状态',
      expectedCodes: [200],
      timeout: 10000,
    },
  ],
}

const maintenances: MaintenanceConfig[] = []

export { maintenances, pageConfig, workerConfig }

/* ============================================================
【设计思路备注】

1. 监控目标: https://195306.xyz (小小的 WordPress 博客)
2. 监控策略:
   - 首页: 检测关键词"小小"确保不是CDN错误页
   - 文章页: 检测具体文章链接，验证内容渲染
   - 后台: 检测 wp-login.php 的 wp-submit 按钮
   - API: 检测 REST API 是否正常响应
3. 如需修改:
   - 换域名: 批量替换 195306.xyz
   - 改检测词: 修改 responseKeyword
   - 加监控项: 复制对象改 id(唯一) 和 target
   - 开通知: 添加 notification.webhook 配置
   - 维护窗口: 在 maintenances 添加时间段
4. 提示: id 别改，改了历史数据会丢
============================================================ */
