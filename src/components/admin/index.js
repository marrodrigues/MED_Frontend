import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import NavItemWithIcon from './NavItemWithIcon'
import RegisterForm from '../forms/RegisterForm'
import ClienteSection from './sections/cliente'
import { ClienteProvider, FuncionarioProvider, InsumoProvider, LoteProvider, ProdutoProvider, PedidoProvider } from '../../providers'
import MeusDadosSection from './sections/meusdados'
import { PESSOA_DEFAULT_VALUE } from '../../util/constants'
import TestComponent from '../test'
import ChangePasswordForm from '../forms/ChangePasswordForm'
import MeusPedidosForm from '../forms/MeusPedidos'
import FuncionarioSection from './sections/funcionario'
import ComingSoonComponent from '../../pages/coming-soon'
import InsumoSection from './sections/insumo'
import LoteSection from './sections/lote'
import ProdutoSection from './sections/produto'
import PedidoSection from './sections/pedido'
import RelatorioSection from "./sections/relatorio";

const Container = styled.main`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
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
    padding: 15px 2vw;
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
    // min-width: fit-content;
    // min-height: fit-content;
    width: 100%;
    height: 100%;
    background-color: white;
    overflow: scroll;
`

const Admin = ({ sections, initialValues }) => {
    const [selectedItem, setSelectedItem] = useState(sections[0].name)
    const onClickNavItem = (section) => { setSelectedItem(section) }
    const [clientList, setClientList] =  useState([])
    const [selectedClient, setSelectedClient] = useState(PESSOA_DEFAULT_VALUE)
    const [employeeList, setEmployeeList] =  useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(PESSOA_DEFAULT_VALUE)
    const [supplyList, setSupplyList] = useState([])
    const [bundleList, setBundleList] = useState([])
    const [productList, setProductList] = useState([])
    const [orderList, setOrderList] = useState([])
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
    useEffect(() => {
        const employeeListCallback = data => {
            setEmployeeList(data)
            if (initialValues.id) {
                const selectedEmployee = (employeeList || []).find(employee => employee.pessoa.id === Number(initialValues.id))
                setSelectedEmployee(selectedEmployee)
            }
        }
        FuncionarioProvider.getAll(employeeListCallback)
    }, [])
    useEffect(() => {
        const supplyListCallback = data => {
            setSupplyList(data)
        }
        InsumoProvider.getAll(supplyListCallback)
    }, [])
    useEffect(() => {
        const bundleListCallback = data => {
            setBundleList(data)
        }
        LoteProvider.getAll(bundleListCallback)
    }, [])
    useEffect(() => {
        const productListCallback = data => {
            setProductList(data)
        }
        ProdutoProvider.getAll(productListCallback)
    }, [])
    useEffect(() => {
        const orderListCallback = data => {
            setOrderList(data)
        }
        PedidoProvider.getAll(orderListCallback)
    }, [])
    
    const renderSection = () => {
        switch (selectedItem) {
            case 'Registro':
                return <RegisterForm initialValues={initialValues} title='Cadastro' />
            case 'Clientes':
                return <ClienteSection clientList={clientList}/>
            case 'Meus Dados':
                return <MeusDadosSection initialValues={initialValues} clientList={clientList}/>
            case 'Meus Pedidos':  
                // return <TestComponent/>
                return <MeusPedidosForm />
            case 'Alterar Senha':
                return <ChangePasswordForm initialValues={initialValues} clientList={clientList} />
            case 'Funcionários':
                return <FuncionarioSection employeeList={employeeList}/>
            case 'Insumos':
                return <InsumoSection supplyList={supplyList} />
            case 'Lotes':
                return <LoteSection bundleList={bundleList} productList={productList} supplyList={supplyList} />
            case 'Produtos':
                return <ProdutoSection productList={productList} supplyList={supplyList} />
            case 'Pedidos':
                return <PedidoSection
                    orderList={orderList}
                    productList={productList}
                    clientList={clientList}
                    employeeList={employeeList}
                />
            case 'Relatórios':
                return <RelatorioSection />
            default:
                return <ComingSoonComponent />
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
                <div style={{width: 'fit-content', height: 'fit-content', paddingBottom: '2vh'}}>
                {renderSection()}
                </div>
            </Content>
        </Container>
    )
}

export default Admin