import { useState, useContext } from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import getDataContext from "../context/getDataContext";
import Modal from "./Modal";

const ListItem = ({ task }) => {
  const BASE_URL = import.meta.env.VITE_SERVERURL;
  const { getData } = useContext(getDataContext);
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todos/${task.id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <li className="w-full mx-0 my-3 rounded-xl shadow flex justify-between items-center">
      <div className="flex items-center gap-3">
        <TickIcon />
        <p className="text-xl w-[290px]">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="my-1 mx-0 py-1 px-2 bg-transparent uppercase border-2 border-gray-400 text-gray-400 rounded-2xl text-sm hover:bg-[rgb(182,223,186)] active:border-2 active:border-gray-400 active:text-white active:bg-[rgb(141,181,145)]"
        >
          EDIT
        </button>
        <button
          onClick={deleteItem}
          className="my-1 mx-0 py-1 px-2 bg-transparent uppercase border-2 border-red-400 text-red-400 rounded-2xl text-sm hover:bg-[rgb(255,201,193)] active:border-2 active:border-[rgb(255,175,163)] active:text-white"
        >
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal mode={"edit"} setShowModal={setShowModal} task={task} />
      )}
    </li>
  );
};

export default ListItem;
