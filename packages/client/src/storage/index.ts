import type { AppCtx } from '@/config'

const CTX_STORAGE_KEY = 'otab_app_context'

export const setCtxStorage = (ctx: AppCtx) => {
  localStorage.setItem(CTX_STORAGE_KEY, JSON.stringify(ctx))
}
export const getCtxStorage = (): AppCtx | null => {
  const ctx = localStorage.getItem(CTX_STORAGE_KEY)
  if (ctx) {
    return JSON.parse(ctx)
  }
  return null
}

export const clearCtxStorage = () => {
  localStorage.removeItem(CTX_STORAGE_KEY)
}
