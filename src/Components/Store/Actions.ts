import {createAction} from "@reduxjs/toolkit";

export const att = createAction('users/addLoad')

export const incCountt = createAction<{go:number}>('users/incCount')