import defaultUser from "../utils/default-user";
import useStore from "../project/store";
import axios from "axios";

const IP = "194.87.239.231:55555";
const LOGON = "api/logon";
const GET_PRICELIST = "api/document";

// Вызов функции обновления состояния
// counterStore.increment(); // Увеличивает счетчик на 1
// counterStore.decrement(); // Уменьшает счетчик на 1

export async function signIn(email, password) {
  // const store = useStore();
  // const setLogin = store.login;
  // const setPassword = store.password;
  try {
    alert(2);
    const getUser = await axios.post(`http://${IP}/${LOGON}`, {
      login: email,
      password,
    });
    console.log(getUser);
    const response = getUser;
    // localStorage.clear();
    // localStorage.setItem("login", response.data.user.login);
    // localStorage.setItem("token", response.data.result);
    // setLogin(response.data.user.login);
    // setPassword(response.data.result);
    // // Send request
    // console.log(email, password);

    //window.userInfo.login = response.data.user.login;
    //window.userInfo.token = response.data.result;

    // defaultUser.login = response.data.user.login;
    // defaultUser.token = response.data.result;

    return {
      isOk: true,
      data: {
        login: email,
        token: response.data.result,
      },
    };
  } catch {
    return {
      isOk: false,
      message: "SignIn failed",
    };
  }
}

export async function getUser() {
  try {
    // Send request

    return {
      isOk: true,
      data: defaultUser,
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request
    console.log(email, password);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to create account",
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to change password",
    };
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to reset password",
    };
  }
}
