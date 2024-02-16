import { screen } from '@testing-library/react'

import Header from '..'
import { rederizaComProvider } from '../../../utils/tests'

describe('Testes para o componente header', () => {
  test('Deve renderizar corretamente', () => {
    rederizaComProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('Deve renderizar com 2 itens no carrinho', () => {
    rederizaComProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
            {
              id: 1,
              categoria: 'RPG',
              imagem: '',
              plataformas: ['windows'],
              preco: 150.9,
              precoAntigo: 199.9,
              titulo: 'Enden Ring'
            },
            {
              id: 2,
              categoria: 'Looter shooter',
              imagem: '',
              plataformas: ['windows', 'PS5', 'Xbox'],
              preco: 150.9,
              precoAntigo: 249.9,
              titulo: 'Borderlands 4'
            }
          ]
        }
      }
    })

    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})
