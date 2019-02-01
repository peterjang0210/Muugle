const searchSpotify = function () {
    const userInput = $("#searchBar").val().trim();
    if (userInput.includes(",")) {
        if(userInput.substring(0, userInput.indexOf(",")).length > 1){
            const trackName = userInput.substring(0, userInput.indexOf(","));
            const artistName = userInput.substring(userInput.indexOf(",") + 1);
            queryTrack(trackName, artistName);
            $('#searchBar').val("");
        }
        else{
            const artistName = userInput.substring(1);
            queryArtist(artistName);
            $('#searchBar').val("");
        }
    }
    else{
        const trackName = userInput;
        const artistName = "";
        queryTrack(trackName, artistName);
        $('#searchBar').val("");
    }
}

const accessPlaylist = function () {
    const index1 = window.location.hash.indexOf("=") + 1;
    const index2 = window.location.hash.indexOf("&");
    const accessToken = window.location.hash.substring(index1, index2);

    $.ajax({
        url: "https://api.spotify.com/v1/me/playlists",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            console.log(response);
        }
    })
}

$("#addBtn").on("click", accessPlaylist);
$("#searchBtn").on("click", searchSpotify);
