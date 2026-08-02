# AV Guides 运营检查清单（路线 A）

面向日常维护者。Agent 自动化细节见：  
`.grok/skills/av-guides-site/references/ops-checklist.md`  
触发 skill：`/av-guides-site` 或说「更新 codes / 周运营」。

---

## 每日 / 有新码

1. 对照 [Wiki Codes](https://wiki.vanguards.gg/Codes) + [Discord](https://discord.com/invite/animevanguards)
2. 编辑 `src/content/guides/anime-vanguards-codes.md`
   - 更新 `updated`、`activeCodes`
   - 失效码移入 `archivedByUpdate`（按 Update 分组）
   - 跨月改 `title` 里的月份
3. `npm run build` → commit → `git push origin main`
4. 等 GitHub Actions 绿
5. 打开 https://animevanguards.co/anime-vanguards/codes/ 确认

---

## 大更新当天

- [ ] 改 `VersionHotBar` 的 version / 说明（`src/components/VersionHotBar.astro`）
- [ ] 同步 codes + archive 新 Update 标题
- [ ] 需要时改 Event / Tier 文案与 `patch`
- [ ] 部署并手机点一遍首页 + Codes

---

## 每周

| 项 | 动作 |
|----|------|
| Codes | 与 Wiki 再对一次 active |
| GSC | sitemap 正常；记展示高点击低的词 |
| GA4 | 落地页、会话页数、`copy_all` / `click_related` |
| 线上 | 首页 / codes / sitemap 200 |

---

## 权威源（只读，不抄库）

| 源 | 链接 |
|----|------|
| Changelog | https://vanguards.gg/changelog |
| Wiki | https://wiki.vanguards.gg |
| Wiki Codes | https://wiki.vanguards.gg/Codes |
| Discord | https://discord.com/invite/animevanguards |

---

## 本站定位

**官方 / Wiki = 真相与数据库**  
**本站 = 快领码 + 决策路径（养谁、洗 trait、活动顺序）**
