import '@/sass/components/_container.scss';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode,
}

export default function Container({
  children,
}: ContainerProps) {
  return (
    <div className="container">
      <div className="card">
        {children}
      </div>
      <footer>
        <p>created by <a>@Tzzent</a></p>
        <p>devChallenges.io</p>
      </footer>
    </div>
  )
}
