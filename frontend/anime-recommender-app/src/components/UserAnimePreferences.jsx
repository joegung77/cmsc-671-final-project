import React, { useState, useEffect, useContext } from 'react';
import "../AnimeRecommender.css";
import LikeIcon from "../icons/thumbs_up.png";
import DislikeIcon from "../icons/thumbs_down.png";
import { UserAnimeDataContext } from '../UserAnimeData';

function UserAnimePreferences({next, back}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [animeList, setAnimeList] = useState([]);
  const [filteredAnimeList, setFilteredAnimeList] = useState([]);

  const { likedAnimes, setLikedAnimes } = useContext(UserAnimeDataContext);
  const { dislikedAnimes, setDislikedAnimes } = useContext(UserAnimeDataContext);
  const { likedAnimeNames, setLikedAnimeNames } = useContext(UserAnimeDataContext);
  const { dislikedAnimeNames, setDislikedAnimeNames } = useContext(UserAnimeDataContext);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/anime")
      .then((res) => res.json())
      .then((data) => setAnimeList(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredAnimeList(animeList)
    } else {
      const newAnimeList = animeList.filter(anime => 
        anime.name.toLowerCase().includes(search.toLowerCase()) || 
        anime.english_name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredAnimeList(newAnimeList);
      setCurrentPage(1)
    }
  }, [search, animeList])

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredAnimeList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredAnimeList.length / itemsPerPage);

  return (
    <div className="form">
      <h1>User Anime Preferences</h1>

      <p>Give a thumbs up or thumbs down for Animes you already like or dislike. If there are none, press 'Next' all the way at the bottom to continue</p>

      <div style={{
        display: "flex",
        alignItems: "center"
      }}>
        <p>
          Search:
        </p>

        <input
          type="text"
          placerholder="Search anime by title"
          value={search}
          style={{marginLeft: "20px"}}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      <ul>
        {currentItems.map((anime) => (
          <li key={anime.id} className="anime-list-item">

            {/* Like Button */}
            <button style={{
              outline: likedAnimes.includes(anime.id) ? "3px solid yellow" : "none"
            }} onClick={() => {
              const id = anime.id;
              const name = anime.name;

              if (likedAnimes.includes(id)) {
                // If anime is already liked, remove it from liked
                setLikedAnimes(previousLikedAnimes => previousLikedAnimes.filter(animeId => animeId !== id));
                setLikedAnimeNames(previousLikedAnimeNames => previousLikedAnimeNames.filter(animeName => animeName !== name));
              } else {
                setLikedAnimes([...likedAnimes, id]);
                setLikedAnimeNames([...likedAnimeNames, name]);

                // If anime is in disliked array, remove it since we added to liked
                if (dislikedAnimes.includes(id)) {
                  setDislikedAnimes(previousDislikedAnimes => previousDislikedAnimes.filter(animeId => animeId !== id));
                  setDislikedAnimeNames(previousDislikedAnimeNames => previousDislikedAnimeNames.filter(animeName => animeName !== name));
                }
              }
            }}>
              <img src={LikeIcon}/>
            </button>

            {/* Dislike Button */}
            <button style={{
              outline: dislikedAnimes.includes(anime.id) ? "3px solid yellow" : "none"
            }} onClick={() => {
              const id = anime.id;
              const name = anime.name;

              if (dislikedAnimes.includes(id)) {
                // If anime is already disliked, remove it from disliked
                setDislikedAnimes(previousDislikedAnimes => previousDislikedAnimes.filter(animeId => animeId !== id));
                setDislikedAnimeNames(previousDislikedAnimeNames => previousDislikedAnimeNames.filter(animeName => animeName !== name));
              } else {
                setDislikedAnimes([...dislikedAnimes, id]);
                setDislikedAnimeNames([...dislikedAnimeNames, name]);

                // If anime is in liked array, remove it since we added to disliked
                if (likedAnimes.includes(id)) {
                  setLikedAnimes(previousLikedAnimes => previousLikedAnimes.filter(animeId => animeId !== id));
                  setLikedAnimeNames(previousLikedAnimeNames => previousLikedAnimeNames.filter(animeName => animeName !== name));
                }
              }
            }}>
              <img src={DislikeIcon}/>
            </button>

            <img src={anime.image_url} alt={anime.name} style={{ width: "250px" }} />
            <div>
              <h2><u>{anime.name}</u></h2>
              <p><b>English Name:</b> {anime.english_name}</p>
              <p><b>Score:</b> {anime.score}</p>
              <p><b>Genres:</b> {anime.genres}</p>
              <p><b>Synopsis:</b> {anime.synopsis}</p>
              <p><b>Type:</b> {anime.type}</p>
              <p><b>Episodes:</b> {Math.round(anime.episodes)}</p>
              <p><b>Aired:</b> {anime.aired}</p>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ 
        marginTop: "20px",
        marginBottom:"20px"
      }}>

        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span style={{ margin: "10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

        <br/>
        <br/>

        {likedAnimeNames.length > 0 && (
          <div>
            <b>Liked Animes:</b>
            <ul>
              {likedAnimeNames.map((animeName) => (
                <p>{animeName}</p>
              ))}
            </ul>
          </div>
        )}


        <br/>
        <br/>

        {dislikedAnimeNames.length > 0 && (
          <div>
            <b>Disliked Animes:</b>
            <ul>
              {dislikedAnimeNames.map((animeName) => (
                <p>{animeName}</p>
              ))}
            </ul>
          </div>
        )}


      </div>

      <button onClick={back}>Back</button>
      <button style={{marginLeft: "15px"}} onClick={next}>Next</button>

    </div>
  );
}

export default UserAnimePreferences