import  React, { useState, useEffect} from 'react';

export default function Navbar({children}){

    const styles = {
        maxWidth: '900px',
        margin: 'auto'

    }

    return  (
        <div className="navbar-light bg-light border-bottom">
            <nav className="navbar" style={styles} >
                {children}
            </nav>
        </div>
    )
}

