import '@/sass/components/_button.scss';
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string,
  icon?: IconType
  onClick?: () => void | Promise<void>,
  btnStyle?: 'primary' | 'link' | 'outline' | 'warning',
  type?: 'submit' | 'button' | 'reset';
}

export default function Button({
  label,
  icon: Icon,
  btnStyle,
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
      button-container
      ${btnStyle === 'primary' && 'btn-primary'}
      ${btnStyle === 'link' && 'btn-link'}
      ${btnStyle === 'outline' && 'btn-outline'}
      ${btnStyle === 'warning' && 'btn-warning'}
      `}
      type={type}
    >
      {Icon && <Icon />}
      {label}
    </button >
  )
}
