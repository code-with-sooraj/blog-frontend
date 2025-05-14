import svg from "../assets/404.svg";
import {Link} from "react-router-dom";
import UserContext from "../context/CreateContext";
import { useContext } from "react";

const PageNotFound = () => {
  const {darkMode} = useContext(UserContext);
  return (
    <div className={`${darkMode? "bg-gray-700":"bg-white"} mt-15 cont-404 flex flex-col items-center justify-center p-4`}>
        <img src={svg} alt="svg" height={400} width={400} />
        <Link to={'/'} className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer">Back to Home</Link>
    </div>
  )
}

export default PageNotFound