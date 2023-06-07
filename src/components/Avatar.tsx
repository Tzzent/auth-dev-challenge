import '@/sass/components/_avatar.scss';

interface AvatarProps {
  label?: string,
  image?: string,
  width?: number | string,
  rounded?: boolean,
}

export default function Avatar({
  label,
  image,
  width,
  rounded,
}: AvatarProps) {
  return (
    <div className="avatar-container">
      <div
        style={{ width: `${width}em`, height: `${width}em` }}
        className={`
        image-container 
        ${rounded && 'rounded'}
        ${!width && 'default-width'}
        `}
      >
        <img
          src={image}
          alt={label}
        />
      </div>
      <span>{label}</span>
    </div>
  )
}
