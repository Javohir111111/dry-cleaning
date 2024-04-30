import { NavLink } from "react-router-dom";
import "./style.scss";


const index = () => {
    return (
        <aside className=" basis-1/4 bg-slate-700 min-h-[100vh]"                    >
           <div className="w-full flex flex-col">
              <NavLink to={"brands"} className="text-white text-center w-full duration-300 py-2 hover:bg-white hover:text-slate-700 ">Brands</NavLink>
              <NavLink to={"models"} className="text-white text-center w-full duration-300 py-1 hover:bg-white hover:text-slate-700 ">Models</NavLink>
              <NavLink to={"products"} className="text-white text-center w-full duration-300 py-1 hover:bg-white hover:text-slate-700 ">Products</NavLink>
           </div>
        </aside>
    );
};

export default index;