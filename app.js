const searchSpotify = function () {
    const userInput = $("#searchBar").val().trim();
    if (userInput.includes(",")) {
        const trackName = userInput.substring(0, userInput.indexOf(","));
        const artistName = userInput.substring(userInput.indexOf(",") + 1);
        spotifyAPI(trackName, artistName);
    }
    else{
        const trackName = userInput;
        const artistName = "";
        spotifyAPI(trackName, artistName);
    }
}

$("#searchBtn").on("click", searchSpotify);