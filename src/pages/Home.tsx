import '@/sass/pages/_home.scss';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCtx } from '../auth/context/AuthCtx';

import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Container from "../components/Container";
import Head from "../components/Head";

export default function Home() {
  const { user } = useContext(AuthCtx);
  const navigate = useNavigate();

  const renderItems = [
    {
      label: "name",
      description: user?.name,
    },
    {
      label: "bio",
      description: user?.biography,
    },
    {
      label: "phone",
      description: user?.phone,
    },
    {
      label: "email",
      description: user?.email,
    },
    {
      label: "password",
      description: "**********",
    }
  ]

  return (
    <div className="home-container">
      <Head
        title="Personal info"
        subtitle="Basic info, like your name and photo"
        center
      />
      <Container>
        <div className="box">
          <div className="head-box">
            <Head
              title="Profile"
              titleSize={20}
              subtitle="Some info may be visible to other people"
              subtitleSize={14}
            />
            <Button
              label="Edit"
              onClick={() => navigate('/edit')}
              btnStyle="outline"
            />
          </div>
          <div className="item">
            <span className="label">photo</span>
            <div>
              <Avatar
                image={user?.photo?.url}
                width={8}
              />
            </div>
          </div>
          {renderItems.map((item, index) => (
            <div
              key={index}
              className="item"
            >
              <span className="label">{item.label}</span>
              <div>{item.description}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
