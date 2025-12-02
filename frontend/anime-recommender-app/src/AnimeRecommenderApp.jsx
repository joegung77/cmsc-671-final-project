import React, { useState, useEffect } from 'react'
import UserWelcome from "./components/UserWelcome";
import UserAnimeConstraints from "./components/UserAnimeConstraints";
import UserAnimePreferences from "./components/UserAnimePreferences";
import { UserAnimeDataProvider } from './UserAnimeData';
import UserAnimeRecommendations from './components/UserAnimeRecommendations';

function AnimeRecommenderApp() {
    const [form, setForm] = useState(0);

    const next = () => setForm((form) => form + 1);
    const back = () => setForm((form) => form - 1);

    return (
        <div>
            <UserAnimeDataProvider>
                {form === 0 && (
                    <UserWelcome next={next}/>
                )}
                {form === 1 && (
                    <UserAnimeConstraints next={next} back={back}/>
                )}
                {form === 2 && (
                    <UserAnimePreferences next={next} back={back}/>
                )}
                {form === 3 && (
                    <UserAnimeRecommendations next={next} back={back}/>
                )}
            </UserAnimeDataProvider>
        </div>
    );
}

export default AnimeRecommenderApp