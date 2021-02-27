import { createAction } from '@reduxjs/toolkit'
import { LOAD_ACCOUNT, LOAD_WEB3, LOAD_TOKEN } from './constants'

export const loadWeb3 = createAction(LOAD_WEB3)
export const loadAccount = createAction(LOAD_ACCOUNT)
export const loadToken = createAction(LOAD_TOKEN)
