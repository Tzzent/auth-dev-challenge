import '@/sass/components/inputs/_input.scss';
import { IconType } from 'react-icons';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
} from 'react-hook-form';
import { useState } from 'react';


interface InputTextProps {
  id: string,
  label?: string,
  type?: 'text' | 'textarea' | 'password' | 'email' | 'number',
  disabled?: boolean,
  required?: boolean,
  icon?: IconType,
  placeholder: string,
  register: UseFormRegister<FieldValues>,
  errors?: FieldErrors,
  errorMessage?: string,
}

export default function Input({
  id,
  label,
  type = 'text',
  disabled,
  required,
  icon: Icon,
  placeholder,
  register,
  errors,
  errorMessage,
}: InputTextProps) {
  let inputElement = null;
  const requiredOption = required ?
    { required: `${required && errorMessage}`, } : {};

  if (type === 'textarea') {
    inputElement = (
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, requiredOption)}
        placeholder={placeholder}
        rows={6}
        className={`
        input
        ${Icon ? 'has-icon' : 'hast-not-icon'}
        `}
        autoComplete="off"
      />
    )
  }

  if (
    type === 'text' ||
    type === 'email' ||
    type === 'number'
  ) {

    inputElement = (
      <input
        id={id}
        disabled={disabled}
        {...register(id, requiredOption)}
        type={type}
        placeholder={placeholder}
        className={`
        input
        ${Icon ? 'has-icon' : 'hast-not-icon'}
        `}
        autoComplete="off"
      />
    )
  }

  const [passVisible, setPassVisible] = useState(false);
  if (type === 'password') {
    inputElement = (
      <>
        <input
          id={id}
          disabled={disabled}
          {...register(id)}
          type={passVisible ? 'text' : type}
          placeholder={placeholder}
          className={`
          input
          ${Icon ? 'has-icon' : 'hast-not-icon'}
          `}
          autoComplete="off"
        />
        {
          passVisible ? (
            <AiOutlineEyeInvisible
              className="icon icon-eye"
              onClick={() => setPassVisible(false)}
            />
          ) : (
            <AiOutlineEye
              className="icon icon-eye"
              onClick={() => setPassVisible(true)}
            />
          )
        }
      </>
    )
  }

  return (
    <div className="input-container">
      {label && <span>{label}</span>}
      <label
        htmlFor={placeholder}
      >
        {Icon && <Icon className="icon" />}
        {inputElement}
        {errors?.[id] && <span className="error">{`${errors[id]?.message}`}</span>}
      </label>
    </div>
  )
}
