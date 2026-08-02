# Cloudflare 自动化部署清单

仓库已包含 GitHub Actions：推送 `main` 即部署到 Cloudflare Pages 项目 **`anime-vanguards-guides`**。

## 你需要准备的 2 个 Secret

| Secret | 获取位置 |
|--------|----------|
| `CLOUDFLARE_API_TOKEN` | [API Tokens](https://dash.cloudflare.com/profile/api-tokens) → Create Token |
| `CLOUDFLARE_ACCOUNT_ID` | Dashboard 任意页面右侧 **Account ID** |

推荐 Token 权限：使用 **Edit Cloudflare Workers** 模板即可（含 Pages 部署）。

## 写入 GitHub（终端）

```bash
gh secret set CLOUDFLARE_API_TOKEN -R xuehito/anime-vanguards-guides
# 粘贴 token 后回车

gh secret set CLOUDFLARE_ACCOUNT_ID -R xuehito/anime-vanguards-guides
# 粘贴 account id 后回车
```

或在网页：  
https://github.com/xuehito/anime-vanguards-guides/settings/secrets/actions

## 首次创建 Pages 项目（可选）

```bash
npx wrangler login
npx wrangler pages project create anime-vanguards-guides --production-branch=main
```

若跳过，第一次 Actions 部署时 Wrangler 通常也会创建项目。

## 触发部署

- 推送到 `main`（自动）
- 或 GitHub → Actions → **Deploy Cloudflare Pages** → Run workflow

## 绑定域名 animevanguards.co

1. 域名 DNS 接入 Cloudflare（Nameservers 指向 CF）
2. Pages → `anime-vanguards-guides` → **Custom domains** → 添加 `animevanguards.co`（及可选 `www`）
3. 等 SSL 生效后访问 https://animevanguards.co

## 检查是否成功

- Actions: https://github.com/xuehito/anime-vanguards-guides/actions  
- Pages: Cloudflare Dashboard → Workers & Pages → `anime-vanguards-guides`  
- 默认预览域名形如：`https://anime-vanguards-guides.pages.dev`
