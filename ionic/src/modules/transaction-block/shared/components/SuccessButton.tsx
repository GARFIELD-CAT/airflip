import { IonButton } from '@ionic/react'
import { getRandomOkAnalog } from '@utils/phrases'
import type { ComponentProps } from 'react'

import { useTxStore } from '../../store/useTxStore'

interface SuccessButtonProperties extends ComponentProps<typeof IonButton> {
  onSuccess?: () => void
  className?: string
}

/**
 * Button component that displays a random success message and triggers a success action
 */
export const SuccessButton: React.FC<SuccessButtonProperties> = ({
  onSuccess,
  className = '',
  ...props
}) => {
  const { resetStore, setCurrentModal } = useTxStore()

  const handleSuccess = () => {
    resetStore()
    setCurrentModal(null)
    onSuccess?.()
  }

  return (
    <IonButton type="button" onClick={handleSuccess} className={className} {...props}>
      {getRandomOkAnalog()}
    </IonButton>
  )
}
