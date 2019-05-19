import Storage from 'web-storage-cache';

const localStorage = new Storage();

// 四个基本方法
export const getLocalStorage = key => localStorage.get(key);
export const setLocalStorage = (key, value, expire = 7 * 24 * 3600) => localStorage.set(key,
  value, {
    exp: expire
  });

export const removeLocalStorage = key => localStorage.delete(key);
export const clearLocalStorage = () => localStorage.clear();


// 封装电子书方法，存在多种电子书不同设置的可能
export function getBookObj(fileName, key) {
  const info = getLocalStorage(`${fileName}--info`);
  return info ? info[key] : null;
}

export function setBookObj(fileName, key, value) {
  const book = getLocalStorage(`${fileName}--info`) || {};
  book[key] = value;
  setLocalStorage(`${fileName}--info`, book);
}

// 字体大小
export const getFontSize = fileName => getBookObj(fileName, 'fontSize');
export const setFontSize = (fileName, fontSize) => setBookObj(fileName, 'fontSize', fontSize);

// 字体
export const getFontFamily = fileName => getBookObj(fileName, 'fontFamily');
export const setFontFamily = (fileName, fontFamily) => setBookObj(fileName, 'fontFamily',
  fontFamily);

// 主题
export const getTheme = fileName => getBookObj(fileName, 'theme');
export const setTheme = (fileName, theme) => setBookObj(fileName, 'theme', theme);

// 国际化语言
export const getLocale = () => getLocalStorage('locale');
export const setLocale = locale => setLocalStorage('locale', locale);

// 进度
export const getLocation = fileName => getBookObj(fileName, 'location');
export const setLocation = (fileName, location) => setBookObj(fileName, 'location', location);

// 阅读时间
export const getReadTime = fileName => getBookObj(fileName, 'readTime');
export const setReadTime = (fileName, readTime) => setBookObj(fileName, 'readTime', readTime);
