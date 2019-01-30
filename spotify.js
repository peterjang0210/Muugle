const queryURL = "https://accounts.spotify.com/authorize?client_id=789d8e0f5720439eacbfb9d9c737bfac&redirect_uri=http://localhost:3000/&scope=user-read-private%20user-read-email&response_type=token&state=123";

const spotifyAPI = function () {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
}
