import React from 'react';
import { FaUsers, FaComments } from 'react-icons/fa';
import { MdCategory, MdPostAdd } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import StatCard from '../components/StatCard';
import { getTotalCommentsCount } from '../../../services/index/comments';
import { getTotalUsersCount } from '../../../services/index/users';
import { getTotalPostsCount } from '../../../services/index/posts';
import { getTotalCategoriesCount } from '../../../services/index/postCategories';

const Admin = () => {
  const userState = useSelector((state) => state.user);
  const token = userState?.userInfo?.token;

  // Fetch total counts
  const { data: totalUsersCount, isLoading: usersLoading } = useQuery({
    queryKey: ['totalUsersCount'],
    queryFn: () => getTotalUsersCount(token),
    enabled: !!token,
  });

  const { data: totalCommentsCount, isLoading: commentsLoading } = useQuery({
    queryKey: ['totalCommentsCount'],
    queryFn: () => getTotalCommentsCount(token),
    enabled: !!token,
  });

  const { data: totalPostsCount, isLoading: postsLoading } = useQuery({
    queryKey: ['totalPostsCount'],
    queryFn: getTotalPostsCount, // No token required if fetching totals
  });

  const { data: totalCategoriesCount, isLoading: categoriesLoading } = useQuery(
    {
      queryKey: ['totalCategoriesCount'],
      queryFn: getTotalCategoriesCount, // No token required if fetching totals
    }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<FaUsers />}
        title="Users"
        count={usersLoading ? 'Loading...' : totalUsersCount}
        color="blue"
      />
      <StatCard
        icon={<FaComments />}
        title="Comments"
        count={commentsLoading ? 'Loading...' : totalCommentsCount}
        color="green"
      />
      <StatCard
        icon={<MdPostAdd />}
        title="Posts"
        count={postsLoading ? 'Loading...' : totalPostsCount}
        color="red"
      />
      <StatCard
        icon={<MdCategory />}
        title="Categories"
        count={categoriesLoading ? 'Loading...' : totalCategoriesCount}
        color="purple"
      />
    </div>
  );
};

export default Admin;
