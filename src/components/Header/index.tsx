import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

interface Pagina {
  pagina: string;
  rota: string;
}

const paginas: Array<Pagina> = [
  { pagina: 'Listagem', rota: '/' },
  { pagina: 'Importação', rota: '/import' },
];

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const location = useLocation();

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          {paginas.map(p => (
            <Link
              to={p.rota}
              className={p.rota === location.pathname ? 'active' : ''}
            >
              {p.pagina}
            </Link>
          ))}
        </nav>
      </header>
    </Container>
  );
};

export default Header;
