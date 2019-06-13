import { CHANGETHEMESTYLE, CHANGETHEMECOLOR, FIXEDHEADER, FIXEDLEFT, CHANGELANGUAGE, ADDTABLIST, REMOVETABLIST, REMOVEOTHERTABLIST, REMOVEALLTABLIST } from '../actionType/app'

export const changeStyle = (style) => (
    {
        type: CHANGETHEMESTYLE,
        style: style
    }
)

export const changeColor = (color) => (
    {
        type: CHANGETHEMECOLOR,
        color: color
    }
)

export const fixedHeader = (bool) => (
    {
        type: FIXEDHEADER,
        bool: bool
    }
)
export const fixedLeft = (bool) => (
    {
        type: FIXEDLEFT,
        bool: bool
    }
)
export const changeLanguage = (language) => (
    {
        type: CHANGELANGUAGE,
        language: language
    }
)
export const addTablist = (list) => (
    {
        type: ADDTABLIST,
        list: list
    }
)
export const removeTablist = (list) => (
    {
        type: REMOVETABLIST,
        list: list
    }
)
export const removeOtherTablist = (path) => (
    {
        type: REMOVEOTHERTABLIST,
        path: path
    }
)
export const removeAllTablist = () => (
    {
        type: REMOVEALLTABLIST
    }
)
