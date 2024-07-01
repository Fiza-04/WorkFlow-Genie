import { faClose, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authControll } from "../utils/dataOperations";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Profile = ({ onClose }) => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  const hasFetchedData = useRef(false);

  const updateUser = async (id, userData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Update Response:", data);
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      return { status: false, message: error.message };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await authControll(navigate, true);
      if (user) {
        setUserData(user.userData);
        setEditData(user.userData);
      }
    };

    if (!hasFetchedData.current) {
      fetchData();
      hasFetchedData.current = true;
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const saveChanges = async () => {
    const result = await updateUser(userData._id, editData);
    if (result.status) {
      setUserData(editData);
      setIsEditing(false);
      alert("User updated successfully");
    } else {
      alert("Error updating user: " + result.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-neutral-900 text-neutral-300 w-[30%] h-[50%] icon-shadow rounded-[50px]">
        <div className="flex justify-between mt-10 mr-7 ml-7">
          <p className="text-2xl font-thin">Profile</p>
          <div className="flex gap-4">
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="bg-neutral-700 p-2 rounded-full hover:bg-neutral-950 cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            />
            <FontAwesomeIcon
              icon={faClose}
              className="bg-neutral-700 p-2 rounded-full hover:bg-neutral-950 cursor-pointer"
              onClick={onClose}
            />
          </div>
        </div>
        <div className="ml-2 p-5">
          {isEditing ? (
            <>
              <div className="flex flex-row mb-4">
                <label className="mb-5 mr-4 text-sm font-light">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={editData.firstName}
                  onChange={handleInputChange}
                  className="text-sm rounded bg-neutral-900 pl-3 text-neutral-300 h-8 w-52"
                />
              </div>
              <div className="flex flex-row mb-4">
                <label className="mb-5 mr-4 text-sm font-light">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={editData.lastName}
                  onChange={handleInputChange}
                  className="text-sm rounded bg-neutral-900 pl-3 text-neutral-300 h-8 w-52"
                />
              </div>
              <div className="flex flex-row mb-4">
                <label className="mb-5 mr-5 text-sm font-light">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  value={editData.username}
                  onChange={handleInputChange}
                  className="text-sm rounded bg-neutral-900 pl-3 text-neutral-300 h-8 w-52"
                />
              </div>
              <div className="flex flex-row mb-0">
                <label className="mb-5 mr-12 text-sm font-light">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  className="text-sm rounded bg-neutral-900 pl-3 text-neutral-300 h-8 w-52"
                />
              </div>
              <div className="flex justify-end mr-5">
                <a
                  onClick={saveChanges}
                  className="w-18 p-2 pl-4 pr-4 rounded-[12px] text-sm bg-neutral-900 hover:bg-neutral-950 cursor-pointer"
                >
                  Update
                </a>
              </div>
            </>
          ) : (
            <div className="">
              <div className="flex flex-row">
                <p className="mb-5 mr-4 text-sm font-light">First Name:</p>
                <p> {userData.firstName}</p>
              </div>
              <div className="flex flex-row">
                <p className="mb-5 mr-4 text-sm font-light">Last Name:</p>
                <p>{userData.lastName}</p>
              </div>
              <div className="flex flex-row">
                <p className="mb-5 mr-4 text-sm font-light">Username:</p>
                <p>{userData.username}</p>
              </div>
              <div className="flex flex-row mb-12">
                <p className="mb-5 mr-11 text-sm font-light">Email:</p>
                <p>{userData.email}</p>
              </div>

              {/* <a className="text-[15px] font-thin bg-neutral-900 p-2 rounded-[12px] hover:bg-neutral-950 cursor-pointer">
                Delete user
              </a> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
