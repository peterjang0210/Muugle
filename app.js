const searchSpotify = function () {
    const userInput = $("#searchBar").val();
    const trackName = userInput.substring(0, userInput.indexOf(","));
    const artistName = userInput.substring(userInput.indexOf(",") + 1);
    spotifyAPI(trackName, artistName);
}

$("#searchBtn").on("click", searchSpotify);