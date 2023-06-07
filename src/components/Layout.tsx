import '@/sass/components/_layout.scss';
import { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MdArrowDropUp } from 'react-icons/md';
import {
  FaUserCircle,
  FaUserFriends,
  FaSignOutAlt
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

import Avatar from './Avatar';
import Dropdown from './modals/Dropdown';
import { AuthCtx } from '../auth/context/AuthCtx';
import Modal from '../components/modals/Modal';

export default function Layout() {
  const {
    user,
    setUser,
    setIsAuthenticated,
  } = useContext(AuthCtx);
  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await toast.promise(
      axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        withCredentials: true
      }), {
      pending: 'Loading...',
      success: 'You have successfully logged out!',
      error: 'Something went wrong, please try again!'
    });

    const responseData = response.data;

    if (responseData.msg !== 'ok') {
      setUser(null);
      setIsAuthenticated(false);
      return navigate('/auth');
    }
  };

  const dropdownItems = [
    {
      icon: FaUserCircle,
      label: 'Dashboard',
      onClick: () => navigate('/'),
    },
    {
      icon: FaUserFriends,
      label: 'Group Chat',
      onClick: () => navigate('/group-chat'),

    },
    {
      icon: FaSignOutAlt,
      label: 'Logout',
      onClick: handleLogout,
    },
  ]

  return (
    <>
      <nav className="nav-container">
        <div className="nav-left">
          <Link to='/'>
            <img
              src="/assets/images/devchallenges.svg"
              alt="devchallenges-logo"
            />
          </Link>
        </div>
        <div
          onClick={() => setShowDropDown(!showDropDown)}
          className="nav-right"
        >
          <Avatar
            image={user?.photo?.url}
            label={user?.name}
          />
          <MdArrowDropUp
            className={`
            icon
            ${showDropDown && 'icon-rotate'}
            `}
          />
          <Dropdown
            isOpen={showDropDown}
            onClose={() => setShowDropDown(false)}
            items={dropdownItems}
          />
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <Modal />
    </>
  )
}
