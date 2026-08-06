/** Planned codes re-check cadence after each Wiki sync. */
export const CODES_REFRESH_HOURS = 24;

/**
 * Next update = last checked date (noon local) + refresh hours.
 * Prefer explicit ISO datetime from frontmatter when present.
 */
export function getNextUpdateDate(
  lastChecked: string,
  explicitNext?: string | null,
  hours: number = CODES_REFRESH_HOURS,
): Date {
  if (explicitNext) {
    const d = new Date(explicitNext);
    if (!Number.isNaN(d.getTime())) return d;
  }
  // ISO date only → noon, then + hours
  const base = /^\d{4}-\d{2}-\d{2}$/.test(lastChecked)
    ? new Date(lastChecked + 'T12:00:00')
    : new Date(lastChecked);
  if (Number.isNaN(base.getTime())) {
    return new Date(Date.now() + hours * 60 * 60 * 1000);
  }
  return new Date(base.getTime() + hours * 60 * 60 * 1000);
}

export function formatNextUpdateLabel(d: Date): string {
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** Compact badge text, e.g. "Next update Aug 8 · 12:00 AM" */
export function formatNextUpdateBadge(d: Date): string {
  const date = d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const time = d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return `Next update ${date} · ${time}`;
}

export function isoFromNowPlusHours(hours: number = CODES_REFRESH_HOURS): string {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}
