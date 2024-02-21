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
        <div className="my-16 lg:w-[1000px] px-6 mx-auto">
          <button
            className="py-2 px-3 rounded-md bg-blue-500 text-white mb-2"
            onClick={() => setOpenModal(true)}
          >
            Add Devs
          </button>
          <div className="card shadow-md border p-4 rounded-md">
            <h1 className="text-3xl font-bold text-center py-4">Devs data</h1>
            <table className="w-full">
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
                        className="w-10 h-10 object-cover  mx-auto"
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
