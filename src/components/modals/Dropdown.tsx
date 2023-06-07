import '@/sass/components/modals/_dropdown.scss';
import { IconType } from 'react-icons';

interface DropdownProps {
  isOpen: boolean,
  onClose: () => void,
  items: Array<{
    icon: IconType,
    label: string,
    onClick: () => void,
  }>
}

export default function Dropdown({
  isOpen,
  items,
  onClose,
}: DropdownProps) {
  return (
    <div
      className={`
      modal-dropdown
      ${isOpen ? 'is-open' : 'is-closed'}
      `}
    >
      <ul>
        {items.map(((item, index) => (
          <li key={index}>
            {index + 1 === items.length && < hr />}
            <div
              onClick={() => {
                item.onClick()
                onClose()
              }}
              className={`
              item 
              ${index + 1 === items.length && 'last-item'}
              `}
            >
              <item.icon size={18} />
              <p>{item.label}</p>
            </div>
          </li>
        )))}
      </ul>
    </div>
  )
}
