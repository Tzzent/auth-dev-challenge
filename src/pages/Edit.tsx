import '@/sass/pages/_edit.scss';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaAngleLeft } from 'react-icons/fa';
import { IoMdWarning, IoMdSave } from 'react-icons/io';
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

import Input from '../components/inputs/Input';
import Container from '../components/Container';
import Head from '../components/Head';
import Button from '../components/Button';
import { useContext, useEffect, useState } from 'react';
import { AuthCtx } from '../auth/context/AuthCtx';
import useModal from '../hooks/useModal';

export default function Edit() {
  const {
    onOpen,
    setTitle,
    setDescription,
    setCallback,
  } = useModal();
  const { user, fetchUser } = useContext(AuthCtx);
  const [previewImage, setPreviewImage] = useState<string | undefined>(user?.photo?.url);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      photo: null,
      name: user?.name || '',
      biography: user?.biography || '',
      phone: user?.phone || '',
      email: user?.email || '',
      password: '',
    }
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.photo) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };

        reader.readAsDataURL(value.photo[0]);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch])

  const handleOnSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    if (data.photo) {
      formData.append('photo', data.photo[0]);
    }

    formData.append('name', data.name);
    formData.append('biography', data.biography);
    formData.append('phone', data.phone);
    formData.append('email', data.email);

    if (data.password !== '') {
      formData.append('password', data.password);
    }

    try {
      const response = axios.patch(`${import.meta.env.VITE_API_URL}/user/me`, formData, {
        withCredentials: true,
      });

      await toast.promise(
        response, {
        pending: 'Loading...',
        success: 'Updated!',
      });


      fetchUser();
      navigate('/');
    } catch (error: any) {
      if (typeof error.response.data.message === 'string') {
        return toast.error(error.response.data.message);
      }
      toast.error(error.response.data.message[0]);
    }
  };

  const hadleOnDelete = () => {
    setTitle('Are you sure?');
    setDescription('You are about to delete your account and all of your data. This cannot be undone.');
    setCallback(() => {
      const response = axios.delete(`${import.meta.env.VITE_API_URL}/user/me`, { withCredentials: true })
        .then(() => {
          fetchUser();
          navigate('/');
        });
      toast.promise(
        response,
        {
          pending: 'Loading...',
          success: 'User deleted!',
          error: 'Something went wrong!',
        }
      )
    })

    onOpen();
  }


  return (
    <div className="edit-container">
      <div className="btn-head">
        <Button
          onClick={() => navigate('/')}
          icon={FaAngleLeft}
          label="Back"
          btnStyle="link"
        />
      </div>
      <Container>
        <div className="box">
          <div className="item">
            <Head
              title="Change Info"
              titleSize={20}
              subtitle="Changes will be reflected to every services"
              subtitleSize={14}
            />
          </div>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="item">
              <div className="image-container" >
                <label className="box-image" htmlFor="photo">
                  <img
                    src={previewImage}
                    alt="Tzzent"
                  />
                  <div className="overlay">
                    <FaCamera size={25} color="#fff" />
                  </div>
                  <input
                    id="photo"
                    type="file"
                    {...register('photo')}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </label>
                <span>CHANGE PHOTO</span>
              </div>
            </div>
            <div className="item">
              <Input
                id="name"
                label="Name"
                register={register}
                placeholder="Enter your name..."
                required
                errors={errors}
                errorMessage="Please enter your name"
              />
            </div>
            <div className="item">
              <Input
                id="biography"
                label="Bio"
                type="textarea"
                register={register}
                placeholder="Enter your bio..."
                errors={errors}
                errorMessage="Please enter your bio"
              />
            </div>
            <div className="item">
              <Input
                id="phone"
                label="Phone"
                register={register}
                placeholder="Enter your phone..."
                errors={errors}
                errorMessage="Please enter your phone number"
              />
            </div>
            <div className="item">
              <Input
                id="email"
                label="Email"
                register={register}
                type="email"
                placeholder="Enter your email..."
                errors={errors}
                errorMessage="Please enter your email"
              />
            </div>
            <div className="item">
              <Input
                id="password"
                label="Password"
                register={register}
                type="password"
                placeholder="Enter your new password..."
              />
            </div>
            <div className='footer-btns'>
              <div className="item">
                <Button
                  icon={IoMdSave}
                  label="Save"
                  type="submit"
                  btnStyle="primary"
                />
              </div>
              <div className="item">
                <Button
                  onClick={hadleOnDelete}
                  icon={IoMdWarning}
                  label="Delete"
                  type="button"
                  btnStyle="warning"
                />
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}
