# Cloudflare Pages 构建配置

## 报错：`Output directory "dist" not found`

含义：Dashboard 里 **Build command 为空**，跳过了 `npm run build`，仓库根目录没有现成的 `dist/`。

### 必填（Workers & Pages → 项目 → Settings → Builds）

| 设置 | 值 |
|------|-----|
| **Framework preset** | Astro（或 None） |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | *(留空)* |
| **Deploy command** | *(留空，默认即可)* |

### 环境变量（Settings → Environment variables → Production）

| Name | Value |
|------|--------|
| `NODE_VERSION` | `22` |
| `SITE` | `https://animevanguards.co` |

保存后：**Deployments → Retry deployment**，或再 push 一次 `main`。

### 正确日志应包含

```text
Executing user command: npm run build
...
[@astrojs/sitemap] sitemap-index.xml created
...
Success: Build output directory "dist" found
```

---

## 与 GitHub Actions 双部署

仓库里有 `.github/workflows/deploy-cloudflare.yml`（`npm run build` + `wrangler pages deploy`）。

任选其一，避免双重构建：

| 方案 | 做法 |
|------|------|
| **A. 只用 CF Git** | 填好上面 Build 设置；可关掉 Actions workflow |
| **B. 只用 GitHub Actions** | 保留 Actions；CF 里关掉 Git 自动构建 / 或 Build 保持正确也能共存但会建两次 |

---

## 自定义域名

Pages → Custom domains：`animevanguards.co` / `www` → Active  
DNS：CNAME `@` 与 `www` → `anime-vanguards-guides.pages.dev`（橙云）
