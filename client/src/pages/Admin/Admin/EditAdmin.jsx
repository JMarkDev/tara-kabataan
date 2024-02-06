import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import api from "../../../api/api";

const EditAdmin = () => {
    const { id } = useParams()
    const navigate = useNavigate();
  
    const [values, setValues] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "", 
    });
  
    const [firstnameError, setfirstnameError] = useState("");
    const [LastnameError, setLastnameError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/user/id/${id}`)
                console.log(response.data)
                setValues((prevData) => ({
                    ...prevData,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    email: response.data.email,
                    gender: response.data.gender
                }))
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id])

    const handleUpdate = async (e) => {
      e.preventDefault();
    
      // Clear error messages when the user submits the form
      setfirstnameError("");
      setLastnameError("");
      setGenderError("");
      setPasswordError("");
      setConfirmPasswordError("");
    
      try {
        const response = await api.put(`/user/update/${id}`, values)

        if (response.data.status === "success") {
            alert('Updated Successfully')
            navigate('/admin')
        } else {
          alert(response.data.message);
        }
        
      } catch (error) {
    
        if (error.response && error.response.data.errors) {
          error.response.data.errors.forEach((error) => {
            switch (error.path) {
              case 'firstname':
                setfirstnameError(error.msg);
                break;
              case 'lastname':
                setLastnameError(error.msg);
                break;
              case 'gender':
                setGenderError(error.msg);
                break;
              case 'password':
                setPasswordError(error.msg);
                break;
              case 'confirmPassword':
                setConfirmPasswordError(error.msg);
                break;
              default:
                // Handle other errors as needed
                break;
            }
          });
        } else {
          // Handle unexpected errors
          console.error("Unexpected error:", error);
        }
      }
    };



  return (
    <div>
       
        <div className="w-full m-auto px-6 py-4 overflow-hidden shadow-md sm:max-w-lg sm:rounded-lg  bg-white">
        <h2 className="text-2xl font-semibold text-center mt-4 ">Edit Admin</h2>

        <form onSubmit={handleUpdate} method="PUT">
                <div>
                  <label
                    htmlFor="name"
                    className=" block text-sm font-medium text-gray-700 undefined"
                  >
                    First Name
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      value={values.firstname}
                      onChange={(e) =>
                        setValues({ ...values, firstname: e.target.value })
                      }
                      className={`mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        firstnameError  ? 'border-red-600' : '' // Apply border-red-600 class when there's an error
                      }`}
                    />
                  </div>
                  {/* <div className="h-4">  */}
                    {firstnameError && <div className="text-red-600 text-sm">{firstnameError}</div>}
                  {/* </div> */}
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="mt-2 block text-sm font-medium text-gray-700 undefined"
                  >
                    Last Name
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      value={values.lastname}
                      onChange={(e) =>
                        setValues({ ...values, lastname: e.target.value })
                      }
                      className={`mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        LastnameError  ? 'border-red-600' : '' // Apply border-red-600 class when there's an error
                      }`}
                    />
                  </div>
                  {/* <div className="h-4">  */}
                    {LastnameError && <div className="text-red-600 text-sm">{LastnameError}</div>}
                  {/* </div> */}
                </div>
                <div className="mt-2">
                    <div className="flex">
                    <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Email
                  </label>
                  <span className="text-sm text-[#9E9E9E] mx-2">|</span>
                  <button 
                    type="button"  // add type button to prevent form submission
                    className="text-sm text-[#1A9CB7]"
                    // onClick={() => 
                    // handleChangeUsername()}
                    >
                    Change
                </button>
                    </div>
                
                <div className="flex flex-col items-start">
                    <p className="text-gray-900 dark:text-white py-2">{values.email}</p>
                </div>
                </div>
                <div className="mt-2">
                  <label
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Gender
                  </label>
                  <div className="flex items-start">
                    <label className="inline-flex items-center mt-2 mr-4">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={values.gender === "Male"}
                        onChange={(e) =>
                          setValues({ ...values, gender: e.target.value })
                        }
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={values.gender === "Female"}
                        onChange={(e) =>
                          setValues({ ...values, gender: e.target.value })
                        }
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Female</span>
                    </label>
                    <label className="inline-flex items-center mt-2 ml-3">
                      <input
                        type="radio"
                        name="gender"
                        value="Non-Binary"
                        checked={values.gender === "Non-Binary"}
                        onChange={(e) =>
                          setValues({ ...values, gender: e.target.value })
                        }
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Non-binary</span>
                    </label>
                  </div>
                  {/* <div className="h-4">  */}
                    {genderError && <div className="text-red-600 text-sm">{genderError}</div>}
                  {/* </div> */}
                </div>
         
               
                <div className="mt-2">
                  <label
                    htmlFor="password"
                    className="mt-2 block text-sm font-medium text-gray-700 undefined"
                  >
                    Password
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={e => setValues({ ...values, password: e.target.value })}
                      className={`mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        passwordError  ? 'border-red-600' : '' // Apply border-red-600 class when there's an error
                      }`}
                    />
                  </div>
                  {/* <div className="h-4">  */}
                    {passwordError && <div className="text-red-600 text-sm">{passwordError}</div>}
                  {/* </div> */}
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="password_confirmation"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Confirm Password
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
                      className={`mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        confirmPasswordError  ? 'border-red-600' : '' // Apply border-red-600 class when there's an error
                      }`}
                    />
                  </div>
                  {/* <div className="h-4">  */}
                    {confirmPasswordError && <div className="text-red-600 text-sm">{confirmPasswordError}</div>}
                  {/* </div> */}
                </div>
                <div className='flex justify-end mt-5'>
                <Link to="/admin" className="w-full text-center mr-2 py-2 bg-gray-500 text-white px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-red-200">   
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="w-full py-2 h-10 bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                >
                  Save
                </button>
        </div>
              </form>
        </div>
    </div>
  )
}

export default EditAdmin