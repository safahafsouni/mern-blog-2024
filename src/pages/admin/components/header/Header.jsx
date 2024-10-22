import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { images } from '../../../../constants';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaComments, FaUser } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import NavItem from './NavItem';
import NavItemCollapse from './NavItemCollapse';
import { useWindowSize } from '@uidotdev/usehooks';
import toast from 'react-hot-toast';
import { createPost } from '../../../../services/index/posts';

const Header = () => {
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState('dashboard');

  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const { mutate: mutateCreatePost, isLoading: createPostIsLoading } =
    useMutation({
      mutationFn: ({ token }) => {
        return createPost({ token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['posts']);
        toast.success('Post created successfully, edit that now!');
        navigate(`/admin/posts/manage/edit/${data.slug}`);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (useWindowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  const handleCreateNewPost = ({ token }) => {
    mutateCreatePost({ token });
  };

  return (
    <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
      {/* logo */}
      <Link to="/">
        <img src={images.Logo} alt="logo" className="w-18 h-10 lg:hidden" />
      </Link>
      {/* menu burger icon */}
      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="w-6 h-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="w-6 h-6" onClick={toggleMenuHandler} />
        )}
      </div>
      {/* sidebar container */}
      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          {/* underlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHandler}
          />
          {/* sidebar */}
          <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6">
            <Link to="/">
              <img src={images.Logo} alt="logo" className="w-18 h-10" />
            </Link>
            <h4 className="mt-10 font-bold text-[#C7C7C7]">MAIN MENU</h4>
            {/* menu items */}
            <div className="mt-6 flex flex-col gap-y-[0.563rem]">
              <NavItem
                title="Dashboard"
                link="/admin"
                icon={<AiFillDashboard className="text-xl" />}
                name="dashboard"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItem
                title="Comments"
                link="/admin/comments"
                icon={<FaComments className="text-xl" />}
                name="comments"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItemCollapse
                title="Posts"
                icon={<MdDashboard className="text-xl" />}
                name="posts"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                <Link
                  to="/admin/posts/manage"
                  className={`${
                    activeNavName === 'posts-manage'
                      ? 'text-primary font-bold'
                      : 'text-gray-500'
                  } hover:text-primary`}
                >
                  Manage all posts
                </Link>
                <button
                  disabled={createPostIsLoading}
                  className={`text-start disabled:opacity-60 disabled:cursor-not-allowed ${
                    activeNavName === 'posts-add'
                      ? 'text-primary font-bold'
                      : 'text-gray-500'
                  } hover:text-primary`}
                  onClick={() =>
                    handleCreateNewPost({ token: userState.userInfo.token })
                  }
                >
                  Add New Post
                </button>
                <Link
                  to="/admin/categories/manage"
                  className={`${
                    activeNavName === 'categories'
                      ? 'text-primary font-bold'
                      : 'text-gray-500'
                  } hover:text-primary`}
                >
                  Categories
                </Link>
              </NavItemCollapse>
              <NavItem
                title="Users"
                link="/admin/users/manage"
                icon={<FaUser className="text-xl" />}
                name="users"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
