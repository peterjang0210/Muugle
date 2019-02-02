// const metaBlock = function (songName, artistName, albumName) {
//     const blockTemplate = $("<div>");
//     blockTemplate.append(`<h1 class="songName">Song: ${songName}</h1><h2 class="albumName">Album: ${albumName}<h2><h3 class="artistName">Artist: ${artistName}<h3>`);
//     $("p").append(blockTemplate);
//     console.log(blockTemplate);
// }

// const lyricsBlock = function (lyricsBody) {
//     const blockTemplate = $("<div>");
//     blockTemplate.append(`<p class="lyricsBody">Lyrics:<p class"lyricsBody">${lyricsBody}</p></p>`);
//     $("p").append(blockTemplate);
//     console.log(blockTemplate);
// }


// const infoPull = function (name) {

//     //temp testing url
//     const domainURL = `https://api.genius.com`;
//     const trackListEP = `/search?q=${name}&access_token=h-ekdFJHN-7FvdhejCym_JwHF96ugsaz41cHDfwAQBrtkHqLPV9NepE0aAnPPalu`;

//     $.ajax({
//         url: `${domainURL}${trackListEP}`,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);
//         const dataStart = response.response.hits[0].result;
//         //get meta
//         const songName = dataStart.title_with_featured;
//         const artistName = dataStart.primary_artist.name;
//         console.log(artistName);
//         console.log(songName);

//         //get album
//         $.ajax({
//             url: `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=bc5ef36457edb15455aad8c84e027791&artist=${artistName}&track=${songName}&format=json`,
//             method: "GET"
//         }).then(function(response){
//             console.log(response);
//             const albumName = response.track.album.title;
//             //create meta block
//             metaBlock(songName, artistName, albumName);
//         })

        
//         //get lyrics
//         $.ajax({
//             url: `https://api.lyrics.ovh/v1/${artistName}/${songName}`,
//             method: "GET"
//         }).then(function (response) {
//             //create lyrics block
//             lyricsBlock(response.lyrics);
//         })
//     })
// }

// //testing area

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

// infoPull("never gonna give you up");

// // $("#testButton").on("click", testEmpty);

