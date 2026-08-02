# Domain & DNS (animevanguards.co)

## Target

- Production: `https://animevanguards.co`
- Pages project: `anime-vanguards-guides`
- Pages host: `anime-vanguards-guides.pages.dev`

## DNS records (Cloudflare Zone)

| Type | Name | Content | Proxy |
|------|------|---------|--------|
| CNAME | `@` | `anime-vanguards-guides.pages.dev` | Proxied (orange) |
| CNAME | `www` | `anime-vanguards-guides.pages.dev` | Proxied |

Also required: **Pages → Custom domains** includes apex (and www).

Nameservers at registrar (e.g. Spaceship) must be Cloudflare NS only.

## Diagnostics

```bash
dig @1.1.1.1 animevanguards.co NS +short
dig @1.1.1.1 animevanguards.co A +short
dig @8.8.8.8 animevanguards.co NS +short
curl -sI --max-time 15 https://anime-vanguards-guides.pages.dev/ | head -15
curl -sI --max-time 15 https://animevanguards.co/ | head -15
```

Local `198.18.x` resolution = proxy Fake-IP; retest without proxy or use mobile data.

## API (optional; token in env only)

```bash
export CLOUDFLARE_API_TOKEN='...'
export CLOUDFLARE_ACCOUNT_ID='...'

ZONE_ID=$(curl -s "https://api.cloudflare.com/client/v4/zones?name=animevanguards.co" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  | python3 -c "import sys,json; r=json.load(sys.stdin); print(r['result'][0]['id'])")

curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"type":"CNAME","name":"animevanguards.co","content":"anime-vanguards-guides.pages.dev","proxied":true,"ttl":1}'

curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"type":"CNAME","name":"www","content":"anime-vanguards-guides.pages.dev","proxied":true,"ttl":1}'

curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/anime-vanguards-guides/domains" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"name":"animevanguards.co"}'
```

If record already exists, API returns error — list/patch instead of blind create.
