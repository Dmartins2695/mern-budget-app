import { createSlice } from '@reduxjs/toolkit';
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLogin: false,
  },
  reducers: {
    setLogin(state, action) {
      state.isLogin = action.payload.isLogin;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLogin = false;
      state.token = null;
    },
  },
});

export const { setLogin, logout } = authSlice.actions;

export const initializeKeycloak = () => (dispatch) => {
  keycloak.init({ onLoad: 'check-sso' }).then((authenticated) => {
    if (authenticated) {
      dispatch(setLogin({ isLogin: true, token: keycloak.token }));
    }
  });

  keycloak.onTokenExpired = () => {
    keycloak.updateToken(5).then((refreshed) => {
      if (refreshed) {
        dispatch(setLogin({ isLogin: true, token: keycloak.token }));
      } else {
        dispatch(logout());
      }
    }).catch(() => {
      dispatch(logout());
    });
  };
};

export const performLogin = () => (dispatch) => {
  keycloak.login().then((authenticated) => {
    if (authenticated) {
      dispatch(setLogin({ isLogin: true, token: keycloak.token }));
    }
  });
};

export const performLogout = () => (dispatch) => {
  keycloak.logout();
  dispatch(logout());
};

export default authSlice.reducer;
