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
      <IonHeader>
        <IonToolbar>
          <IonTitle>{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Header className="mt-4 lg:mt-[2.06rem]" />
      <IonContent className="ion-padding">
        <div className="flex min-h-screen flex-col px-[6.25rem] max-lg:px-4">
          <main className="flex-1 lg:mt-0">
            <Component {...props} />
          </main>
        </div>
      </IonContent>
    </IonPage>
  )
}
