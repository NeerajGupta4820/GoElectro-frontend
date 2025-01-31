import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupimg from "../../assets/Images/signup/img.webp";
import "./Signup.css";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/UserContext";
import { useRegisterUserMutation } from "../../redux/api/userAPI";

const Signup = () => {
  const { user, loginUser } = useContext(UserContext);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age:"",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    if (file && !allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type! Please upload an image (JPG, PNG, GIF).",
        {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        }
      );
      return;
    }

    const cloudName = `${import.meta.env.VITE_CLOUD_NAME}`;
    const uploadPreset = "IBM_Project";
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      toast.info("Uploading image, please wait...", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });

      const res = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedFileUrl = res.data.secure_url;

      toast.success("File uploaded successfully!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });

      console.log("Uploaded File URL:", uploadedFileUrl);
      setFormData((prevData) => ({
        ...prevData,
        photo: uploadedFileUrl,
      }));
    } catch (error) {
      toast.error(`File upload failed: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      // isLoading(true);
      const { name, email, password, } = formData;
      if (!name || !email || !password) {
        toast("⚠️ All fields are mandatory", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          draggable: true,
          theme: "dark",
        });
        return;
      }

      const res = await registerUser(formData).unwrap();

      toast.success("SignUp Successfull", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        draggable: true,
        theme: "dark",
      });

      console.log(res);
      loginUser(res.user, res.token);
      // isLoading(false);
      navigate("/");
    } catch (error) {
      console.error("SignUp Error:", error);

      toast.error(`❌ SignUp failed: ${error.data?.message || error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        theme: "dark",
      });
      isLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="main-signup">
      <div className="signup-img">
        <img src={signupimg} alt="Signup" />
      </div>
      <div className="signup-content">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="tel"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Upload Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {/* {formData.photo && (
            <div className="preview">
              <h3>Selected Photo:</h3>
              <img src={formData.photo} alt="Selected" style={{ width: '80px', height: 'auto' }} />
            </div>
          )} */}
          <button type="submit">Sign Up</button>
          <div className="links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <span> | </span>
            <Link to="/login">SignIn</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
