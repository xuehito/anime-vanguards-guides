# Cloudflare 部署（仅 Pages 连接 Git）

本仓库 **不再使用 GitHub Actions 部署**。  
部署方式：Cloudflare Pages 连接 GitHub，push 到 `main` 后由 CF 自动构建。

## Pages 构建设置（Dashboard）

| 项 | 值 |
|----|-----|
| Production branch | `main` |
| Framework preset | Astro 或 None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/`（仓库根） |
| Environment variable `NODE_VERSION` | `22` |
| Environment variable `SITE` | `https://animevanguards.co` |

## 自定义域名 animevanguards.co

### 现象：域名打不开 / 不是站点内容

常见原因：**域名 DNS 仍在注册商（如 Spaceship），没有正确指到 Cloudflare Pages**。

- `*.pages.dev` 能开 = 站点本身正常  
- 自定义域名打不开 / 打开是注册商停放页 = **DNS 未指对**

### 做法 A（推荐）：Nameserver 接到 Cloudflare

1. Cloudflare Dashboard → **添加站点** `animevanguards.co`（若还没有 Zone）
2. 选用 Free 计划，CF 给出两个 nameserver（如 `xxx.ns.cloudflare.com`）
3. 到 **Spaceship（或你买域名的地方）** → 域名 → DNS / Nameservers  
   → 改为 Cloudflare 提供的 NS（去掉 `launch1.spaceship.net` 等）
4. 等 NS 生效（几分钟到 48 小时，通常很快）
5. Pages → 项目 → **Custom domains** → 添加 `animevanguards.co`（及可选 `www`）  
   CF 会在该 Zone 里自动写好 DNS + SSL

### 做法 B：DNS 仍放在 Spaceship（不改 NS）

在 Spaceship DNS 面板按 Cloudflare Pages 自定义域名页面提示添加记录，通常类似：

| 类型 | 名称 | 目标 |
|------|------|------|
| CNAME | `www` | `anime-vanguards-guides.pages.dev` |
| CNAME 或 ALIAS | `@`（根域名） | `anime-vanguards-guides.pages.dev` |

注意：

- 很多注册商 **根域名不能 CNAME**，需用 ALIAS / ANAME / CNAME Flattening  
- Spaceship 若只支持 A 记录，以 **Cloudflare Pages → Custom domain 详情页** 显示的记录为准  
- 删掉指向停放页 / 默认页的旧 A 记录，避免冲突  
- SSL 由 Cloudflare 签发，DNS 生效后 Active 才会变绿

### 验证

```bash
# NS 应变成 cloudflare（做法 A）或确认 CNAME 目标正确（做法 B）
dig animevanguards.co NS +short
dig www.animevanguards.co CNAME +short

# 站点
curl -I https://animevanguards.co
curl -I https://anime-vanguards-guides.pages.dev
```

## 本地手动预览（可选）

```bash
npm run build
npx wrangler pages dev dist
```

不再需要仓库 Secrets：`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`（可删掉，不影响 Pages Git 构建）。
