import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "../AnimeRecommender.css";
import { UserAnimeDataContext } from '../UserAnimeData';

function UserAnimeRecommendations({back}) {
    const { genreList } = useContext(UserAnimeDataContext);
    const { minScore } = useContext(UserAnimeDataContext);
    const { maxScore } = useContext(UserAnimeDataContext);
    const { minEpisodes } = useContext(UserAnimeDataContext);
    const { maxEpisodes } = useContext(UserAnimeDataContext);
    const { minYear } = useContext(UserAnimeDataContext);
    const { maxYear } = useContext(UserAnimeDataContext);
    const { typeList } = useContext(UserAnimeDataContext);
    const { likedAnimes } = useContext(UserAnimeDataContext);
    const { dislikedAnimes } = useContext(UserAnimeDataContext);

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
                <p>Getting Anime Recommendations...</p>
                <p>May take up to 1-2 minutes</p>
                <button onClick={back}>Back</button>
            </div>
        );
    }

    return (
        <div className="form">
            <h1>User Anime Recommendations</h1>
            {animeRecommendations.length > 0 && (<div>
                <p>Here are your recommendations ranked based on your constraints and prior Anime preferences</p>
                <br/>
                <ol style={{marginBottom: "40px"}}>
                    {animeRecommendations.map((anime) => (
                        <li key={anime.anime_id} >
                            <div className="anime-list-item" style={{ marginLeft: "20px"}}>
                                <img src={anime["Image URL"]} alt={anime.name} style={{ width: "250px" }}/>
                                <div>
                                    <h2><u>{anime["Name"]}</u></h2>
                                    <p><b>English Name:</b> {anime["English name"]}</p>
                                    <p><b>Score:</b> {anime["Score"]}</p>
                                    <p><b>Genres:</b> {anime["Genres"]}</p>
                                    <p><b>Synopsis:</b> {anime["Synopsis"]}</p>
                                    <p><b>Type:</b> {anime["Type"]}</p>
                                    <p><b>Episodes:</b> {Math.round(anime["Episodes"])}</p>
                                    <p><b>Aired:</b> {anime["Aired"]}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>)}
            {animeRecommendations.length < 1 && (
                <div>
                    <p>
                        Sorry, there are no recommendations based on your 
                        constraints and existing Anime preferences. Try going 
                        back and changing your inputs or refresh the webpage
                    </p>
                </div>
            )}
            <button onClick={back}>Back</button>
        </div>
    );
}

export default UserAnimeRecommendations