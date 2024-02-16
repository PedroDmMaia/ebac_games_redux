import { fireEvent, screen } from '@testing-library/react'

import Produto from '..'
import { rederizaComProvider } from '../../../utils/tests'

const jogo = {
  id: 2,
  categoria: 'Looter shooter',
  imagem: '',
  plataformas: ['windows', 'PS5', 'Xbox'],
  preco: 150.9,
  precoAntigo: 249.9,
  titulo: 'Hogwarts Legacy'
}

describe('testes para o componente produto', () => {
  test('deve renderizar corretamente', () => {
    rederizaComProvider(<Produto game={jogo} />)
    expect(screen.getByText('Hogwarts Legacy')).toBeInTheDocument()
  }),
    test('deve adicionar 1 item ao carrinho', () => {
      const { store } = rederizaComProvider(<Produto game={jogo} />)
      const botao = screen.getByTestId('btn-adicionar-produto')
      fireEvent.click(botao)
      expect(store.getState().carrinho.itens).toHaveLength(1)
    })
})
