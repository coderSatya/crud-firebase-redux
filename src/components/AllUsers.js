import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import firebase from "firebase/compat/app";
import { deleteUser } from "../features/User/UserSlice";
import { useDispatch } from "react-redux";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    const listData = () => {
      firebase
        .firestore()
        .collection("UserDatabase")
        .onSnapshot((snapshot) => {
          const UserList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // .filter((e) => e.deletedAt === 0);
          setAllUsers(UserList);
        });
    };
    listData();
  }, []);
  console.log(allUsers, "11111111111111111");
  const handleDelete = (id) => {
    alert("Are you sure you want to delete this id ?");
    dispatch(deleteUser({ id: id }));
    // await deleteDoc(doc(db, "userDatabase", id));

    navigate("/");
  };
  //   const handleDelete = async (userId) => {
  //     try {
  //       alert("Are you sure you want to delete this id ?");
  //       await userDB.doc(userId).delete();
  //       dispatch(deleteUser({ userId: userId }));
  //       navigate("/");
  //     } catch (error) {
  //       console.error("Error deleting document:", error);
  //     }
  //   };

  return (
    <>
      <Link to="/adduser">
        <button className="bg-red-500 text-white font-semibold rounded-sm my-5 py-2 px-4">
          ADD USER
        </button>
      </Link>
      <div className="w-[70%] mx-auto">
        <table className="table table-dark table-striped my-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers &&
              allUsers?.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.userName}</td>
                    <td>{user.userEmail}</td>
                    <td>{user.userContact}</td>
                    <td>
                      <button>
                        <Link to={`/edit/${user.id}`}>
                          <FaEdit size={32} color="white" className="mr-3" />
                        </Link>
                      </button>
                      <button>
                        <Link to={`/`} onClick={() => handleDelete(user.id)}>
                          <FaTrash size={32} color="white" />
                        </Link>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
