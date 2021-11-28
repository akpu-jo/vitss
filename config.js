import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()

export const API = publicRuntimeConfig.PRODUCTION ? 'https://vitss.herokuapp.com/api' : 'http://localhost:8000/api'
export const APP_NAME = publicRuntimeConfig.APP_NAME
export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_PRO : publicRuntimeConfig.DOMAIN_DEV
export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID
