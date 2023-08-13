import React, { useState, useEffect } from "react";
import { createUser } from "../features/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { editUser } from "../features/User/UserSlice";
import firebase from "firebase/compat/app";

const UpdateUser = () => {
  //   const [userName, setUserName] = useState("");
  //   const [userEmail, setUserEmail] = useState("");
  //   const [userContact, setUserContact] = useState("");
  const [paramsId, setParamasId] = useState();
  const [values, setValues] = useState({
    userName: "",
    userEmail: "",
    userContact: "",
  });
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const params = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    firebase
      .firestore()
      .collection("UserDatabase")
      .doc(params.id)
      .get()
      .then((response) => setValues(response.data()));
    // .then((response) => console.log(response.data, "3333333"));
  }, [params.id]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const updatedUser = () => {
    setValues({
      userName: "",
      userEmail: "",
      userContact: "",
    });
    dispatch(
      editUser({
        id: params.id,
        userName: values.userName,
        userEmail: values.userEmail,
        userContact: values.userContact,
      })
    );
    navigate("/dashboard");
  };

  return (
    <>
      <form className="w-full max-w-lg mx-auto my-5" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-name"
            >
              Name
            </label>
            <input
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-name"
              type="text"
              placeholder="Jane"
              name="userName"
              value={values.userName}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              value={values.userEmail}
              name="userEmail"
              onChange={handleChange}
              type="email"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-contact"
            >
              Contact
            </label>
            <input
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-contact"
              value={values.userContact}
              name="userContact"
              onChange={handleChange}
              type="number"
              placeholder="contact number"
            />
          </div>
        </div>

        <button
          className="bg-red-500 text-white font-semibold rounded-sm py-2 px-4"
          onClick={updatedUser}
          type="submit"
        >
          Updated User
        </button>
      </form>
    </>
  );
};

export default UpdateUser;
