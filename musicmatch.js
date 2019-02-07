//create and append dom object containing:       . . .  to container with id = metaInfo  (styled)
// h1 tag containing song name with class = songName
// h2 tag containing album name with class = albumName
// h3 tag containing artist name with class = artistName
const metaBlock = function (songName, artistName, albumName) {
    const blockTemplate = $("<div>");
    blockTemplate.append(`<h1 class="songName">Song: ${songName}</h1><h2 class="albumName">Album: ${albumName}<h2><h3 class="artistName">Artist: ${artistName}<h3>`);
    $("#metaInfo").html(blockTemplate);
}

//create and append dom object containing:       . . .  to container with id = lyricsBlock   (styled)
// p tag containing section title "Lyrics: " with class = lyricsSection
// p tag containing lyrics of song with class = lyricsBody
const lyricsBlock = function (lyricsBody) {
    const blockTemplate = $("<div>");
    blockTemplate.append(`<p class="lyricsSection">Lyrics:<p class="lyricsBody">${lyricsBody}</p></p>`);
    $("#lyricsBlock").html(blockTemplate);
}


//fetch data from lastfm and lyrics.ovh apis and call respective functions   (false states included)
const infoRefine = function (songName, artistName) {
    // get album info
    $.ajax({
        url: `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=bc5ef36457edb15455aad8c84e027791&artist=${artistName}&track=${songName}&format=json`,

        method: "GET",
        success: function (response) {
            if (response.message == "Track not found") {
                metaBlock(songName, artistName, "No album info found");
            }
            else if (response.track.album != undefined) {
                const albumName = response.track.album.title;
                metaBlock(songName, artistName, albumName);
            } else {
                metaBlock(songName, artistName, "No album info found");
            }
        },
        error: function() {
            metaBlock("Track not found", "Artist not found", "No album info found");

        }
    })

    //get lyrics
    $.ajax({
        url: `https://api.lyrics.ovh/v1/${artistName}/${songName}`,
        method: "GET",
        success: function (response) {
            // formatting response by encoding string into URI, replacing newline symbol with line break tag to display lyrics in a readable manner, decode the result to get rid of excess encoded symbols
            const lyrics = decodeURI(encodeURI(response.lyrics).replace(/%0A/g, "<br/>"));
            lyricsBlock(`${lyrics}`);
        },
        error: function () {
            lyricsBlock("No lyrics available");
        }
    })
}

// function called by spotify.js, taking in song and artist information on button presses. also responsible for parsing arguments into correct formats(requires constant maintanence for now)
const infoPull = function (song, artist) {

    // parsing area
    const songName = song.replace(/’/g, "'");
    const artistName = artist.replace(/’/g, "'");

    // feed parsed data into infoRefine
    infoRefine(songName, artistName);
}



//testing and legacy/backup area

// // const render = function (event) {
// //     event.preventDefault();
// //     const searchInput = $(".textInput").val();
// //     $(".artistInfo").empty();
// //     infoPull(searchInput);
// // }

// // const testEmpty = function (event) {
// //     // event.preventDefault();
// //     $("#metaLyrics").empty();
// // }

// infoPull("sweet child o' mine", "guns n' roses");

// // $("#testButton").on("click", testEmpty);


//legacy genius code
// const infoPull = function (song, artist) {

//     //temp testing url
//     const domainURL = `https://api.genius.com`;
//     const trackListEP = `/search?q=${song}&access_token=h-ekdFJHN-7FvdhejCym_JwHF96ugsaz41cHDfwAQBrtkHqLPV9NepE0aAnPPalu`;

//     $.ajax({
//         url: `${domainURL}${trackListEP}`,
//         method: "GET"
//     }).then(function (response) {
//         let index = 0;
//         let dataStart = response.response.hits[index].result;
//         const parseStart = response.response.hits;
//         for(i=0; i< parseStart.length; i++) {
//             if(song.toUpperCase() == parseStart[i].title.toUpperCase() && artist.toUpperCase() == artist) {
//                 index = i;
//             }
//         }

//         //get meta
//         const songName = dataStart.title.replace(/’/g, "'");
//         const artistName = dataStart.primary_artist.name.replace(/’/g, "'");
//         // const songName = song;
//         // const artistName = artist;



//         //get album
//         infoRefine("", artistName)
//     })
// }
