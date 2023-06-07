import '@/sass/pages/_group.scss';
import { useEffect, useState } from 'react';
import { UserProps } from '../auth/context/AuthCtx';

import Head from '../components/Head';
import Container from '../components/Container';
import CardProfile from '../components/CardProfile';

export type ProfileProps = Pick<
  UserProps, Exclude<keyof UserProps, 'email'>
> & {
  user: {
    _id: string,
    email: string,
  }
}

export default function Group() {
  const [profiles, setProfiles] = useState<ProfileProps[] | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/all`);
      const data = await response.json();
      setProfiles(data);
    }
    fetchProfiles();
  }, []);

  return (
    <div className="group-container">
      <Container>
        <div className="group-box">
          <Head
            title="Profiles created"
            titleSize={25}
            subtitle={`${profiles?.length} profiles created to date`}
            subtitleSize={12}
            center
          />
          {
            profiles?.map((profile, index) => (
              <CardProfile
                key={index}
                avatar={profile.photo.url}
                name={profile.name}
                email={profile.user.email}
                phone={profile?.phone}
                biography={profile?.biography}
              />
            ))
          }
        </div>
      </Container>
    </div>
  )
}
