import React, { createContext, useState } from "react";

export const UserAnimeDataContext = createContext();

export function UserAnimeDataProvider({ children }) {
    const [genreList, setGenreList] = useState([])
    const [minScore, setMinScore] = useState(1);
    const [maxScore, setMaxScore] = useState(10);
    const [minEpisodes, setMinEpisodes] = useState(1);
    const [maxEpisodes, setMaxEpisodes] = useState(4000);
    const [minYear, setMinYear] = useState(1960);
    const [maxYear, setMaxYear] = useState(2025);
    const [typeList, setTypeList] = useState([]);
    const [likedAnimes, setLikedAnimes] = useState([]);
    const [dislikedAnimes, setDislikedAnimes] = useState([]);
    const [likedAnimeNames, setLikedAnimeNames] = useState([]);
    const [dislikedAnimeNames, setDislikedAnimeNames] = useState([]);

    return (
        <UserAnimeDataContext.Provider value={{ 
            genreList,
            setGenreList,
            minScore, 
            setMinScore,
            maxScore,
            setMaxScore,
            minEpisodes,
            setMinEpisodes,
            maxEpisodes,
            setMaxEpisodes,
            minYear,
            setMinYear,
            maxYear,
            setMaxYear,
            typeList,
            setTypeList,
            likedAnimes,
            setLikedAnimes,
            dislikedAnimes,
            setDislikedAnimes,
            likedAnimeNames,
            setLikedAnimeNames,
            dislikedAnimeNames,
            setDislikedAnimeNames
        }}>
            {children}
        </UserAnimeDataContext.Provider>
    );
}