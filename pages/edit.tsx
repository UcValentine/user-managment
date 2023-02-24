import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../src/store';
import { updateUser } from '../src/usersSlice';

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.users.find((user: { id: number; }) => user.id === Number(id)));

  const onSubmit = (data: any) => {
    dispatch(updateUser({ id: Number(id), data }));
  };

  return (
    <div>
      <h1>Edit User</h1>
      {user && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name:</label>
          <input type="text" defaultValue={user.name} {...register("name", { required: true})} />
            {errors.name && <p>Name is required</p>}

            <label>Username:</label>
            <input type="text" defaultValue={user.username} {...register("username", { required: true })} />
            {errors.username && <p>Username is required</p>}

            <label>Email:</label>
            <input type="email" defaultValue={user.email} {...register("email", { required: true, pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })} />
            {errors.email && <p>Email is required</p>}

            <label>City:</label>
            <input type="text" defaultValue={user.city} {...register("city", { required: true })} />
            {errors.city && <p>City is required</p>}

            <button type="submit">Save</button>
            </form>
        )}
    </div>
    );
};

export default Edit;