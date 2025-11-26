import React, { useState, useEffect } from 'react'

function UserDetails({next}) {

    return (
        <div>
            <h1>User Details</h1>
            <button onClick={next}>Next</button>
        </div>
    );
}

export default UserDetails