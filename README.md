# Music-Search-App

## About
Muugle is a music search application that takes advantage of [Spotify's API](https://developer.spotify.com/documentation/web-api/) to play songs and playlists directly on the page. It also displays information about the song and lyrics for the song that is currently being played using the API provided by [last.fm](https://www.last.fm/api) and [lyrics.ovh](https://lyricsovh.docs.apiary.io/#).

## Features
Once the user logs in to their spotify account, the user can search for songs or artists. This will retrieve 20 songs related to the search term that the user can play directly on the page. The user can also add or delete those songs to a playlist but in order to do so, the user must select a playlist first. The playlist can be selected and displayed by selecting the display playlist button. The user can also create a playlist for their spotify account on the page. When the create playlist button is pressed, an input field appears where the user can enter the name of the new playlist that they have just created.

The page also stores recently played songs in cookies so that the user can access them at a later time. The information about the song being played and the accompanying lyrics are displayed in a collapsable tab at the bottom of the page.

## Technologies Used
Framework: Bootstrap
APIs: Spotify, last.fm, lyrics.ovh
External javascript libraries: jQuery, lodash
New Technologies: OAuth in Spotify API, cookies to store recently played, lodash debounce method

## Future Developments
The true end goal of this application is to link other various music API's such as Apple Music and Soundcloud. The user will be able to create a playlist independent of those streaming platforms where they can add songs from any of the linked music streaming sources. Another feature that can be developed is the ability to view songs from similar genres and artists.