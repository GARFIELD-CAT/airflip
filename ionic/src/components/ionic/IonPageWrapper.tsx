import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { ReactNode } from 'react'

interface IonPageWrapperProps {
  title: string
  children: ReactNode
}

export const IonPageWrapper = ({ title, children }: IonPageWrapperProps) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {children}
      </IonContent>
    </IonPage>
  )
} 