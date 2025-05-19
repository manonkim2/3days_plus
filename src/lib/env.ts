export const getSiteEnv = () => process.env.NEXT_PUBLIC_SITE_ENV

export const isProd = getSiteEnv() === 'prod'
export const isLocal = getSiteEnv() === 'local'
