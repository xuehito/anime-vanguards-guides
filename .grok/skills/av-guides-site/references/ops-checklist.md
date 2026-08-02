# Route A — 运营检查清单（AV Guides）

目标：**Codes 永远新** + 版本条不骗人 + 部署绿 + 每周看一眼搜索/分析。  
不做全站重构；官方 Wiki / Changelog 仍是权威数据源。

---

## 0. 权威来源（改码前先打开）

| 来源 | URL | 用途 |
|------|-----|------|
| Discord | https://discord.com/invite/animevanguards | 新码通常最先出现 |
| Wiki Codes | https://wiki.vanguards.gg/Codes | Active + 完整归档对照 |
| Changelog | https://vanguards.gg/changelog | 版本名、更新内容 |
| Wiki home | https://wiki.vanguards.gg/Anime_Vanguards_Wiki | Hot 活动 / 新单位 |
| 线上站 | https://animevanguards.co/anime-vanguards/codes/ | 改完后验收 |

**规则：** 未在 Discord / Wiki / 游戏内验证过的 code **不要写进 active**。可写进 archive 作「已过期参考」仅当 Wiki 已归档。

---

## 1. 日常 / 有新码时（15～30 分钟）

### 1.1 对照清单

- [ ] 打开 Wiki Codes active 表 + Discord codes 频道
- [ ] 列出：新增 active、已失效、奖励/等级是否变化
- [ ] 游戏内抽 1～2 个新码试 redeem（若你有号）或标注 community-verified

### 1.2 改文件

**主文件：** `src/content/guides/anime-vanguards-codes.md`

| 字段 | 动作 |
|------|------|
| `updated` | 今天日期 `YYYY-MM-DD` |
| `title` | 月份/年份仍准（如 `August 2026`）；跨月就改 |
| `patch` | 与当前大版本一致（如 `Update 14.0`） |
| `activeCodes` | 只保留仍可用；新码可 `new: true` |
| `archivedByUpdate` | 失效码 **移入** 对应 Update 组（不要只删） |

**active 条目形状：**

```yaml
activeCodes:
  - code: "ExampleCode"
    rewards: "50 Trait Rerolls"
    requirement: "Level 30"   # 或 "—"
    new: true                 # 可选，下一轮可去掉
```

**归档组形状：**

```yaml
archivedByUpdate:
  - update: "Update 14.0 Part 1"
    codes:
      - code: "OldCode"
        rewards: "..."
        requirement: "Level 30"
```

- [ ] 旧 active 失效 → 剪到 `archivedByUpdate` 正确 Update 下
- [ ] 新 active → 加到 `activeCodes` 顶部或按习惯排序
- [ ] 去掉已不准确的 `new: true`（可选，避免永久 NEW）

### 1.3 可选连带（有大版本再做）

| 文件 | 何时改 |
|------|--------|
| `src/components/VersionHotBar.astro` | `version` / `versionNote` 与 changelog 不一致时 |
| `src/content/guides/anime-vanguards-event.md` | 活动名/日期窗口变了 |
| `src/content/guides/anime-vanguards-tier-list.md` | 仅当 meta 话术过时；**完整榜仍链 Wiki** |
| Wiki 单位外链 | 404 时改链或删掉死链 |

### 1.4 构建与上线

```bash
cd /Users/starx/anime-vanguards-guides
npm run build
git add src/content/guides/anime-vanguards-codes.md
# 若改了 VersionHotBar / event / tier 一并 add
git commit -m "$(cat <<'EOF'
Update Anime Vanguards codes (active + archive)

Sync with Wiki/Discord; set updated date.
EOF
)"
git push origin main
gh run list -R xuehito/anime-vanguards-guides --limit 1
# 等 success
```

### 1.5 上线验收

- [ ] https://animevanguards.co/anime-vanguards/codes/ 显示新 `Last checked`
- [ ] Active 数量与内容对
- [ ] Copy / Copy all 可用
- [ ] Archive 折叠组里能看到刚挪走的码
- [ ] （可选）`curl -sI https://animevanguards.co/anime-vanguards/codes/ | head -5`

---

## 2. 大更新当天（额外 20～40 分钟）

Changelog 或 Wiki 首页出现新 Part（如 14.0 P2 → 下一版）：

- [ ] `VersionHotBar`：`version` + `versionNote` 对齐一句话卖点
- [ ] Codes：扫新码；旧码进 archive **新 Update 标题**
- [ ] Event 页：活动名 / 「free track first」是否仍适用
- [ ] Tier：`patch` 字段 + 文首「Patch focus」；死链 Wiki 单位清理
- [ ] 首页热区四卡仍合理（Codes / Event / Traits / Tier）
- [ ] commit 信息写清版本号，例如 `Sync site for Update 14.0 P2`
- [ ] 部署绿 + 手机打开首页与 Codes

---

## 3. 每周一次（30～45 分钟）

### 3.1 内容健康

- [ ] Active 码与 Wiki 再对一遍（防漏失效）
- [ ] `title` 月份是否过期（跨月必改）
- [ ] Sources 条外链是否 200（Discord / Wiki / Changelog）

### 3.2 Google Search Console

- [ ] 属性：`https://animevanguards.co`
- [ ] 站点地图：`https://animevanguards.co/sitemap.xml` 无报错
- [ ] 看「效果」：展示高、点击低的 query → 记一笔改 title/description
- [ ] 看「网页」：是否有 404 / 被排除（有则修）

### 3.3 Google Analytics 4

属性事件（已埋）：

| 事件 | 含义 |
|------|------|
| `copy_code` | 单码复制 |
| `copy_all` | 一键全复制 |
| `click_related` | Related 卡片 |
| `click_start_path` | 首页 Start here |

周看：

- [ ] 落地页：Codes 是否为主
- [ ] 每次会话页数：是否 ≥ 1.3～1.5（路径是否在工作）
- [ ] `copy_all` 是否有量（有 = 功能被用）
- [ ] 异常：流量骤降 → 先查部署与 codes 是否过期空表

### 3.4 部署与域名抽检

- [ ] Actions 最近 run 为 success：`gh run list -R xuehito/anime-vanguards-guides --limit 3`
- [ ] `https://animevanguards.co/` 与 `.../codes/` 200
- [ ] `https://animevanguards.co/sitemap.xml` 为 XML 非 HTML

---

## 4. 每月一次（可选）

- [ ] 清理 archive 过旧组（或只保留近 3～5 个 Update，更早的只链 Wiki）
- [ ] Privacy / contact 信息仍准确
- [ ] 广告：仅当流量稳定且准备好合规时再考虑 `PUBLIC_ADS_ENABLED`（路线 A 默认关）

---

## 5. 明确不做（路线 A）

- 不镜像整站 Wiki 单位库  
- 不发明 codes / 奖励  
- 不把交易 value / 卖号写进站  
- 不为「热闹」加弹窗、强制订阅  
- 不在 codes 页塞挡 Copy 的广告  

---

## 6. 代理自检命令（给 Agent）

```bash
cd /Users/starx/anime-vanguards-guides

# 构建
npm run build

# 部署状态
gh run list -R xuehito/anime-vanguards-guides --limit 3

# 线上冒烟（若本机 198.18 Fake-IP，改用手机或关代理）
curl -sI --max-time 15 https://animevanguards.co/anime-vanguards/codes/ | head -8
curl -s --max-time 15 https://animevanguards.co/anime-vanguards/codes/ | grep -o 'Last checked[^<]*' | head -3
```

---

## 7. 完成定义（Definition of Done）

一次「codes 更新」算完成，当且仅当：

1. frontmatter `updated` 为当天  
2. active 与权威源一致（无已知失效码）  
3. 失效码已进 `archivedByUpdate`  
4. `npm run build` 通过  
5. `main` 已 push 且 Actions success  
6. 线上 Codes 页肉眼确认  

一次「周运营」算完成，当且仅当：内容健康 + GSC 扫一眼 + GA 扫一眼 + 线上 200。
