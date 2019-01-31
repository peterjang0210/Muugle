const metaBlock = function (songName, artistName, albumName) {
    const blockTemplate = $("<div>");
    blockTemplate.append(`<h1 class="songName">${songName}</h1><h2 class="albumName">${albumName}<h2><h3 class="artistName">${artistName}<h3>`);
    $(".aritstInfo").append(blockTemplate);
}

const lyricsBlock = function (lyricsBody) {
    const blockTemplate = $("<div>");
    blockTemplate.append(`<p class="lyricsBody">${lyricsBody}</p>`);
    $(".aritstInfo").append(blockTemplate);
}



const infoPull = function (name) {

    //temp testing url
    const domainURL = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1`;
    const trackListEP = `/track.search?q_track=${name}&apikey=c480c2776b141e05a35b7a8b9f54c769`;

    // refined by artist name version
    // const trackListEP = `/track.search?q_track=${name}&q_artist=${artist}&apikey=c480c2776b141e05a35b7a8b9f54c769`;

    $.ajax({
        url: `${domainURL}${trackListEP}`,
        method: "GET"
    }).then(function (response) {
        console.log(response);
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

const render = function (event) {
    event.preventDefault();
    const searchInput = $(".textInput").val();
    $(".artistInfo").empty();
    infoPull(searchInput);
}

const testEmpty = function (event) {
    // event.preventDefault();
    $("#metaLyrics").empty();
}

// infoPull("drake");

$("#testButton").on("click", testEmpty);


{/* <button class="button btn-primary" type="submit" id="testButton">test</button> */ }
{/* <input class="form-group" type="text" id="searchBar" placeholder="Search" aria-label="Search"> */ }


// const createCORSRequest = function (method, url) {
//     let xhr = new XMLHttpRequest();
//     if ("withCredentials" in xhr) {
//         xhr.open(method, url, true);
//     } else if (typeof XDomainRequest != "undefined") {
//         xhr = new XDomainRequest();
//         xhr.open(method, url);
//     } else {
//         xhr = null;
//     }
//     return xhr;

//     function getTitle(text) {
//         return text.match('<title>(.*)?</title>')[1];
//     }


//     function makeCorsRequest() {
//         // This is a sample server that supports CORS.
//         var url = 'http://api.musixmatch.com/ws/1.1/track.search?q_track=drake&q_artist=ultimate&apikey=c480c2776b141e05a35b7a8b9f54c769';

//         var xhr = createCORSRequest('GET', url);
//         console.log(xhr)
//         if (!xhr) {
//             alert('CORS not supported');
//             return;
//         }
//     }

//     // Response handlers.
//     xhr.onload = function () {
//         var text = xhr.responseText;
//         var title = getTitle(text);
//         console.log(title);
//         alert('Response from CORS request to ' + url + ': ' + title);
//     };

//     xhr.onerror = function () {
//         alert('Woops, there was an error making the request.');
//     };

//     xhr.send();
// }



