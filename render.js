var cookie = getCookie('trackhistory');

console.log(cookie[1].trackID)

// Put each object into a button
for (var i in cookie) {
    $("#recentlyPlayed").append(`
    <div class="btn-group">
        <button data-trackID="${cookie[i].trackID}" class="playSong btn-light">
        <p>Song:${cookie[i].track}</p>
        <p>Artist:${cookie[i].artist}</p></button>
        <button data-uri="${cookie[i].uri}" class="addToPlaylist btn-light">Add</button><button data-uri="${cookie[i].uri}" class="deleteFromPlaylist btn-light">Delete</button>
    </div>
    `);
}
// On button click append iframe to player