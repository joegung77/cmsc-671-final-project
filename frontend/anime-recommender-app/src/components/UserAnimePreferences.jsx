import React, { useState, useEffect } from 'react'
import "../AnimeRecommender.css"
import LikeIcon from "../icons/thumbs_up.png"
import DislikeIcon from "../icons/thumbs_down.png"

function UserAnimePreferences({next, back}) {
  const [animeList, setAnimeList] = useState([]);
  const [filteredAnimeList, setFilteredAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [likedAnimes, setLikedAnimes] = useState([]);
  const [dislikedAnimes, setDislikedAnimes] = useState([]);

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

      <h2>Anime Preferences</h2>

      <p>
        Search
      </p>

      <input
        type="text"
        placerholder="Search anime by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {currentItems.map((anime) => (
          <li key={anime.id} className="anime-list-item">

            {/* Like Button */}
            <button style={{
              outline: likedAnimes.includes(anime.id) ? "3px solid yellow" : "none"
            }} onClick={() => {
              const id = anime.id;

              if (likedAnimes.includes(id)) {
                // If anime is already liked, remove it from liked
                setLikedAnimes(previousLikedAnimes => previousLikedAnimes.filter(animeId => animeId !== id))
              } else {
                setLikedAnimes([...likedAnimes, id])

                // If anime is in disliked array, remove it since we added to liked
                if (dislikedAnimes.includes(id)) {
                  setDislikedAnimes(previousDislikedAnimes => previousDislikedAnimes.filter(animeId => animeId !== id))
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

              if (dislikedAnimes.includes(id)) {
                // If anime is already disliked, remove it from disliked
                setDislikedAnimes(previousDislikedAnimes => previousDislikedAnimes.filter(animeId => animeId !== id))
              } else {
                setDislikedAnimes([...dislikedAnimes, id])

                // If anime is in liked array, remove it since we added to disliked
                if (likedAnimes.includes(id)) {
                  setLikedAnimes(previousLikedAnimes => previousLikedAnimes.filter(animeId => animeId !== id))
                }
              }
            }}>
              <img src={DislikeIcon}/>
            </button>

            <img src={anime.image_url} alt={anime.name} style={{ width: "130px" }} />
            <p>{anime.name}</p>
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

      </div>

      <button onClick={back}>Back</button>

    </div>
  );
}

export default UserAnimePreferences