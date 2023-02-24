import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addUser } from '../src/usersSlice';

const Add = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    dispatch(addUser(data));
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input type="text" {...register("name", { required: true })} />
        {errors.name && <p>Name is required</p>}
        <label>Username:</label>
        <input type="text" {...register("username", { required: true })} />
        {errors.username && <p>Username is required</p>}
        <label>Email:</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <p>Email is required</p>}
        <label>City:</label>
        <input type="text" {...register("city", { required: true })} />
        {errors.city && <p>City is required</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Add;
