export const StorageUtils = {
    setLocalItem: (key: string, value: string): void => {
        localStorage.setItem(key, value);
    },
    getLocalItem: (key: string): string | null => {
        return localStorage.getItem(key);
    },
    removeLocalItem: (key: string): void => {
        localStorage.removeItem(key);
    },
    setSessionItem: (key: string, value: string): void => {
        sessionStorage.setItem(key, value);
    },
    getSessionItem: (key: string): string | null => {
        return sessionStorage.getItem(key);
    },
    removeSessionItem: (key: string): void => {
        sessionStorage.removeItem(key);
    },
    setCookie: function (cname: string, cvalue: string, second: number) {
        var d = new Date();
        d.setTime(d.getTime() + (second * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getCookie: function (cname: string) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    },
    removeCookie: function (cname: string) {
        document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
};
