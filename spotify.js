//breaks user input into strings that can be input into Spotify API Calls
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

//function to parse Access Token in url
const parseAccessToken = function () {
    const index1 = window.location.hash.indexOf("=") + 1;
    const index2 = window.location.hash.indexOf("&");
    const accessToken = window.location.hash.substring(index1, index2);
    return accessToken;
}

//API call to Spotify to get tracks related to the search term
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

//API call to Spotify to get artists related to the search term
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

//API call to Spotify to get playlists in user's account
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

//call to render queried tracks from API call in formatted table along with add and delete buttons
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
        $(".songList").append(
            `<tr>
            <td data-trackID="${infoList[i].trackID}" class="playSong align-middle">
                <p>Song: ${infoList[i].track}</p>
                <p>Artist: ${infoList[i].artist}</p>
            </td>
            <td data-uri="${infoList[i].uri}" class="addToPlaylist align-middle">
                Add
            </td>
            <td data-uri="${infoList[i].uri}" class="deleteFromPlaylist align-middle">
                Delete
            </td>
        </tr>`);
    }
}

//call to render queried artists from API call in formatted table
const renderArtist = function (response) {
    $(".songList").empty();
    infoList.length = 0;
    const artistArray = response.artists.items;;
    for (let i = 0; i < artistArray.length; i++) {
        infoList.push({
            artist: artistArray[i].name,
            artistID: artistArray[i].id
        })
        $(".songList").append(`<tr>
        <td id="${infoList[i].artistID}" class="align-middle">Artist: ${infoList[i].artist}</td></tr>`);
        $(`#${infoList[i].artistID}`).on('click', playPlaylist);
    }
}

//renders buttons with playlist names
const renderPlaylists = function (response) {
    $(".playlist").empty();
    for (let i = 0; i < response.items.length; i++) {
        $(".playlist").prepend(`<button data-playlistID="${response.items[i].id}" class="addPlaylist btn-light">${response.items[i].name}</button>`);
    }
}

//render selected playlist
const embedPlaylist = function () {
    playlistID = $(this).attr("data-playlistID");
    $(".playlist").html(`<iframe src="https://open.spotify.com/embed/playlist/${playlistID}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`);
}

//debounces clicks to display playlist within 5 seconds
const delayDisplay = function () {
    _.debounce(setTimeout(function(){
        $(".playlist").html(`<iframe src="https://open.spotify.com/embed/playlist/${playlistID}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`);
    }, 30000), 5000);
}

//adds selected song to the playlist
const addToPlaylist = function () {
    const trackURI = $(this).attr("data-uri").replace(":", "%3A").replace(":", "%3A");
    const accessToken = parseAccessToken();
    $.ajax({
        url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${trackURI}`,
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function () {
            delayDisplay();
        }
    })
}

//deletes selected song from the playlist
const deleteFromPlaylist = function () {
    const trackURI = $(this).attr("data-uri");
    const accessToken = parseAccessToken();
    $.ajax({
        url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        method: "DELETE",
        data: JSON.stringify({
            tracks: [{ uri: trackURI }]
        }),
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        success: function () {
            delayDisplay();
        }
    })
}

//makes API call to get userID
const getUserID = function () {
    const accessToken = parseAccessToken();
    $.ajax({
        url: "https://api.spotify.com/v1/me",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            createPlaylist(response);
        }
    })
}

//creates a playlist with the name given by the user input
const createPlaylist = function (response) {
    const accessToken = parseAccessToken();
    const playlistName = $("#newPlaylist").val();
    const userID = response.id;
    $.ajax({
        url: `https://api.spotify.com/v1/users/${userID}/playlists`,
        method: "POST",
        data: JSON.stringify({
            "name": `${playlistName}`
        }),
        processData: false,
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    })
    $("#newPlaylist").val("");
}

//embeds a player with the selected song, passes info to musicmatch.js for meta information and lyrics, and passes info to cookie.js
const playSong = function () {
    const trackID = $(this).attr("data-trackID");
    $('.spotifyPlayer').empty();
    $(".spotifyPlayer").append(`<iframe id="spotify-player" src="https://open.spotify.com/embed/track/${trackID}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`);
    const accessToken = parseAccessToken();
    $.ajax({
        url: `https://api.spotify.com/v1/tracks/${trackID}`,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        method: "GET",
        success: function (response) {
            const songName = response.name;
            const artistName = response.artists[0].name;
            infoPull(songName, artistName);
            storeCookie(trackID, songName, artistName);
        }
    })
}

//embeds playlist with popular songs of the selected artist
const playPlaylist = function () {
    $('.spotifyPlayer').empty();
    $(".spotifyPlayer").append(`<iframe src="https://open.spotify.com/embed/artist/${this.id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`);
}

//click events
$("#searchBtn").on("click", searchSpotify);
$("#createBtn").on("click", getUserID);
$("#displayBtn").on("click", queryPlaylist);
$(`.songList`).on('click', ".playSong", playSong);
$(`.songList`).on('click', ".addToPlaylist", addToPlaylist);
$(".songList").on("click", ".deleteFromPlaylist", deleteFromPlaylist);
$(`.playlist`).on("click", ".addPlaylist", embedPlaylist);
$(`#recentlyPlayed`).on('click', ".playSong", playSong);