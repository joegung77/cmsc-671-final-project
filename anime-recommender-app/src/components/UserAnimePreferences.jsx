import React, { useState, useEffect } from 'react'

function UserAnimePreferences({next, back}) {

    return (
        <div>
            <h1>User Anime Preferences</h1>
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
        </div>
    );
}

export default UserAnimePreferences