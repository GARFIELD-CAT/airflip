import { type ComponentProps } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'

import { Header } from './header/Header'

interface BaseLayoutProperties extends ComponentProps<'div'> {
  component: React.ComponentType<any>
  pageTitle: string
}

export const BaseLayout = ({ component: Component, pageTitle, ...props }: BaseLayoutProperties) => {
  return (
    <IonPage className="flex min-h-screen flex-col px-[6.25rem] max-lg:px-4">
      <IonHeader className="bg-transparent" style={{
        '--background': 'transparent',
      } as React.CSSProperties}>
        <IonToolbar className="bg-transparent" style={{
          '--background': 'transparent',
          '--color': 'var(--main-100)',
          '--border-width': '0',
        } as React.CSSProperties}>
          <IonTitle>{pageTitle}</IonTitle>
        </IonToolbar>
        <Header className="mt-4 lg:mt-[2.06rem] bg-transparent" />
      </IonHeader>
      <IonContent>
        <div className="flex min-h-screen flex-col px-[6.25rem] max-lg:px-0">
          <main className="flex-1 lg:mt-0">
            <Component {...props} />
          </main>
        </div>
      </IonContent>
    </IonPage>
  )
}
