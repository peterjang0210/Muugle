const spotifyAPI = function (track, artist) {
    const index1 = window.location.hash.indexOf("=") + 1;
    const index2 = window.location.hash.indexOf("&");
    const accessToken = window.location.hash.substring(index1, index2);
    let queryURL = "";

    if(track !== "" && artist === ""){
        queryURL = `https://api.spotify.com/v1/search?q=${track}&type=track`;
    }
    else if(track === "" && artist !== ""){
        queryURL = `https://api.spotify.com/v1/search?q=${artist}&type=artist`;
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
        }
    })
}