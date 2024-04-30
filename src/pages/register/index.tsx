import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// -----------Modal-------------
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
//------------------------
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMask } from "@react-input/mask";
import { Button, TextField } from "@mui/material";
import useRegisterStore from "@register"
import "./style.scss";
import axios from "axios";

const index = () => {
  const { register } = useRegisterStore()
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });
  //----------modal-----------
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onRegister = async (e: any) => {
    e.preventDefault();
    const verify = {
      code: e.target[0].value,
      email: e.target[1].value
    };
    try {
      const data = await axios.post(
        "https://app.olimjanov.uz/v1/auth/verify",
        verify
      );
      if (data.status == 201) {
        handleClose()
        localStorage.setItem("token", data?.data?.accessToken);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
      console.log(data);

    } catch (e) {
      console.log(e);
    }

  }
  //--------------------------
  const navigate = useNavigate();

  interface initialValues {
    email: string;
    full_name: string;
    password: string;
    phone_number: string;
  }
  const initialValues: initialValues = {
    email: "",
    full_name: "",
    password: "",
    phone_number: "",
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const schema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("Required"),
    full_name: Yup.string().min(5, "Username invalid ").required("Username is required"),
    password: Yup.string().min(6, "Passwod invalid ").required("Password is required"),
    phone_number: Yup.string().min(19, "Phone invalid ").required("Phone is required"),
  });

  const handelSubmit = async (value: initialValues) => {

    // console.log(value);

    const phone_number = value.phone_number.replace(/\D/g, "");
    const neWFormData: initialValues = { ...value, phone_number: `+${phone_number}` };

    const respons = await register("/auth/register", neWFormData);
    if (respons.status === 200) {
      setEmail(value.email)
      handleOpen();

    }
  };

  return (
    <>
      <div className="refister-wrapp w-full h-[100vh] flex items-center justify-center">
        <div className=" max-w-[700px] w-full border rounded-3xl bg-transparent py-7 px-5 flex flex-col items-center justify-center">
          <h1 className="text-[24px] text-white mb-3 bg-slate-500">Form Registrator</h1>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form action="" onSubmit={onRegister}>
                <input type="text" placeholder="code" />
                <input type="text" placeholder="email" />
                <button>verify</button>
              </form>
            </Box>
          </Modal>

          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handelSubmit}
          >
            <Form className="flex flex-col items-center w-full">
              <Field
                as={TextField}
                label="Email"
                sx={{ "& input": { color: "#fff", fontSize: "20px" } }}
                type="email"
                name="email"
                className=" w-[90%] mb-3 text-white outline-none"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="mb-3 text-red-500"
              />
              <Field
                as={TextField}
                label="Full Name"
                sx={{ "& input": { color: "#fff", fontSize: "20px" } }}
                type="text"
                name="full_name"
                className=" w-[90%] mb-3 text-white outline-none"
              />
              <ErrorMessage
                name="full_name"
                component="p"
                className="mb-3 text-red-500"
              />

              <Field
                as={TextField}
                sx={{ "& input": { color: "#fff", fontSize: "20px" } }}
                label="Password"
                type="password"
                name="password"
                className=" w-[90%] mb-3  text-white  "
              />
              <ErrorMessage
                name="password"
                component="p"
                className="mb-3 text-red-500"
              />

              <Field
                as={TextField}
                sx={{ "& input": { color: "#fff", fontSize: "20px" } }}
                label="Phone Number"
                type="tel"
                name="phone_number"
                inputRef={inputRef}
                className=" w-[90%] mb-3  text-white"
              />
              <ErrorMessage
                name="phone_number"
                component="p"
                className="mb-3 text-red-500"
              />
              <Button
                sx={{ color: "blue", fontSize: "16px", fontWeight: "500" }}
                variant="contained"
                type="submit"
                className="w-[90%] py-2  bg-white"
              >
                Submit
              </Button>
            </Form>
          </Formik>

          <Button
            sx={{ color: "blue", fontSize: "16px", fontWeight: "500" }}
            onClick={() => navigate("/login")}
            variant="contained"
            type="submit"
            className="w-[90%] py-2 mt-3 bg-white "
          >
            Login
          </Button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default index;


// const index = () => {
//   return (
//     <div>Register</div>
//   )
// }

// export default index