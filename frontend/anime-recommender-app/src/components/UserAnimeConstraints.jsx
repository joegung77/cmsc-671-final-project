import React, { useState, useEffect } from 'react'

function UserAnimeConstraints({next, back}) {
    const [genreList, setGenreList] = useState([]);
    const [minScore, setMinScore] = useState(1);
    const [maxScore, setMaxScore] = useState(10);
    const [minEpisodes, setMinEpisodes] = useState(1);
    const [maxEpisodes, setMaxEpisodes] = useState(4000);
    const [minYear, setMinYear] = useState(1960);
    const [maxYear, setMaxYear] = useState(2025);
    const [typeList, setTypeList] = useState([]);
    const [minMembers, setMinMembers] = useState(0);
    const [maxMembers, setMaxMembers] = useState(10000000)


    useEffect(() => {
        fetch("http://127.0.0.1:8000/genre")
            .then((res) => res.json())
            .then((data) => setGenreList(data))
            .catch((err) => console.error(err));

        fetch("http://127.0.0.1:8000/type")
            .then((res) => res.json())
            .then((data) => setTypeList(data))
            .catch((err) => console.error(err));
      }, []);

    return (
        <div className="form">
            <h2>User Anime Constraints</h2>

            <p>
                Genre:
            </p>
            <ul style={{ listStyle: "none"}}>
                {genreList.map((genre) => (
                    <li key={genre}>
                        <input type="checkbox"/>{genre}
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
                {typeList.map((type) => (
                    <li key={type}>
                        <input type="checkbox"/>{type}
                    </li>
                ))}
            </ul>

            <br/>

            <p>
                Minimum Members
            </p>
            <input 
                type="number" 
                value={minMembers}
                onChange={e => setMinMembers(Number(e.target.value))}
            />

            <br/>
            <br/>

            <p>
                Maximum Members
            </p>
            <input 
                type="number" 
                value={maxMembers}
                onChange={e => setMaxMembers(Number(e.target.value))}
            />

            <br/>
            <br/>
            <br/>

            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
            
        </div>
    );
}

export default UserAnimeConstraints