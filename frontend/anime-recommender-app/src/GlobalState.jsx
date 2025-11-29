import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [genreList, setGenreList] = useState([])
    const [minScore, setMinScore] = useState(1);
    const [maxScore, setMaxScore] = useState(10);
    const [minEpisodes, setMinEpisodes] = useState(1);
    const [maxEpisodes, setMaxEpisodes] = useState(4000);
    const [minYear, setMinYear] = useState(1960);
    const [maxYear, setMaxYear] = useState(2025);
    const [typeList, setTypeList] = useState([]);
    const [minMembers, setMinMembers] = useState(0);
    const [maxMembers, setMaxMembers] = useState(10000000);
    const [ likedAnimes, setLikedAnimes ] = useState([]);
    const [ dislikedAnimes, setDislikedAnimes ] = useState([]);

    return (
        <GlobalContext.Provider value={{ 
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
            minMembers,
            setMinMembers,
            maxMembers,
            setMaxMembers,
            likedAnimes,
            setLikedAnimes,
            dislikedAnimes,
            setDislikedAnimes
        }}>
            {children}
        </GlobalContext.Provider>
    );
}