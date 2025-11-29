import React, { useState, useEffect } from 'react'

function UserDetails({next}) {

    return (
        <div className="form">
            <h2>User Details</h2>
            <button onClick={next}>Next</button>
        </div>
    );
}

export default UserDetails