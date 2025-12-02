import React, { useState, useEffect, useContext } from 'react';
import { UserAnimeDataContext } from '../UserAnimeData';

function UserAnimeConstraints({next, back}) {
    const [availableGenreList, setAvailableGenreList] = useState([]);
    const [availableTypeList, setAvailableTypeList] = useState([]);

    const { genreList, setGenreList} = useContext(UserAnimeDataContext);
    const { minScore, setMinScore} = useContext(UserAnimeDataContext);
    const { maxScore, setMaxScore } = useContext(UserAnimeDataContext);
    const { minEpisodes, setMinEpisodes } = useContext(UserAnimeDataContext);
    const { maxEpisodes, setMaxEpisodes } = useContext(UserAnimeDataContext);
    const { minYear, setMinYear } = useContext(UserAnimeDataContext);
    const { maxYear, setMaxYear } = useContext(UserAnimeDataContext);
    const { typeList, setTypeList } = useContext(UserAnimeDataContext);


    useEffect(() => {
        fetch("http://127.0.0.1:8000/genre")
            .then((res) => res.json())
            .then((data) => setAvailableGenreList(data))
            .catch((err) => console.error(err));

        fetch("http://127.0.0.1:8000/type")
            .then((res) => res.json())
            .then((data) => setAvailableTypeList(data))
            .catch((err) => console.error(err));
      }, []);

    return (
        <div className="form">
            <h1>User Anime Constraints</h1>

            <p>Define constraints for your Anime recommendations or press 'Next' at the bottom to continue</p>

            <p>
                Genre:
            </p>
            <ul style={{ listStyle: "none"}}>
                {availableGenreList.map((genre) => (
                    <li key={genre}>
                        <input 
                            type="checkbox"
                            checked={genreList.includes(genre)}
                            onChange={() => {
                                if (!genreList.includes(genre)) {
                                    setGenreList([...genreList, genre])
                                } else {
                                    setGenreList(previousGenreList => previousGenreList.filter(previousGenre => previousGenre !== genre))
                                }
                            }}
                        />{genre}
                    </li>
                ))}
            </ul>

            <br/>

            <p>
                Minimum Score: {minScore}
            </p>
            <input 
                type="range" 
                min="1" 
                max="10"
                value={minScore}
                onChange={e => setMinScore(Number(e.target.value))}
            />

            <p>
                Maximum Score: {maxScore}
            </p>
            <input 
                type="range" 
                min="1" 
                max="10"
                value={maxScore}
                onChange={e => setMaxScore(Number(e.target.value))}
            />

            <br/>
            <br/>

            <p>
                Minimum Episodes
            </p>
            <input 
                type="number" 
                value={minEpisodes}
                onChange={e => setMinEpisodes(Number(e.target.value))}
            />

            <p>
                Maximum Episodes
            </p>
            <input 
                type="number" 
                value={maxEpisodes}
                onChange={e => setMaxEpisodes(Number(e.target.value))}
            />

            <br/>
            <br/>

            <p>
                Minimum Year
            </p>
            <input 
                type="number" 
                value={minYear}
                onChange={e => setMinYear(Number(e.target.value))}
            />

            <p>
                Maximum Year
            </p>
            <input 
                type="number" 
                value={maxYear}
                onChange={e => setMaxYear(Number(e.target.value))}
            />

            <br/>
            <br/>

            <p>
                Type:
            </p>
            <ul style={{ listStyle: "none"}}>
                {availableTypeList.map((type) => (
                    <li key={type}>
                        <input 
                            type="checkbox"
                            checked={typeList.includes(type)}
                            onChange={() => {
                                if (!typeList.includes(type)) {
                                    setTypeList([...typeList, type])
                                } else {
                                    setTypeList(previousTypeList => previousTypeList.filter(previousType => previousType !== type))
                                }
                            }}
                        />{type}
                    </li>
                ))}
            </ul>

            <br/>

            <button onClick={back}>Back</button>
            <button style={{marginLeft: "15px"}} onClick={next}>Next</button>
            
        </div>
    );
}

export default UserAnimeConstraints