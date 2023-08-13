import { createSlice } from "@reduxjs/toolkit";
import { userRecord } from "../../UserRecord/UserRecord";
import db from "../../firebase";
const userDB = db.collection("UserDatabase");

const userSlice = createSlice({
  name: "users",
  initialState: userRecord,
  reducers: {
    createUser: (state, action) => {
      // state.push(action.payload);
      userDB.add(action.payload);
    },
    editUser: (state, action) => {
      console.log(action, "5555555");
      // state.push(action.payload);
      userDB.doc(action.payload.id).update(action.payload);
    },
    deleteUser: (state, action) => {
      console.log(action, "44444444444");

      // userDB.doc(action.payload.id).delete();
      //   userDB.doc(action.payload.id).update({ deletedAt: new Date() });
      userDB.doc(action.payload.id).delete();
    },
    // },
  },
});
export const { createUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
