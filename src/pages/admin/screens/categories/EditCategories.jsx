import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getSingleCategory,
  updateCategory,
} from '../../../../services/index/postCategories';
import toast from 'react-hot-toast';

const EditCategories = () => {
  const queryClient = useQueryClient();
  const [categoryTitle, setCategoryTitle] = useState('');
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSingleCategory({ slug }),
    queryKey: ['categories', slug],
  });

  const { mutate: mutateUpdateCategory, isLoading: updateCategoryIsLoading } =
    useMutation({
      mutationFn: ({ title, slug, token }) => {
        return updateCategory({
          title,
          slug,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['categories', slug]);
        toast.success('Category updated successfully');
        navigate(`/admin/categories/manage/edit/${data._id}`, {
          replace: true,
        });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdateCategory = () => {
    if (!categoryTitle) return;
    mutateUpdateCategory({
      title: categoryTitle,
      slug,
      token: userState.userInfo.token,
    });
  };

  useEffect(() => {
    if (data) {
      setCategoryTitle(data?.title);
    }
  }, [data]);
  return (
    <div className="col-span-4 py-8">
      <h4 className="text-lg leading-tight">Update Category</h4>
      <div className="d-form-control w-full mt-6">
        <input
          value={categoryTitle}
          className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
          onChange={(e) => setCategoryTitle(e.target.value)}
          placeholder="category title"
        />
        <button
          disabled={updateCategoryIsLoading || isLoading || isError}
          type="button"
          onClick={handleUpdateCategory}
          className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Update Category
        </button>
      </div>
    </div>
  );
};

export default EditCategories;
