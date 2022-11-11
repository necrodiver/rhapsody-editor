/**
 * 类型判定，可判定当前参数是否符合对应的类型
 * @param { * } val 参数
 * @param { String } type 目标类型
 * @returns 判定结果，true/false
 */
function isType(val, type) {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
}

/**
 * 深拷贝，把当前元素深度复制一份
 * @param { object } val 需要拷贝的数据
 * @returns 拷贝之后的数据
 */
function cloneDeep(val) {
    function cloneCopy(obj, hash = new WeakMap()) {
        if (obj === null || obj === undefined) return obj;
        if (isType(obj, 'Date')) return new Date(obj);
        if (isType(obj, 'RegExp')) return new RegExp(obj);
        if (!isType(obj, 'Object') && !Array.isArray(obj)) return obj;
        if (hash.get(obj)) return hash.get(obj);
        let cloneObj = new obj.constructor();
        hash.set(obj, cloneObj);
        for (let key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                cloneObj[key] = cloneDeep(obj[key], hash);
            }
        }
        return cloneObj;
    }
    return cloneCopy(val);
}
/**
 * 生成一串随机字符串（包括数字和大小写字母）
 * @param { Number } len 生成的随机数长度
 * @returns 返回生成的随机字符串
 */

function random(len) {
    const baseStr =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const baseStrLen = baseStr.length;
    let result = '';
    while (len) {
        result += baseStr[Math.floor(Math.random() * baseStrLen)];
        len--;
    }
    return result;
}
/**
 * 组件命名转换
 * @param { String } val 普通命名的组件，例如：aaa-bbb
 * @returns 转换后的命名 例如：AaaBbb，符合组件命名
 */
function componentNameTransform(val) {
    if (!val || !isType(val, 'String')) {
        return val;
    }
    return val
        .split('-')
        .map(txt => {
            if (txt) {
                return `${txt.charAt(0).toUpperCase()}${txt
                    .slice(1)
                    .toLowerCase()}`;
            }
            return txt;
        })
        .join('');
}

/**
 *
 * @param { object } val
 * @returns String 拼接的样式
 */
function transformStyle(val) {
    if (val && isType(val, 'Object') && Object.keys(val).length) {
        return Object.keys(val)
            .map(key => `${key}:${val[key]}`)
            .join(';');
    }
    return '';
}

/**
 * 节流函数
 * @param {Function} fn 方法
 * @param {Number} timeSpan 延迟时间
 * @returns
 */
function debounce(fn, timeSpan) {
    let timeId = null;
    return function () {
        if (timeId !== null) {
            clearTimeout(timeId);
            timeId = null;
        }
        const args = [...arguments];
        timeId = setTimeout(() => {
            fn.apply(this, args);
        }, timeSpan);
    };
}

export {
    isType,
    cloneDeep,
    random,
    componentNameTransform,
    transformStyle,
    debounce
};
