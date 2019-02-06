var cookie = getCookie('trackhistory');

// Put each object into a button
for (var i in cookie) {
    $("#recentlyPlayed").append(
        `<tr>
        <td data-trackID="${cookie[i].trackID}" class="playSong recentlyPlayedBtn align-middle">
            <p>Song: ${cookie[i].track}</p>
            <p>Artist: ${cookie[i].artist}</p>
        </td>
    </tr>`);
}