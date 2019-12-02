import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {ProdutoProvider} from "../../providers";

import LocalPizzaIcon from '@material-ui/icons/LocalPizza';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2vh 0;
`

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 10vh 5vw;
    margin: 0px;
    background-color: white;
    list-style:none;
`

const ListItem = styled.li`
    font-family: HelveticaNeue;
    font-size: 20px;
    margin: 2.5vh 2.5vw;
    padding: 1vh 2.5vw;
    border: 2px dashed #FCBE34;
`

const ProductName = styled.span`
    padding: 0 1vw;
    margin-bottom: 12px;
`

const Menu = ({ }) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const productListCallback = data => {
            const filteredProducts = Array.from(
                new Set(
                    data.filter(product => Number(product.tipo) === 1)
                        .map(product => product.nome)
                )
            )
            setProducts([...filteredProducts, 'E muito mais!!!'])
        }
        ProdutoProvider.getAll(productListCallback)
    }, [])

    return (
        <Container id='menu'>
            <List>
                {products.map(product => <ListItem>
                    <LocalPizzaIcon style={{color: '#FFD874'}} />
                    <ProductName>{product}</ProductName>
                </ListItem>)}
            </List>
        </Container>
    )
};

export default Menu