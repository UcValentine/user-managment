import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../src/store";
import { fetchUsers, deleteUser, sortUsers } from "../src/db";
import { User } from "../src/types";

const Home = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSort = () => {
    dispatch(sortUsers());
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      dispatch(deleteUser(selectedUser.id));
      setShowModal(false);
      setSelectedUser(null);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleEdit = (id: number) => {
    router.push(`/edit/${id}`);
  };

  return (
    <div>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <button onClick={handleSort}>Sort by username</button>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <Link href={`/edit/${user.id}`}>
                  <a>{user.name}</a>
                </Link>{" "}
                ({user.username}) - {user.city} - {user.email}{" "}
                <button onClick={() => handleEdit(user.id)}>Edit</button>{" "}
                <button onClick={() => handleDelete(user)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
      {showModal && (
        <div>
          <p>Are you sure you want to delete this user?</p>
          <button onClick={handleConfirmDelete}>Delete</button>{" "}
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}
      <Link href="/add">
        <a>Add new</a>
      </Link>
    </div>
  );
};

export default Home;
