import { createAction } from '@reduxjs/toolkit'
import { LOAD_ACCOUNT, LOAD_WEB3 } from './constants'

export const loadWeb3 = createAction(LOAD_WEB3)
export const loadAccount = createAction(LOAD_ACCOUNT)
