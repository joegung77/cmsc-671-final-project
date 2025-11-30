import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "../AnimeRecommender.css";
import { GlobalContext } from '../GlobalState';

function UserAnimeRecommendations({back}) {
    const { genreList } = useContext(GlobalContext);
    const { minScore } = useContext(GlobalContext);
    const { maxScore } = useContext(GlobalContext);
    const { minEpisodes } = useContext(GlobalContext);
    const { maxEpisodes } = useContext(GlobalContext);
    const { minYear } = useContext(GlobalContext);
    const { maxYear } = useContext(GlobalContext);
    const { typeList } = useContext(GlobalContext);
    const { minMembers } = useContext(GlobalContext);
    const { maxMembers } = useContext(GlobalContext);
    const { minScoredBy} = useContext(GlobalContext);
    const { likedAnimes } = useContext(GlobalContext);
    const { dislikedAnimes } = useContext(GlobalContext);

    const [animeRecommendations, setAnimeRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let hasAnimeRecommendations = false;

        const fetchData = async () => {
            const response = await axios.post("http://127.0.0.1:8000/anime_recommendations", {
                genres: genreList,
                minimum_score: minScore,
                maximum_score: maxScore,
                minimum_episodes: minEpisodes,
                maximum_episodes: maxEpisodes,
                minimum_year: minYear,
                maximum_year: maxYear,
                types: typeList,
                minimum_members: minMembers,
                maximum_members: maxMembers,
                minimum_scored_by: minScoredBy,
                liked_anime_ids: likedAnimes.map(Number),
                disliked_anime_ids: dislikedAnimes.map(Number)
          });

          if (!hasAnimeRecommendations) {
            setAnimeRecommendations(response.data);
            console.log(response.data)
            setLoading(false);
          }
        };

        fetchData();

        return () => {
            hasAnimeRecommendations = true;
        }
      }, []);

    if (loading) {
        return (
            <div className="form">
                <h3>Getting Anime Recommendations...</h3>
                <button onClick={back}>Back</button>
            </div>
        );
    }

    return (
        <div className="form">
            <ul>
                {animeRecommendations.map((anime) => (
                    <li key={anime.anime_id} className="anime-list-item">
                        <img src={anime["Image URL"]} alt={anime.name} style={{ width: "130px" }}/>
                        <p>{anime.Name}</p>
                    </li>
                ))}
            </ul>
            <button onClick={back}>Back</button>
        </div>
    );
}

export default UserAnimeRecommendations