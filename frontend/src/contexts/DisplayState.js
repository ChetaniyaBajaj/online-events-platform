import React, { useState } from 'react';
import DisplayContext from './DisplayContext';

const DisplayState = (props) => {
    const [display, setDisplay] = useState({
        "loginotp": false,
        "resetpassword": false,
        "isLoggedIn": sessionStorage.getItem('isLoggedIn') ? sessionStorage.getItem('isLoggedIn') : 'false' 
    })
    return (
        <DisplayContext.Provider value={{display, setDisplay}}>
            {props.children}
        </DisplayContext.Provider>
    )
}

export default DisplayState;
