import React from 'react';
import logo from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Container, Main, Content } from './styles'


function Home() {
  return (
    <Container>
      <Content>
          <header>
            <img src={logo} alt="Ecoleta"/>    
          </header>

          <Main>
            <h1>Seu Marketplace de coleta de resíduos.</h1>
            <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

            <Link to="/create-point">
              <span>
                  <FiLogIn />
              </span>
              <strong>Cadastre um ponto de coleta</strong>
            </Link>

          </Main>
      </Content>
    </Container>
  );
}

export default Home;
