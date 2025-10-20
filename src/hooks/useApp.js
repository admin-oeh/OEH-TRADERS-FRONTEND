import { API } from '../utils/constants';

export const useApp = () => {
  const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user_token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.detail || "Login failed" };
      }
    } catch (err) {
      console.error(err);
      return { success: false, error: "Server error" };
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: data.detail || "Registration failed" };
      }
    } catch (err) {
      console.error(err);
      return { success: false, error: "Server error" };
    }
  };

  return { loginUser, registerUser };
};