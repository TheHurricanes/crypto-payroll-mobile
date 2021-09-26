export const usernameRegEx = /^[a-zA-Z0-9_-]{3,35}$/
export const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;
export const nameRegEx = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

export const isUsername = (username) => {
  return userNameRegEx.test(username.toLowerCase());
};

export const isPassword = (password) => {
  return passwordRegEx.test(password);
};

// https://stackoverflow.com/a/45871742/7602110
export const isName = (name) => {
  return nameRegEx.test(name);
};