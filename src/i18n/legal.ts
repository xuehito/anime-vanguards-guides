import type { Locale } from './routing';

export interface LegalDoc {
  title: string;
  description: string;
  lastUpdated?: string;
  html: string;
}

const about: Record<Locale, LegalDoc> = {
  en: {
    title: 'About',
    description: 'About AV Guides — unofficial guides for Roblox Anime Vanguards.',
    html: `<p><strong>AV Guides</strong> is an unofficial fan site for the Roblox game <em>Anime Vanguards</em>. We publish working codes, tier guidance, and beginner tips so players can look things up quickly between matches.</p>
<p>Content is maintained as static Markdown and deployed as a static site. We are not affiliated with Roblox Corporation, Kitawari, or the official Anime Vanguards team.</p>
<p>For official news, join the game’s Discord and visit <a href="https://vanguards.gg/">vanguards.gg</a>.</p>`,
  },
  zh: {
    title: '关于',
    description: '关于 AV Guides — Roblox Anime Vanguards 非官方指南。',
    html: `<p><strong>AV Guides</strong> 是 Roblox 游戏 <em>Anime Vanguards</em> 的非官方粉丝站。我们整理可用兑换码、投资优先级和新手路径，方便对局里快速查阅。</p>
<p>内容用静态 Markdown 维护并部署。我们与 Roblox Corporation、Kitawari 或官方 Anime Vanguards 团队无关。</p>
<p>官方消息请去游戏 Discord 和 <a href="https://vanguards.gg/">vanguards.gg</a>。</p>`,
  },
};

const privacy: Record<Locale, LegalDoc> = {
  en: {
    title: 'Privacy Policy',
    description: 'Privacy policy for AV Guides.',
    lastUpdated: 'August 18, 2026',
    html: `<p>AV Guides (“we”, “this site”) is a static informational website. This policy describes what data may be collected when you visit.</p>
<h2>Information we collect</h2>
<ul>
<li><strong>Server / CDN logs</strong> — hosting providers (e.g. Vercel, Cloudflare) may log IP address, user agent, and request URLs for security and reliability.</li>
<li><strong>Analytics</strong> — we use <strong>Google Analytics 4</strong> (measurement ID <code>G-Y1DW60FQMH</code>) to understand traffic. Google may set cookies or use similar identifiers. See <a href="https://policies.google.com/privacy" rel="noopener noreferrer">Google’s Privacy Policy</a>.</li>
<li><strong>Advertising</strong> — when ads are enabled (Adsterra and/or Google AdSense), those partners may use cookies or device identifiers to serve and measure ads. See their policies for details.</li>
</ul>
<h2>Cookies</h2>
<p>The core site does not require cookies for reading guides. Analytics and ads may set cookies. You can control or block cookies in your browser settings.</p>
<h2>Children</h2>
<p>The site discusses a Roblox game and may be visited by younger players. We do not knowingly collect personal information from children.</p>
<h2>Contact</h2>
<p>Questions: see our contact page.</p>`,
  },
  zh: {
    title: '隐私政策',
    description: 'AV Guides 隐私政策。',
    lastUpdated: '2026年8月18日',
    html: `<p>AV Guides（“我们”“本站”）是静态信息站。本政策说明访问时可能收集的数据。</p>
<h2>我们收集的信息</h2>
<ul>
<li><strong>服务器 / CDN 日志</strong> — 托管方（如 Vercel、Cloudflare）可能记录 IP、UA 和请求 URL，用于安全和稳定性。</li>
<li><strong>分析</strong> — 使用 <strong>Google Analytics 4</strong>（衡量 ID <code>G-Y1DW60FQMH</code>）了解流量。Google 可能设置 cookie。见 <a href="https://policies.google.com/privacy" rel="noopener noreferrer">Google 隐私政策</a>。</li>
<li><strong>广告</strong> — 开启广告后（Adsterra 和/或 Google AdSense），合作方可能使用 cookie 或设备标识来投放和衡量广告。</li>
</ul>
<h2>Cookie</h2>
<p>阅读指南本身不需要 cookie。分析和广告可能会设置 cookie。可在浏览器里拦截。</p>
<h2>儿童</h2>
<p>本站讨论 Roblox 游戏，可能有较年轻的访问者。我们不会故意收集儿童个人信息。</p>
<h2>联系</h2>
<p>问题请看联系页。</p>`,
  },
};

const disclaimer: Record<Locale, LegalDoc> = {
  en: {
    title: 'Disclaimer',
    description: 'Disclaimer for AV Guides — unofficial Anime Vanguards fan content.',
    html: `<p>AV Guides is an <strong>unofficial fan resource</strong>. It is not endorsed by or affiliated with Roblox Corporation, the Anime Vanguards developers, or any anime IP holders referenced by community unit nicknames.</p>
<ul>
<li>Game mechanics, codes, and balances change without notice.</li>
<li>Codes may expire or fail; the game client is the source of truth.</li>
<li>Tier lists are opinionated community guidance, not official rankings.</li>
<li>We do not sell accounts, items, or real-money trades.</li>
</ul>
<p>Roblox® is a trademark of Roblox Corporation. All game assets and trademarks belong to their respective owners.</p>`,
  },
  zh: {
    title: '免责声明',
    description: 'AV Guides 免责声明 — 非官方 Anime Vanguards 粉丝内容。',
    html: `<p>AV Guides 是<strong>非官方粉丝资源</strong>，未获 Roblox Corporation、Anime Vanguards 开发商或社区单位昵称所涉动漫 IP 方认可或关联。</p>
<ul>
<li>机制、兑换码和数值可能随时变化。</li>
<li>兑换码可能过期或失败；以游戏客户端为准。</li>
<li>梯队是社区投资意见，不是官方排名。</li>
<li>我们不卖号、不卖道具、不做 RMT。</li>
</ul>
<p>Roblox® 是 Roblox Corporation 的商标。游戏素材和商标归各自权利人所有。</p>`,
  },
};

const contact: Record<Locale, LegalDoc> = {
  en: {
    title: 'Contact',
    description: 'Contact AV Guides.',
    html: `<p>For corrections (wrong/expired codes, broken links), use the site repo or replace this page with your preferred channel.</p>
<ul>
<li>Email: <code>hello@yourdomain.com</code></li>
<li>X / Twitter, Discord ticket, or GitHub Issues on the site repo</li>
</ul>
<p>We cannot recover Roblox accounts, reverse bans, or mediate player trades.</p>`,
  },
  zh: {
    title: '联系',
    description: '联系 AV Guides。',
    html: `<p>纠错（错误/过期兑换码、死链）请走站点仓库，或把本页换成你常用的联系方式。</p>
<ul>
<li>邮箱：<code>hello@yourdomain.com</code></li>
<li>X / Twitter、Discord 工单，或站点仓库的 GitHub Issues</li>
</ul>
<p>我们无法找回 Roblox 账号、撤销封禁，或调解玩家交易。</p>`,
  },
};

export const LEGAL_PAGES = {
  about,
  privacy,
  disclaimer,
  contact,
} as const;

export type LegalSlug = keyof typeof LEGAL_PAGES;

export function getLegal(slug: LegalSlug, locale: Locale): LegalDoc {
  return LEGAL_PAGES[slug][locale];
}
