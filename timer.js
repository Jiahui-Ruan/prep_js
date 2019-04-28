const log = (text) => {
    console.log(`Hi ${text}`);
}

const debounce = (func, delay) => {
    let inDebounce;
    return (...args) => {
        const context = this;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(
            () => func.apply(context, args),
            delay)
    }
}

const sleep = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

const logHandler = throttle(log, 3000);
logHandler("hey");
logHandler("hey");
logHandler("hey");
