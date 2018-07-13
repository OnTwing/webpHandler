'use strict';

var supportLS = Date.now();
var noop = function () { }; 

try {
    localStorage.setItem(supportLS, supportLS);
    localStorage.removeItem(supportLS);
    supportLS = true;
} catch (e) {
    supportLS = false;
}

var localstorage = {
    getItem: (supportLS
        ? function (key) {
            return localStorage.getItem(key);
        } : noop),
    setItem: (supportLS
        ? function (key, value) {
            return localStorage.setItem(key, value);
        } : noop),
    removeItem: (supportLS
        ? function (key) {
            return localStorage.removeItem(key);
        } : noop)
}

export default {localstorage};