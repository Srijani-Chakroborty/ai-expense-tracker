import React, { useState, useContext } from "react";
import Modal from "../Modal";
import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstanse";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";

const EditProfileModal = ({ isOpen, onClose }) => {
  const { user, updateUser } = useContext(UserContext);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Update preview if user changes
  React.useEffect(() => {
    setFullName(user?.fullName || "");
    setImage(null); // reset image selection on open
  }, [user, isOpen]);

  const handleSave = async () => {
    setLoading(true);
    try {
      let profileImageUrl = user?.profileImageUrl;
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const res = await axiosInstance.post(
          API_PATHS.IMAGE.UPLOAD_IMAGE,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        profileImageUrl = res.data.imageUrl;
      }
      const res = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        fullName,
        profileImageUrl: image === null ? null : profileImageUrl,
      });
      updateUser(res.data.user);
      toast.success("Profile updated!");
      onClose();
    } catch (err) {
      toast.error("Failed to update profile", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <div className="flex flex-col items-center gap-4">
        <ProfilePhotoSelector
          image={image}
          setImage={setImage}
          initialUrl={user?.profileImageUrl}
        />
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
        />
        <button
          className="bg-primary text-white px-6 py-2 rounded mt-2 disabled:opacity-60"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
