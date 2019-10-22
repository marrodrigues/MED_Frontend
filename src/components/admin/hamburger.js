import React from 'react'
import styled from 'styled-components'

const MenuHamburger = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;

  &:hover {
    cursor: pointer;
  }
  .top-bar {
    transform: ${props => props.openMenu && 'translateY(10px) rotate(45deg)'};
    transition: all 1s ease;
  }
  .middle-bar {
    background-color: ${props => props.openMenu && 'transparent'};
    transition: all 1s ease;
  }
  .bottom-bar {
    transform: ${props => props.openMenu && 'translateY(-10px) rotate(-45deg)'};
    transition: all 1s ease;
  }
  .drop-down {
    visibility: ${props => props.openMenu ? 'visible' : 'hidden'};
    opacity: ${props => props.openMenu ? 1 : 0};
    transition: all 1s ease;
  }
`
const HamburgerBar = styled.div`
  width: 35px;
  height: 5px;
  background-color: black;
  margin: 2.5px 0;
`


export default class Hamburger extends React.Component {
    state = {
        isOpen: false
    }
    onClickMenu = () => {
        this.setState({isOpen: !this.state.isOpen})
    }
    render () {
        return (
            <MenuHamburger onClick={this.onClickMenu} openMenu={this.state.isOpen}>
                <HamburgerBar className='top-bar' />
                <HamburgerBar className='middle-bar' />
                <HamburgerBar className='bottom-bar' />
            </MenuHamburger>
        )
    }
}