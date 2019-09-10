import React, { useState } from 'react';

// https://xd.adobe.com/spec/97b698a1-60f0-48e3-55d5-471772ce32ae-e187/

import Header from '../../components/new-layout/header/'
import Hero from '../../components/new-layout/hero'
import About from '../../components/new-layout/about'
import Footer from '../../components/new-layout/footer'

const Home = () => {
    const [loggedUser, setLoggedUser] = useState(null)

    return(
        <React.Fragment>
            <Header loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
            <Hero />
            <About />
            <Footer loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
        </React.Fragment>
    )
}

export default Home