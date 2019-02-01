const searchSpotify = function (event) {
    event.preventDefault();
    const userInput = $("#searchBar").val().trim();
    if (userInput.includes(",")) {
        if (userInput.substring(0, userInput.indexOf(",")).length > 1) {
            const trackName = userInput.substring(0, userInput.indexOf(","));
            const artistName = userInput.substring(userInput.indexOf(",") + 1);
            queryTrack(trackName, artistName);
            $('#searchBar').val("");
        }
        else {
            const artistName = userInput.substring(1);
            queryArtist(artistName);
            $('#searchBar').val("");
        }
    }
    else {
        const trackName = userInput;
        const artistName = "";
        queryTrack(trackName, artistName);
        $('#searchBar').val("");
    }
}

const parseAccessToken = function () {
    const index1 = window.location.hash.indexOf("=") + 1;
    const index2 = window.location.hash.indexOf("&");
    const accessToken = window.location.hash.substring(index1, index2);
    return accessToken;
}

const queryTrack = function (track, artist) {
    const accessToken = parseAccessToken();
    let queryURL = "";

    if (artist === "") {
        queryURL = `https://api.spotify.com/v1/search?q=${track}&type=track`;
    }
    else {
        queryURL = `https://api.spotify.com/v1/search?q=${track}&type=track,artist`;
    }

    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            renderTrack(response);
        }
    })
}

const queryArtist = function (artist) {
    const accessToken = parseAccessToken();
    const queryURL = `https://api.spotify.com/v1/search?q=${artist}&type=artist`;

    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            renderArtist(response);
        }
    })
}

const queryPlaylist = function () {
    const accessToken = parseAccessToken();

    $.ajax({
        url: "https://api.spotify.com/v1/me/playlists",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            renderPlaylists(response);
        }
    })
}

const infoList = [];

const renderTrack = function (response) {
    $(".songList").empty();
    infoList.length = 0;
    const trackArray = response.tracks.items;
    for (let i = 0; i < trackArray.length; i++) {
        infoList.push({
            track: trackArray[i].name,
            artist: trackArray[i].artists[0].name,
            trackID: trackArray[i].id,
            uri: trackArray[i].uri
        })
        $(".songList").append(`<div class="btn-group">
        <button data-trackID="${infoList[i].trackID}" class="playSong">
        <p>Song:${infoList[i].track}</p>
        <p>Artist:${infoList[i].artist}</p></button>
        <button data-uri="${infoList[i].uri}" class="addToPlaylist">Add</button>`);
    }
}

const renderArtist = function (response) {
    $(".songList").empty();
    infoList.length = 0;
    const artistArray = response.artists.items;;
    for (let i = 0; i < artistArray.length; i++) {
        infoList.push({
            artist: artistArray[i].name,
            artistID: artistArray[i].id
        })
        $(".songList").append(`<button id="${infoList[i].artistID}"><p>Artist:${infoList[i].artist}</p></button>`);
        $(`#${infoList[i].artistID}`).on('click', playPlaylist);
    }
}

const renderPlaylists = function (response){
    for(let i = 0; i < response.items.length; i++){
        $("#playlist").prepend(`<button id="${response.items[i].id}">${response.items[i].name}</button>`);
        $(`#${response.items[i].id}`).on("click", embedPlaylist);
    }
}

const embedPlaylist = function () {
    $("#playlist").html(`<iframe src="https://open.spotify.com/embed/playlist/${this.id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`)
}

const addToPlaylist = function () {
    const trackURI = $(this).attr("data-uri").replace(":", "%3A").replace(":", "%3A");
    const accessToken = parseAccessToken();
    const playlistID = "5aetR4FSUQMjqNIjJnJVAa";
    $.ajax({
        url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${trackURI}`,
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

const playSong = function () {
    const trackID = $(this).attr("data-trackID");
    $('.spotifyPlayer').empty();
    $(".spotifyPlayer").append(`<iframe src="https://open.spotify.com/embed/track/${trackID}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`);
}

const playPlaylist = function () {
    $('.spotifyPlayer').empty();
    $(".spotifyPlayer").append(`<iframe src="https://open.spotify.com/embed/artist/${this.id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`);
}

$("#searchBtn").on("click", searchSpotify);
$("#addBtn").on("click", queryPlaylist);
$(`.songList`).on('click', ".playSong", playSong);
$(`.songList`).on('click', ".addToPlaylist", addToPlaylist);
