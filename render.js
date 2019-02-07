// Put each object into a button
const renderCookie = function() { 
let cookie = getCookie('trackhistory');
    $("#recentlyPlayed").empty();
    for (var i in cookie) {
        $("#recentlyPlayed").prepend(
            `<tr>
            <td data-trackID="${cookie[i].trackID}" class="playSong recentlyPlayedBtn align-middle">
                <p>Song: ${cookie[i].track}</p>
                <p>Artist: ${cookie[i].artist}</p>
            </td>
        </tr>`);
    }
}

window.onload = renderCookie();
