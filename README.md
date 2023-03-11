# Coding Night 2023

A simple guessing game that picks random YouTube videos and asks you how many
views you think the video has.

The project consists of two parts:

* a backend, that gets information of a random YouTube video after receiving a
  http GET request on `localhost:6969?seed=ejhsgjk4&index=0`. The `seed` is the
  starting point of the game and `index` is the video of the current round.
  Players with the same seed will get the same sequence of videos.

* the frontend, which displays the game UI
