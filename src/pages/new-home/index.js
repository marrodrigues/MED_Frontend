// Dependencies
import React from 'react'

// Components
import Header from '../../components/header-v2'
import Hero from '../../components/hero'

export default class extends React.Component {
    render () {
        return (
            <React.Fragment>
                <Header />
                <Hero />
                <Hero />
            </React.Fragment>
        )
    }
}