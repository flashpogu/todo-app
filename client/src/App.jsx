import { useEffect, useState } from "react";
import getDataContext from "./context/getDataContext";
import Auth from "./components/Auth";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const BASE_URL = import.meta.env.VITE_SERVERURL;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  console.log(tasks);

  // Sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <getDataContext.Provider value={{ getData }}>
      <div className="bg-white shadow-md rounded-md px-3 py-3 w-[800px] mt-14">
        {!authToken && <Auth />}
        {authToken && (
          <>
            {" "}
            <ListHeader listName={"📜 Things to do"} getData={getData} />
            <p className="float-right text-base my-6 mx-1 text-[rgba(114,114,114,0.74)]">
              Welcome back, {userEmail}
            </p>
            {sortedTasks?.map((task) => (
              <ListItem key={task.id} task={task} />
            ))}
          </>
        )}
        <p className="text-xs mt-4 mx-1 text-[rgb(114,114,114)]">
          Creative Coding LLC
        </p>
      </div>
    </getDataContext.Provider>
  );
};

export default App;
