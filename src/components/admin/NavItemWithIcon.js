import React from 'react'
import styled from 'styled-components'

import PersonAddIcon from '@material-ui/icons/PersonAdd'
import MoodIcon from '@material-ui/icons/Mood'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DescriptionIcon from '@material-ui/icons/Description';

const Container = styled.div`
    display: flex;
    align-items: center;
`

const ItemLabel = styled.span`
    margin-top: 4px;
    padding: 0 5px;
`

const NavItemWithIcon = ({ itemLabel, icon }) => {
    const getIcon = (icon = '') => {
        switch(icon.toUpperCase()) {
            case 'DESCRIPTION': 
                return <DescriptionIcon />
            case 'ASSIGNMENT':
                return <AssignmentIcon />
            case 'FORMATLISTBULLETED':
                return <FormatListBulletedIcon />
            case 'SHOPPINGBASKET':
                return <ShoppingBasketIcon />
            case 'ASSIGNMENTIND': 
                return <AssignmentIndIcon />
            case 'PERSONADD':
                return <PersonAddIcon /> 
            case 'MOOD':
            default:
                return <MoodIcon />
        }
    }
    return (
        <Container>
            {getIcon(icon)}
            <ItemLabel>{itemLabel}</ItemLabel>
        </Container>
    )
}

export default NavItemWithIcon