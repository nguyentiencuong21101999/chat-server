import { TransformFnParams } from 'class-transformer'

/** Transform 0/1 to true/false */
export const ToBoolean = (param: TransformFnParams) => {
    if (param.value === 1) {
        return true
    } else if (param.value == 0) {
        return false
    }
    return param.value
}

/** Transform path to full location url */

/** Transform to trim text */
export const ToTrim = (param: TransformFnParams) =>
    (param?.value as string)?.trim()

export const genFullName = (fn: string, mn: string, ln: string) => {
    const names = [fn]
    if (mn != null && mn != '') {
        names.push(mn)
    }
    names.push(ln)
    return names.join(' ')
}
