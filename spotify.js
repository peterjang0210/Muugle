const queryTrack = function (track, artist) {
    const index1 = window.location.hash.indexOf("=") + 1;
    const index2 = window.location.hash.indexOf("&");
    const accessToken = window.location.hash.substring(index1, index2);
    let queryURL = "";

    if(track !== "" && artist === ""){
        queryURL = `https://api.spotify.com/v1/search?q=${track}&type=track`;
    }
    else{
        queryURL = `https://api.spotify.com/v1/search?q=${track}&type=track,artist`;
    }

    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            console.log(response);
            render(response);
        }
    })
}

const queryArtist = function (artist){
    const index1 = window.location.hash.indexOf("=") + 1;
    const index2 = window.location.hash.indexOf("&");
    const accessToken = window.location.hash.substring(index1, index2);
    const queryURL = `https://api.spotify.com/v1/search?q=${artist}&type=artist`;

    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            console.log(response);
            render(response);
        }
    })
}

const infoList = [];

const render = function (response) {
    $(".songList").empty();
    infoList.length = 0;
    const trackArray = response.tracks.items;
    for (let i = 0; i < trackArray.length; i++){
        infoList.push({
            track: trackArray[i].name,
            artist: trackArray[i].artists[0].name,
            trackID: trackArray[i].id
        })
        $(".songList").append(`<button id="${infoList[i].trackID}"><p>Song:${infoList[i].track}</p>
        <p>Artist:${infoList[i].artist}</p></button>`);
        $(`#${infoList[i].trackID}`).on('click', playSong);
    }
}

const playSong = function () {
    $('.spotifyPlayer').empty();
    $(".spotifyPlayer").append(`<iframe src="https://open.spotify.com/embed/track/${this.id}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`);
}
