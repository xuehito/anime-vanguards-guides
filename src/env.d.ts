/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE?: string;
  readonly PUBLIC_ADS_ENABLED?: string;
  readonly PUBLIC_AD_MOBILE_320X50?: string;
  readonly PUBLIC_AD_BANNER_300X250?: string;
  readonly PUBLIC_AD_BANNER_728X90?: string;
  readonly PUBLIC_AD_BANNER_468X60?: string;
  readonly PUBLIC_AD_SIDEBAR_160X600?: string;
  readonly PUBLIC_AD_SIDEBAR_160X300?: string;
  readonly PUBLIC_AD_NATIVE_BANNER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
