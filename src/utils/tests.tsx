import { PreloadedState } from '@reduxjs/toolkit'
import { RenderOptions, render } from '@testing-library/react'
import { RootState, AppStore, configuraStore } from '../store'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

interface ExtendedRenderOption extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function rederizaComProvider(
  elemento: React.ReactElement,
  {
    preloadedState = {},
    store = configuraStore(preloadedState),
    ...opcoesAdicionais
  }: ExtendedRenderOption = {}
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function Encapsulador({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    store,
    ...render(elemento, {
      wrapper: Encapsulador,
      ...opcoesAdicionais
    })
  }
}
