// import { useEffect } from 'react'
// import { useNavigate } from "react-router-dom";

// function index() {
//   const navigate = useNavigate();

//   const navigetBtn = () => {
//     if (localStorage.getItem("token")) {
//       navigate("/home");
//     }else{
//         navigate("/"); 
//     }
//   };

//   // useEffect(() => {
//   //     if (localStorage.getItem("token")) {
//   //       navigate("/home");
//   //     }
//   //   }, []);

//   return (
//     <section className="page_404">
//       <div className="container">
//         <div className="row">
//           <div className="col-sm-12 ">
//             <div className="col-sm-10 col-sm-offset-1  text-center">
//               <div className="four_zero_four_bg">
//                 <h1 className="text-center ">404</h1>
//               </div>

//               <div className="contant_box_404">
//                 <h3 className="h2">Look like you're lost</h3>

//                 <p>the page you are looking for not avaible!</p>

//                 <button onClick={()=>navigetBtn()} className="link_404">Go to Home</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default index;

const index = () => {
  return (
    <div>Error</div>
  )
}

export default index
