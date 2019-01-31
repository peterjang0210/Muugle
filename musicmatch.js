const metaBlock = function (songName, artistName, albumName) {
    const blockTemplate = $("<div>");
    blockTemplate.append(`<h1 class="songName">${songName}</h1><h2 class="albumName">${albumName}<h2><h3 class="artistName">${artistName}<h3>`);
    $(".artistInfo").append(blockTemplate);
}

const lyricsBlock = function (lyricsBody) {
    const blockTemplate = $("<div>");
    blockTemplate.append(`<p class="lyricsBody">${lyricsBody}</p>`);
    $(".artistInfo").append(blockTemplate);
}



const infoPull = function (name/*,artist*/) {

    const domainURL = `http://api.musixmatch.com/ws/1.1`;
    const trackListEP = `/track.search?q_track=${name}&apikey=c480c2776b141e05a35b7a8b9f54c769`;
    
    // refined by artist name version
    // const trackListEP = `/track.search?q_track=${name}&q_artist=${artist}&apikey=c480c2776b141e05a35b7a8b9f54c769`;

    $.ajax({
        url: `${domainURL}${trackListEP}`,
        method: "GET"
    }).then(function (response) {
        const dataStart = response.message.body.trackList[0].track;
        const trackID = dataStart.track_id;
        const lyricsEP = `/track.lyrics.get?track_id=${trackID}`
        //get meta
        const songName = dataStart.track_name;
        const artistName = dataStart.artist_name;
        const albumName = dataStart.album_name;

        metaBlock(songName, artistName, albumName);

        //get lyrics
        $.ajax({
            url: `${domainURL}${lyricsEP}`,
            method: "GET"
        }).then(function (response) {
            const dataStart = response.message.body.lyrics;
            lyricsBlock(dataStart.lyrics_body);
        })
    })
}

//testing area

const render = function() {
    event.preventDefault;
    const searchInput = $(".form-control").val();
    $(".artistInfo").empty();
    infoPull(searchInput);
}

$("#testButton").click(render);


