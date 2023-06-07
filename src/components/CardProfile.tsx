import '@/sass/components/_card-profile.scss';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { SiAboutdotme } from 'react-icons/si';

import Avatar from './Avatar';

interface CardProfileProps {
  avatar: string,
  name: string,
  email: string,
  phone?: string,
  biography: string,
}

export default function CardProfile({
  avatar,
  name,
  email,
  phone,
  biography,
}: CardProfileProps) {
  return (
    <div className="card-profile">
      <Avatar
        image={avatar}
        label={name}
        rounded
      />
      <ul className='u-list'>
        {email && (
          <li>
            <HiOutlineMail color="#00DFA2" className="icon" />
            <p>{email}</p>
          </li>
        )}
        {phone && (
          <li>
            <HiOutlinePhone color="#00DFA2" className="icon" />
            <p>{phone}</p>
          </li>
        )}
        <li>
          <SiAboutdotme color="#ffffff" className="icon" />
          <p>{biography}</p>
        </li>
      </ul>
    </div>
  )
}
