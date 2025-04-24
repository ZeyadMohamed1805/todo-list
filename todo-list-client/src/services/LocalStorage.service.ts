export const setLocalStorageItem = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorageItem = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

export const removeLocalStorageItems = (keys: string[]) => {
    keys.forEach(key => {
        localStorage.removeItem(key);
    });
}
