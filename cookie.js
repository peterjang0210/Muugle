const trackHistory = []
const cookieStore = function (trackID) {
    // everytime that we click track id it has to push to array
    trackHistory.push(trackID);
    console.log(trackHistory);
    
    document.cookie = `trackhistory=[${trackHistory}]`
}