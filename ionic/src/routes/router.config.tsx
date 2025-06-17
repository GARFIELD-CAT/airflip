import { BaseLayout } from '@layouts/BaseLayout'
import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ROUTES } from './routes'
import { lazy, Suspense } from 'react'

const Swap = lazy(() => import('@pages/swap/Swap').then(module => ({ default: module.Swap })))
const Portfolio = lazy(() => import('@pages/portfolio/Portfolio'))
const NotFound = lazy(() => import('@pages/404/NotFound').then(module => ({ default: module.NotFound })))

export const IonicApp = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to={ROUTES.SWAP} />} />
            <Route exact path={ROUTES.SWAP} render={(props) => <BaseLayout component={Swap} pageTitle="Swap" {...props} />} />
            <Route exact path={ROUTES.PORTFOLIO} render={(props) => <BaseLayout component={Portfolio} pageTitle="Portfolio" {...props} />} />
            <Route path="*" render={(props) => <BaseLayout component={NotFound} pageTitle="Not Found" {...props} />} />
          </Switch>
        </Suspense>
      </IonRouterOutlet>
    </IonReactRouter>
  )
}
