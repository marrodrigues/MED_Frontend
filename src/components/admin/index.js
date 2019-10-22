import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import NavItemWithIcon from './NavItemWithIcon'
import RegisterForm from '../forms/RegisterForm'
import ClienteSection from './sections/cliente'
import { ClienteProvider } from '../../providers'
import MeusDadosSection from './sections/meusdados'
import { CLIENTE_DEFAULT_VALUE } from '../../util/constants'
import TestComponent from '../test'
import ChangePasswordForm from '../forms/ChangePasswordForm'
import MeusPedidosForm from '../forms/MeusPedidos'
import FuncionarioSection from './sections/funcionario'

const Container = styled.main`
    display: flex;
    height: 100vh;
    width: 100vw;
`
const NavBar = styled.nav`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 350px;
    background: #F7B944;
    font-size: 30px;
    color: white;
    text-align: center;
    white-space: nowrap;
    padding: 0 30px;
`
const Logo = styled.div`
    width: 145px;
    height: 120px;
    background: url('/image/logo-verde.png') center center/cover no-repeat;
    margin: 2vh 2vw;
    :hover {
        cursor: pointer;
    }
`
const NavItem = styled.a`
    color: ${({ isSelected }) => isSelected ? '#236C4A' : 'white'};
    margin: 5px 1px;
    padding: 20px 2vw;
    font-size: 18px;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 600;
    font-family: HelveticaNeue;
    // border: ${({ isSelected }) => isSelected ? '1px dashed white' : '1px solid transparent'};
    border-radius: 10px;
    background-color: ${({ isSelected }) => isSelected ? '#FFD27C' : 'transparent'};
    &:first-child {
        margin-top: 20px;
    }
    :hover {
        cursor: pointer;
        background-color: #FFD27C;
    }
    transition: color 0.25s ease;
`
const Content = styled.section`
    display: flex;
    flex-direction: column;
    padding: 0 3vw;
    min-width: fit-content;
    min-height: fit-content;
    width: 100%;
    height: 100%;
    background-color: white;
`

const Admin = ({ sections, initialValues }) => {
    // TODO remover após teste
    const [selectedItem, setSelectedItem] = useState(sections[0].name)
    const onClickNavItem = (section) => { setSelectedItem(section) }
    const [clientList, setClientList] =  useState([])
    const [selectedClient, setSelectedClient] = useState(CLIENTE_DEFAULT_VALUE)
    useEffect(() => {
        const clientListCallback = data => {
            setClientList(data)
            if (initialValues.id) {
                const selectedClient = (clientList || []).find(client => client.pessoa.id === Number(initialValues.id))
                setSelectedClient(selectedClient)
            }
        }
        ClienteProvider.getAll(clientListCallback)
        
    }, [])
    // useEffect(() => {
    //     if (initialValues.id) {
    //         const selectedClient = (clientList || []).find(client => client.pessoa.id === Number(initialValues.id))
    //         setSelectedClient(selectedClient)
    //     }
    // }, [initialValues.id, clientList])
    
    const renderSection = () => {
        switch (selectedItem) {
            case 'Registro':
                return <RegisterForm initialValues={initialValues} />
            case 'Clientes':
                return (
                    <ClienteSection
                        clientList={clientList}/>
                )
            case 'Meus Dados':
                console.log(selectedClient)
                return <MeusDadosSection initialValues={initialValues} clientList={clientList}/>
            case 'Meus Pedidos': // return <TestComponent/>
                return <MeusPedidosForm />
            case 'Alterar Senha':
                return <ChangePasswordForm />
            case 'Funcionários':
                return <FuncionarioSection />
            case 'Insumos':
            case 'Lotes':
            case 'Pedidos':
            case 'Produtos':
            default:
                return <div>seção</div>
        }
    }
    return (
        <Container>
            <NavBar>
                <Logo onClick={() => { window.location.href = '/' }} />
                {
                    sections.map((section, index) =>
                        <NavItem
                            key={`${section.name}${index}`}
                            isSelected={selectedItem === section.name}
                            onClick={() => onClickNavItem(section.name)}
                        >
                            <NavItemWithIcon
                                icon={section.icon}
                                itemLabel={section.name}
                            />
                        </NavItem>)
                }
            </NavBar>
            <Content>
                {renderSection()}
            </Content>
        </Container>
    )
}

export default Admin