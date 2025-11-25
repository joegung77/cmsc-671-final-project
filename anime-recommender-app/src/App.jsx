import React, { useState, useEffect } from 'react'
import "./App.css"

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [filteredAnimeList, setFilteredAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

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
    <div>
      <input
        type="text"
        placerholder="Search anime by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h1>Anime List</h1>
      <ul>
        {currentItems.map((anime) => (
          <li key={anime.name} className="anime-list-item">
            <img src={anime.image_url} alt={anime.name} style={{ width: "100px" }} />
            <p>{anime.name}</p>
          </li>
        ))}
      </ul>

            {/* Pagination Buttons */}
            <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )

}

export default App
