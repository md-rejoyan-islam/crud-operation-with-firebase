import { useContext, useEffect, useState } from "react";
import "./App.css";
import {
  addDocument,
  deleteDocument,
  getRealTimeCollection,
  updateDocument,
} from "./firebase/firebaseStore";
import { toast } from "react-toastify";
import { Label, Modal, TextInput } from "flowbite-react";
import Swal from "sweetalert2";
import { serverTimestamp } from "firebase/firestore";
import { timeAgo } from "./helper/helper";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase/firebase";
import { ScaleLoader } from "react-spinners";

function Home() {
  const [photoPreview, setPhotoPreview] = useState(null);

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  // modal
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  //

  useEffect(() => {
    getRealTimeCollection("devs", (data) => {
      setData(data);
    });
  }, []);

  // handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDocument("devs", id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // handle edit
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { name, age } = Object.fromEntries(formData);
    if (!name) return toast.error("Name is required");
    if (!age) return toast.error("Age is required");

    const file = e.target.photo.files[0];

    let photoUrl = editData.photo;
    setLoading(true);
    if (file) {
      // ref
      const fileRef = ref(storage, file.name);
      // upload
      await uploadBytes(fileRef, file); // not return anything

      // get download url
      photoUrl = await getDownloadURL(fileRef);
    }

    // update document
    const res = await updateDocument("devs", editData.id, {
      name,
      age,
      photo: photoUrl,
    });

    // show success toast
    if (res) {
      toast.success("Data updated successfully");
      setOpenUpdateModal(false);
      setLoading(false);
      e.target.reset();
    }

    // const doc = await getDocument("devs", id);
  };

  // handle add
  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, age } = Object.fromEntries(formData);
    if (!name) return toast.error("Name is required");
    if (!age) return toast.error("Age is required");

    const file = e.target.photo.files[0];

    let photoUrl = "";
    setLoading(true);
    if (file) {
      if (!file) return toast.error("Photo is required");

      // ref
      const fileRef = ref(storage, file.name);
      // upload
      await uploadBytes(fileRef, file); // not return anything

      // get download url
      photoUrl = await getDownloadURL(fileRef);
    }

    // add document
    const res = await addDocument("devs", {
      name,
      age,
      photo: photoUrl,
      status: true,
      createAt: serverTimestamp(),
    });

    // show success toast
    if (res) {
      toast.success("Data added successfully");
      setLoading(false);
      setOpenModal(false);
      e.target.reset();
    }
  };

  return (
    <>
      <div>
        <div className="my-16 lg:w-[1000px] sm:px-6 px-3 mx-auto overflow-hidden">
          <button
            className="py-2 px-3 rounded-md bg-blue-500 text-white mb-2"
            onClick={() => setOpenModal(true)}
          >
            Add Devs
          </button>
          <div className="card shadow-md border p-4 rounded-md ">
            <h1 className="text-3xl font-bold text-center py-4">Devs data</h1>
            <div className="overflow-scroll">
              <table className="w-full table-auto ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Photo</th>
                    <th>CreateAt</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((dev, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{dev?.name}</td>
                      <td>{dev?.age}</td>
                      <td>
                        <img
                          src={dev?.photo}
                          className="w-8 h-8 object-cover  mx-auto"
                          alt=""
                        />
                      </td>

                      <td>
                        {dev?.createAt?.seconds &&
                          timeAgo(dev?.createAt?.seconds)}
                      </td>
                      <td>
                        <div className="flex gap-2 items-center  justify-center">
                          <button
                            className="text-[12px] py-1 px-2 rounded-md bg-green-400 text-white "
                            onClick={() => {
                              setEditData(dev);
                              setOpenUpdateModal(true);
                            }}
                          >
                            edit
                          </button>
                          <button
                            className="text-[12px] py-1 px-2 rounded-md bg-red-400 text-white "
                            onClick={() => handleDelete(dev.id)}
                          >
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(!openModal)}
        popup
        className="bg-[#4a7a63a0]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add Devs
            </h3>
            <form onSubmit={handleAdd}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your Name" />
                </div>
                <TextInput
                  id="name"
                  placeholder="Md. Rejoyan Islam"
                  name="name"
                  required
                />
              </div>
              <div className="mt-2 mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="age" value="Your age" />
                </div>
                <TextInput
                  id="age"
                  type="text"
                  required
                  name="age"
                  placeholder="Your age"
                />
              </div>
              <div className="mt-2 mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="age" value="Your Photo" />
                </div>
                <TextInput
                  id="age"
                  type="file"
                  name="photo"
                  placeholder="Your age"
                />
              </div>
              <div className="flex gap-10">
                <button
                  type="submit"
                  className="w-full bg-violet-500 rounded-md py-2 px-4 text-white"
                  style={{ backgroundColor: "#7150c2" }}
                >
                  Submit
                </button>
                {loading && <ScaleLoader color="#36d7b7" />}
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={openUpdateModal}
        size="md"
        onClose={() => setOpenUpdateModal(!openUpdateModal)}
        popup
        className="bg-[#4a7a63a0]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add Devs
            </h3>
            <form onSubmit={handleUpdate}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your Name" />
                </div>
                <TextInput
                  id="name"
                  placeholder="Md. Rejoyan Islam"
                  name="name"
                  value={editData?.name}
                  onChange={(e) => {
                    setEditData({ ...editData, name: e.target.value });
                  }}
                />
              </div>
              <div className="mt-2 mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="age" value="Your age" />
                </div>
                <TextInput
                  id="age"
                  type="text"
                  value={editData?.age}
                  onChange={(e) => {
                    setEditData({ ...editData, age: e.target.value });
                  }}
                  name="age"
                  placeholder="Your age"
                />
              </div>
              <div className="mt-2 mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="age" value="Your Photo" />
                </div>
                <div className="relative">
                  <img
                    src={photoPreview ? photoPreview : editData?.photo}
                    alt=""
                    className="w-full object-cover"
                  />
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      className="w-8 h-8 fill-violet-900 cursor-pointer hover:bg-[#222222ad] hover:fill-white rounded-[4px] absolute top-2 right-2 bg-[#2f77ddb9] p-2"
                      x="0"
                      y="0"
                      viewBox="0 0 401.523 401"
                      onClick={() => document.getElementById("file").click()}
                    >
                      <g>
                        <path
                          d="M370.59 250.973c-5.524 0-10 4.476-10 10v88.789c-.02 16.562-13.438 29.984-30 30H50c-16.563-.016-29.98-13.438-30-30V89.172c.02-16.559 13.438-29.98 30-30h88.79c5.523 0 10-4.477 10-10 0-5.52-4.477-10-10-10H50c-27.602.031-49.969 22.398-50 50v260.594c.031 27.601 22.398 49.968 50 50h280.59c27.601-.032 49.969-22.399 50-50v-88.793c0-5.524-4.477-10-10-10zm0 0"
                          opacity="1"
                          data-original="#000000"
                        ></path>
                        <path
                          d="M376.629 13.441c-17.574-17.574-46.067-17.574-63.64 0L134.581 191.848a9.997 9.997 0 0 0-2.566 4.402l-23.461 84.7a9.997 9.997 0 0 0 12.304 12.308l84.7-23.465a9.997 9.997 0 0 0 4.402-2.566l178.402-178.41c17.547-17.587 17.547-46.055 0-63.641zM156.37 198.348 302.383 52.332l47.09 47.09-146.016 146.016zm-9.406 18.875 37.62 37.625-52.038 14.418zM374.223 74.676 363.617 85.28l-47.094-47.094 10.61-10.605c9.762-9.762 25.59-9.762 35.351 0l11.739 11.734c9.746 9.774 9.746 25.59 0 35.36zm0 0"
                          opacity="1"
                          data-original="#000000"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
                <TextInput
                  id="file"
                  type="file"
                  className={photoPreview && "hidden"}
                  name="photo"
                  onChange={(e) => {
                    const url = URL.createObjectURL(e.target.files[0]);
                    console.log(url);
                    setPhotoPreview(url);
                  }}
                  placeholder="Your age"
                />
              </div>
              <div className="flex gap-10">
                <button
                  type="submit"
                  className="w-full bg-violet-500 rounded-md py-2 px-4 text-white"
                  style={{ backgroundColor: "#7150c2" }}
                >
                  Update
                </button>
                {loading && <ScaleLoader color="#36d7b7" />}
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Home;
