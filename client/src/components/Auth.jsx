import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_SERVERURL;

  console.log(cookies);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Make sure password match!");
      return;
    }
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);

      window.location.reload();
    }
  };

  return (
    <div className="flex justify-center my-12 mx-12">
      <div className="w-[500px] rounded-xl overflow-hidden shadow-xl">
        <form className="flex flex-col h-[350px] px-5 py-5">
          <h2 className="text-2xl font-semibold">
            {isLogin ? "Please log in" : "Please Sign up"}
          </h2>
          <input
            className="my-5 py-3 px-4 rounded-xl border border-[rgb(230,232,236)] outline-none focus:bg-[rgb(223,241,249)]"
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mb-5 py-3 px-4 rounded-xl border border-[rgb(230,232,236)] outline-none focus:bg-[rgb(223,241,249)]"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              className="mb-5 py-3 px-4 rounded-xl border border-[rgb(230,232,236)] outline-none focus:bg-[rgb(223,241,249)]"
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
            className="create"
          />
          {error && <p>{error}</p>}
        </form>
        <div className="flex">
          <button
            className="w-2/4 px-3 py-3 text-[rgb(35,38,47)]"
            style={{ backgroundColor: !isLogin ? "#fff" : "#bcbcbc" }}
            onClick={() => viewLogin(false)}
          >
            Sign Up
          </button>
          <button
            className="w-2/4 px-3 py-3 text-[rgb(35,38,47)]"
            style={{ backgroundColor: isLogin ? "#fff" : "#bcbcbc" }}
            onClick={() => viewLogin(true)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
