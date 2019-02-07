// Cookies are always strings and must be converted to arrays in order to be manipulated in our javscript, which is done using the JSON.parse
// We then have to JSON.stringify to convert it back to a string otherwise it will not be stored in the cookie

// At the beginning of page load. Take what is in the cookies
// Get the info
// Put it into the same div types as songlist


function getCookie(name) {
    var c = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return c == null ? []: JSON.parse(c[2]); // If nothing in cookie return empty array, otherwise parse the cookie so that it returns an array of song objects
}


const storeCookie = function(trackID, songName, artistName) {
    var cookie = getCookie('trackhistory');
    const trackInfo = {'trackID': trackID, 'track': songName, 'artist': artistName}
    cookie.push(trackInfo);
// JSON.stringify truns the array to a string so that it may be stored in the cookie
    document.cookie = `trackhistory=${JSON.stringify(cookie)}`
}

// Add clear functionality
const clearCookie = function() {
    document.cookie = 'trackhistory=[]'
    $("#recentlyPlayed").empty();
}

