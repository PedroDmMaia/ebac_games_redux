import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Produtos from '..'
import { rederizaComProvider } from '../../../utils/tests'
import { screen, waitFor } from '@testing-library/react'

const mocks = [
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
  },
  {
    id: 3,
    categoria: 'Ação',
    imagem: '',
    plataformas: ['PS5', 'Xbox'],
    preco: 150,
    precoAntigo: 200,
    titulo: 'Gotham Knights'
  },
  {
    id: 4,
    categoria: 'Aventura',
    imagem: '',
    plataformas: ['windows', 'PS5', 'Xbox'],
    preco: 180,
    precoAntigo: 280,
    titulo: 'Donkey Kong'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisição, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('Teste para o container de produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretmaente com o texto de carregando', () => {
    rederizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve renderizar corretmaente com a listagem de jogos', async () => {
    rederizaComProvider(<Produtos />)
    await waitFor(() => {
      expect(screen.getByText('Donkey Kong')).toBeInTheDocument()
    })
  })
})
