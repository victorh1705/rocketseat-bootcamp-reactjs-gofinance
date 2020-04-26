import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      api
        .get('/transactions')
        .then(resp => {
          const { data } = resp;
          const transacoes = data.transactions.map((t: Transaction) => {
            const formattedValue = formatValue(t.value);
            const formattedDate = formatDate(t.created_at);
            return { ...t, formattedValue, formattedDate };
          });

          setBalance(resp.data.balance);
          setTransactions(transacoes);
        })
        .catch(e => console.log('erro na aplicacao', e));
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        {balance && (
          <CardContainer>
            <Card>
              <header>
                <p>Entradas</p>
                <img src={income} alt="Income" />
              </header>
              <h1 data-testid="balance-income">
                {formatValue(balance.income)}
              </h1>
            </Card>
            <Card>
              <header>
                <p>Saídas</p>
                <img src={outcome} alt="Outcome" />
              </header>
              <h1 data-testid="balance-outcome">
                {formatValue(balance.outcome)}
              </h1>
            </Card>
            <Card total>
              <header>
                <p>Total</p>
                <img src={total} alt="Total" />
              </header>
              <h1 data-testid="balance-total">{formatValue(balance.total)}</h1>
            </Card>
          </CardContainer>
        )}

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            {transactions && (
              <tbody>
                {transactions.map(t => (
                  <tr key={t.id}>
                    <td className="title">{t.title}</td>
                    <td className={t.type}>
                      {t.type === 'outcome' && '-'} {t.formattedValue}
                    </td>
                    <td>{t.category.title}</td>
                    <td>{t.formattedDate}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
