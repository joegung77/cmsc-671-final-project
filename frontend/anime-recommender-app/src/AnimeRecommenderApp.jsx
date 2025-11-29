import React, { useState, useEffect } from 'react'
import UserDetails from "./components/UserDetails";
import UserAnimeConstraints from "./components/UserAnimeConstraints";
import UserAnimePreferences from "./components/UserAnimePreferences";
import { GlobalProvider } from './GlobalState';

function AnimeRecommenderApp() {
    const [form, setForm] = useState(0);

    const next = () => setForm((form) => form + 1);
    const back = () => setForm((form) => form - 1);

    return (
        <div>
            <GlobalProvider>
                {form === 0 && (
                    <UserDetails next={next}/>
                )}
                {form === 1 && (
                    <UserAnimeConstraints next={next} back={back}/>
                )}
                {form === 2 && (
                    <UserAnimePreferences next={next} back={back}/>
                )}
            </GlobalProvider>
        </div>
    );
}

export default AnimeRecommenderApp