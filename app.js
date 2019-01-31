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

$("#searchBtn").on("click", searchSpotify);