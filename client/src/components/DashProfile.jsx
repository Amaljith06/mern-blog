import { Alert, Button, TextInput } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();
  // get url from uploaded image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  // upload image
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    // Firebase Storage Rules
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name; // add date to make filename unique
    const storageRef = ref(storage, fileName);
    // uploading to firebase storage
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // calculating progress of upload
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0)); // toFixed() to round decimal value
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        // get file from firebase storage
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploadProgress(null); // to remove progress % after upload
        });
      }
    );
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* User Image upload input*/}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        {/* User Image */}
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {/* Circular Progress Bar */}
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,12,199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          {/* Image */}
          <img
            src={
              imageFileUrl ? (
                imageFileUrl
              ) : currentUser ? (
                currentUser.profilePicture
              ) : (
                <LoadingSpinner />
              )
            }
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {/* Image Upload Error */}
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        {/* Username */}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        {/* Email */}
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        {/* Password */}
        <TextInput type="password" id="password" placeholder="password" />

        {/* Update Button */}
        <Button
          type="submit"
          gradientDuoTone={theme === "light" ? "pinkToOrange" : "purpleToBlue"}
          outline
        >
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        {/* Delete Account */}
        <span className="cursor-pointer">Delete Account</span>
        {/* Sign Out */}
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
