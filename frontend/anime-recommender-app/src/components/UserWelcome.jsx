import React, { useState, useEffect } from 'react'

function UserWelcome({next}) {

    return (
        <div className="form" style={{marginRight: "800px"}}>
            <h1>Anime Recommender Agent</h1>
            <h3>Welcome!</h3>
            <p>
                Anime Recommender Agent provides the user with Anime recommendations based on their defined constraints,
                as well as existing Anime preferences.
            </p>

            <br/>

            <button style={{marginLeft: "15px"}} onClick={next}>Next</button>
        </div>
    );
}

export default UserWelcome