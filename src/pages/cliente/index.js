// import React from 'react'

// import Client from '../../components/cliente'

// export default class extends React.Component {
//     render () {
//         return (
//             <Client />
//         )
//     }
// }

import React from 'react'
import RegisterForm from '../../components/new-layout/register-form';

export default class extends React.Component {
    render () {
        return (
            <React.Fragment>
                {/* <Header /> */}
                <RegisterForm update/>
            </React.Fragment>
        )
    }
}