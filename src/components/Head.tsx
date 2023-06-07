import '@/sass/components/_head.scss';

interface HeadProps {
  title: string,
  titleSize?: string | number,
  subtitle?: string,
  subtitleSize?: string | number,
  center?: boolean,
}

export default function Head({
  title,
  titleSize,
  subtitle,
  subtitleSize,
  center,
}: HeadProps) {
  return (
    <div
      className={`
      head-container
      ${center ? 'text-center' : 'text-left'}
      `}
    >
      <h1
        style={{
          fontSize: titleSize,
        }}
        className="title"
      >
        {title}
      </h1>
      <h2
        style={{
          fontSize: subtitleSize,
        }}
        className="subtitle"
      >
        {subtitle}
      </h2>
    </div>
  )
}
