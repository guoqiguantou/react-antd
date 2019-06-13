export const localSave = (key, value) => {
    localStorage.setItem(key, value)
}

export const localRead = (key) => {
    return localStorage.getItem(key) || ''
}

/**
 * 主题
 */
export const setThemeLocalstorage = theme => {
    localStorage.theme = JSON.stringify(theme)
}

export const getThemeLocalstorage = () => {
    const theme = localStorage.theme
    return theme ? JSON.parse(theme) : ''
}
/**
 * 语言
 */
export const setLanguageLocalstorage = language => {
    localStorage.language = JSON.stringify(language)
}

export const getLanguageLocalstorage = () => {
    const language = localStorage.language
    return language ? JSON.parse(language) : ''
}

/**
 * @description 用户信息
 */
export const setUserInLocalstorage = list => {
    localStorage.userInfo = JSON.stringify(list)
}
export const getUserFromLocalstorage = () => {
    const list = localStorage.userInfo
    return list ? JSON.parse(list) : {}
}

/**
 * @description 选项卡
 */
export const setTabNavListLocalstorage = list => {
    localStorage.tabnavlist = JSON.stringify(list)
}
export const getTabNavListLocalstorage = () => {
    const list = localStorage.tabnavlist
    return list ? JSON.parse(list) : null
}

// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60)
            }
        )
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil(difference / duration * 50)

    const scroll = (start, end, step) => {
        if (start === end) {
            endCallback && endCallback()
            return
        }

        let d = (start + step > end) ? end : start + step
        if (start > end) {
            d = (start - step < end) ? end : start - step
        }

        if (el === window) {
            window.scrollTo(d, d)
        } else {
            el.scrollTop = d
        }
        window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
}