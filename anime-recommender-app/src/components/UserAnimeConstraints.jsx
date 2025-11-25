import React, { useState, useEffect } from 'react'

function UserAnimeConstraints({next, back}) {
    return (
        <div>
            <h1>User Anime Constraints</h1>
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
        </div>
    );
}

export default UserAnimeConstraints