import ModalSkeleton from './index'

const Modal = ({
  isOpen,
  onClose,
  title,
}: {
  isOpen: boolean
  onClose: VoidFunction
  title: string
}) => {
  return (
    <ModalSkeleton isOpen={isOpen} onClose={onClose} title={title}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'flex-end',
        }}
      >
        Close to play again
      </div>
    </ModalSkeleton>
  )
}

export default Modal
