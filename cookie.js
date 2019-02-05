// Cookies are always strings and must be converted to arrays in order to be manipulated in our javscript, which is done using the JSON.parse
// We then have to JSON.stringify to convert it back to a string otherwise it will not be stored in the cookie

function getCookie(name) {
    var c = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return c ? c[2] : '';
}

let cookie = getCookie('trackhistory');
// JSON.parse turns the string into an array only if the cookie is not empty, otherwise it creates an empty array
cookie = cookie === "" ? [] : JSON.parse(cookie)

const cookieStore = function (trackID) {
    cookie.push(trackID);
// JSON.stringify truns the array to a string so that it may be stored in the cookie
    document.cookie = `trackhistory=${JSON.stringify(cookie)}`
}
