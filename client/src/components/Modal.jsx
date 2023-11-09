import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import getDataContext from "../context/getDataContext";

const Modal = ({ mode, setShowModal, task }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const BASE_URL = import.meta.env.VITE_SERVERURL;
  const { getData } = useContext(getDataContext);
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log("Worked");
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/todos/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    console.log("Changing..", e);
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));

    console.log(data);
  };
  return (
    <div className="absolute left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <div className="w-[500px] bg-white px-10 py-10 rounded-xl shadow-xl">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Let's {mode} your task</h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-lg active:text-red-500"
            >
              x
            </button>
          </div>
          <div className="flex flex-col">
            <form className="flex flex-col gap-8">
              <input
                className="my-5 py-3 px-4 rounded-xl border border-[rgb(230,232,236)] outline-none"
                type="text"
                required
                maxLength={30}
                placeholder="Your task goes here"
                name="title"
                value={data.title}
                onChange={handleChange}
              />
              <div className="flex flex-col gap-4">
                <label htmlFor="range">
                  Drag to select your current progress
                </label>
                <input
                  type="range"
                  id="range"
                  required
                  min="0"
                  max="100"
                  name="progress"
                  value={data.progress}
                  onChange={handleChange}
                />
              </div>
              <input
                className={`py-2 border-2 uppercase tracking-wide text-sm border-gray-300 text-gray-600 rounded-xl cursor-pointer bg-gray-100 active:bg-[rgb(141,181,145)]`}
                type="submit"
                onClick={editMode ? editData : postData}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
