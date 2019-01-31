const spotifyAPI = function () {
    const index1 = window.location.hash.indexOf("=") + 1;
    const index2 = window.location.hash.indexOf("&");
    const accessToken = window.location.hash.substring(index1, index2);
    
    $.ajax({
        url: "https://api.spotify.com/v1/search?q=Drake&type=artist",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            console.log(response);
        }
    })
}