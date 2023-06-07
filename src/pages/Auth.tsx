import '@/sass/pages/_auth.scss';
import { useContext, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { MdMail, MdLock } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import Button from '../components/Button';
import Container from '../components/Container';
import Head from '../components/Head';
import Input from '../components/inputs/Input';
import { AuthCtx } from '../auth/context/AuthCtx';

enum AuthState {
  SIGN_IN,
  SIGN_UP,
}

const socialProfiles = [
  {
    image: '/assets/images/Google.svg',
    name: 'google',
  },
  // {
  //   image: '/assets/images/Facebook.svg',
  //   name: 'facebook',
  // },
  {
    image: '/assets/images/Twitter.svg',
    name: 'twitter',

  },
  {
    image: '/assets/images/Github.svg',
    name: 'github',
  }
];

export default function Auth() {
  const {
    fetchUser,
  } = useContext(AuthCtx);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [auth, setAuth] = useState<AuthState>(AuthState.SIGN_UP);
  const {
    register,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleOnSubmit = async (data: FieldValues) => {
    try {
      if (auth === AuthState.SIGN_UP) {
        const response = axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, data,
          {
            withCredentials: true,
          }
        );

        await toast.promise(
          response, {
          pending: 'Loading...',
          success: 'You have successfully registered!',
        });

        fetchUser()
        navigate(from, { replace: true });
      }

      if (auth === AuthState.SIGN_IN) {
        const response = axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, data,
          {
            withCredentials: true,
          }
        );

        await toast.promise(
          response, {
          pending: 'Loading...',
          success: 'You have successfully signed in!',
        });
        fetchUser()
        navigate(from, { replace: true });
      }

    } catch (error: any) {
      if (typeof error.response.data.message === 'string') {
        return toast.error(error.response.data.message);
      }
      toast.error(error.response.data.message[0]);
    }
  }

  return (
    <div className='auth-container'>
      <Container>
        <div className='auth-box'>
          <div>
            <img
              src="/assets/images/devchallenges.svg"
              alt="devchallenges-logo"
            />
          </div>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Head
              title={
                `${auth === AuthState.SIGN_IN
                  ? 'Login'
                  : 'Join thousands of learners from around the world'
                }`
              }
              titleSize={20}
              subtitle={
                `${auth === AuthState.SIGN_IN
                  ? ''
                  : 'Master web development by making real-life projects. There are multiple paths for you to choose'
                } `
              }
              subtitleSize={18}
            />
            <Input
              id="email"
              type="email"
              register={register}
              icon={MdMail}
              placeholder="Email"
            />
            <Input
              id="password"
              register={register}
              type="password"
              icon={MdLock}
              placeholder="Password"
            />
            <Button
              label={auth === AuthState.SIGN_IN ? 'Login' : 'Start coding now'}
              type="submit"
              btnStyle="primary"
            />
          </form>
          <div className='footer'>
            <p>or continue with these social profile</p>
            <div>
              {socialProfiles.map((social, index) => (
                <a
                  key={index}
                  href={`${import.meta.env.VITE_API_URL}/auth/${social.name} `}
                >
                  <img
                    src={social.image}
                    alt={social.name}
                  />
                </a>
              ))}
            </div>
            {auth === AuthState.SIGN_IN ? (
              <p>Don't have an acoount yet? <button onClick={() => setAuth(AuthState.SIGN_UP)}>Register</button></p>
            ) : (
              <p>Already a member? <button onClick={() => setAuth(AuthState.SIGN_IN)}>Login</button></p>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
