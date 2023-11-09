import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(false);
  const signOut = () => {
    console.log("signout");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl font-bold my-8">{listName}</h1>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="my-1 mx-0 py-1 px-2 bg-transparent uppercase border-2 border-[rgba(0,0,0,0.38)] text-[rgba(0,0,0,0.8)] rounded-2xl text-sm hover:bg-gray-200 active:bg-gray-300"
        >
          Add New
        </button>
        <button
          className="my-1 mx-0 py-1 px-2 bg-transparent uppercase rounded-2xl text-sm"
          onClick={signOut}
          id="signouttt"
        >
          {" "}
          Sign Out
        </button>
      </div>
      {showModal && <Modal mode={"create"} setShowModal={setShowModal} />}
    </div>
  );
};

export default ListHeader;
