import { BaseLayout } from '@layouts/BaseLayout'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from 'react-router-dom'

import { ROUTES } from './routes'

function Root() {
  return (
    <>
      <ScrollRestoration />
      <BaseLayout />
    </>
  )
}

export const routes = createRoutesFromElements(
  <Route path="/">
    <Route
      Component={Root}
      loader={() => {
        return { Component: Root }
      }}
    >
      <Route
        path={ROUTES.SWAP}
        lazy={async () => {
          const { Swap } = await import('@pages/swap/Swap')
          return {
            Component: Swap,
          }
        }}
      />
    </Route>

    <Route
      path="*"
      lazy={async () => {
        const { NotFound } = await import('@pages/404/NotFound')
        return {
          Component: NotFound,
        }
      }}
    />
  </Route>,
)

export const router = createBrowserRouter(routes)
