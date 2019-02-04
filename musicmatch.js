const metaBlock = function (songName, artistName, albumName) {
    const blockTemplate = $("<div>");
    blockTemplate.append(`<h1 class="songName">Song: ${songName}</h1><h2 class="albumName">Album: ${albumName}<h2><h3 class="artistName">Artist: ${artistName}<h3>`);
    $("#metaInfo").html(blockTemplate);
    console.log(blockTemplate);
}

const lyricsBlock = function (lyricsBody) {
    const blockTemplate = $("<div>");
    blockTemplate.append(`<p class="lyricsBody">Lyrics:<p class"lyricsBody">${lyricsBody}</p></p>`);
    $("#lyricsBlock").html(blockTemplate);
    console.log(blockTemplate);
}

const infoRefine = function (songName, artistName) {
    $.ajax({
        url: `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=bc5ef36457edb15455aad8c84e027791&artist=${artistName}&track=${songName}&format=json`,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        if (response.message == "Track not found"){
            metaBlock(songName, artistName, "No album info found");
        }
        else if (response.track.album != undefined) {
            const albumName = response.track.album.title;
            //create meta block
            metaBlock(songName, artistName, albumName);
        } else {
            metaBlock(songName, artistName, "No album info found");
        }

    })


    //get lyrics
    $.ajax({
        url: `https://api.lyrics.ovh/v1/${artistName}/${songName}`,
        method: "GET",
        success: function(response){
            const lyrics = decodeURI(encodeURI(response.lyrics).replace(/%0A/g, "<br/>"));
            lyricsBlock(`${lyrics}`);
        },
        error: function(){
            lyricsBlock("No lyrics available");
        }
    })
    // .then(function (response) {
    //     //create lyrics block
    //     if (response.error) {
    //         lyricsBlock("No lyrics available");
    //     } else {
    //         const lyrics = decodeURI(encodeURI(response.lyrics).replace(/%0A/g, "<br/>"));
    //         lyricsBlock(`${lyrics}`);
    //     }

    // })
}


const infoPull = function (song, artist) {


    //get meta
    const songName = song.replace(/’/g, "'");
    const artistName = artist.replace(/’/g, "'");

    //get album and lyrics info
    infoRefine(songName, artistName);
}

//testing and legacy area

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