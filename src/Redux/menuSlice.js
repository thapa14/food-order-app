import { createSlice } from "@reduxjs/toolkit";

const getInitialUserList = () => {
  const localUserList = window.localStorage.getItem("userList");
  if (localUserList) {
    return JSON.parse(localUserList);
  } else return [];
};

const initialValue = {
  productList: [
    {
      name: "Hamburger",
      price: "200",
      quantity: 0,
      image: "./images/burger.jpeg",
    },
    {
      name: "Fries",
      price: "100",
      quantity: 0,
      image: "./images/fries.jpeg",
    },
    {
      name: "Coke",
      price: "50",
      quantity: 0,
      image: "./images/coke.jpeg",
    },
    {
      name: "Pepsi",
      price: "50",
      quantity: 0,
      image: "./images/pepsi.jpeg",
    },
  ],
  userList: getInitialUserList(),
  isAuthorize: false,
};

const foodAppSlice = createSlice({
  name: "foodApp",
  initialState: initialValue,
  reducers: {
    increment: (state, action) => {
      const newList = state.productList.map((product) => {
        if (product.name === action.payload.name) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        } else {
          return { ...product };
        }
      });

      return {
        ...state,
        productList: newList,
      };
    },
    decrement: (state, action) => {
      const newList = state.productList.map((product) => {
        if (product.name === action.payload.name) {
          if (product.quantity) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          } else {
            return {
              ...product,
            };
          }
        } else {
          return { ...product };
        }
      });
      return {
        ...state,
        productList: newList,
      };
    },
    clearCart: (state, action) => {
      return {
        ...initialValue,
        isAuthorize: true,
      };
    },

    signUpFunc: (state, action) => {
      // const newUserList = [...state.userList, action.payload.userData];
      const newUser = action.payload.userData;
      state.userList.push(newUser);

      const userList = window.localStorage.getItem("userList");
      if (userList) {
        const userListArr = JSON.parse(userList);
        userListArr.push(newUser);
        window.localStorage.setItem("userList", JSON.stringify(userListArr));
      } else {
        window.localStorage.setItem("userList", JSON.stringify([newUser]));
      }
    },

    logInFunc: (state, action) => {
      const activeUser = state.userList.find(
        (product) => action.payload.userData.userEmail === product.userEmail
      );

      activeUser
        ? activeUser.userPassword === action.payload.userData.userPassword
          ? (state.isAuthorize = true)
          : (state.isAuthorize = false)
        : (state.isAuthorize = false);
    },
    logOut: (state, action) => {
      return {
        ...state,
        productList: [...initialValue.productList],
        isAuthorize: false,
      };
    },
  },
});

export const {
  increment,
  decrement,
  clearCart,
  signUpFunc,
  logInFunc,
  logOut,
} = foodAppSlice.actions;
export default foodAppSlice.reducer;
