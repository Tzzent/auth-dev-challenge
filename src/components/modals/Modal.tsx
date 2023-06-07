import '@/sass/components/modals/_modal.scss';
import { AiOutlineClose, AiFillWarning } from 'react-icons/ai';

import Head from '../Head';
import useModal from '../../hooks/useModal';
import Button from '../Button';

export default function Modal() {
  const {
    isOpen,
    title,
    description,
    onClose,
    onYes,
  } = useModal();

  return (
    <div
      onClick={onClose}
      className={`
      overlay-modal
      ${isOpen ? '' : 'hidden'}
      `}
    >
      <div className='modal'>
        <Head
          title={title}
          titleSize={20}
          subtitle={description}
          subtitleSize={16}
          center
        />
        <div className='footer'>
          <Button
            onClick={onClose}
            icon={AiOutlineClose}
            label='Cancel'
            btnStyle='primary'
          />
          <Button
            onClick={onYes}
            icon={AiFillWarning}
            label='Yes'
            btnStyle='warning'
          />
        </div>
      </div>
    </div>
  )
}
