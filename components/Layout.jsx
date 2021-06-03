import React from 'react';


function Layout({ Content, Footer }) {
    return (
        <>
            <footer>

                {Footer}

            </footer>
            {Content}
        </>
    )
}

export default Layout;
