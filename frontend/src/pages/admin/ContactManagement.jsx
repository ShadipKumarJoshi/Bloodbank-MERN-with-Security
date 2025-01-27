import {
  faExclamationTriangle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteContactApi, getAllContactApi } from "../../apis/Api";

export default function ContactManagement() {
  const [messages, setMessages] = useState([]);

  const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
  const opendeleteModal = () => setdeleteIsModalOpen(true);
  const closedeleteModal = () => setdeleteIsModalOpen(false);
  const [sId, setSId] = useState("");

  const handleDelete = (id) => {
    deleteContactApi(id).then((res) => {
      if (res.data.success == true) {
        closedeleteModal(true);
        toast.success(res.data.message);
        fetchAllContacts();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const fetchAllContacts = () => {
    getAllContactApi().then((res) => {
      setMessages(res?.data?.contacts);
    });
  };

  useEffect(() => {
    fetchAllContacts();
  }, [messages?.length]);

  return (
    <div
      className="background"
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        className=""
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <h2 className="text-center font-bold text-2xl">All The Messages</h2>
        <div className="w-full bg-white overflow-y-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800">
                <th className="font-normal text-left pl-12">Full Name</th>
                <th className="font-normal text-left pl-12">Email</th>
                <th className="font-normal text-left pl-12">Message</th>
                <th className="font-normal text-left pl-12">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {messages?.map((item,index) => (
                <tr
                  index={item._id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                >
                  <td className="pl-12">
                    <p className="font-medium">{item.contactName}</p>
                  </td>
                  <td className="pl-12">
                    <p className="font-medium">{item.contactEmail}</p>
                  </td>
                  <td className="pl-12">
                    <p className="font-medium">{item.contactMessage}</p>
                  </td>
                  <td className="pl-12">
                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        opendeleteModal();
                        setSId(item._id);
                      }}
                      className="focus:outline-none ml-2 "
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 hover:text-red-700 cursor-pointer "
                      />
                    </button>
                  </td>
                  {isdeleteModalOpen && (
                    <div
                      className="fixed inset-0 flex items-center justify-center bg-opacity-20 overflow-y-auto h-full w-full"
                      id="my-modal"
                    >
                      <div className="relative mx-auto p-5 border  shadow-sm w-1/4 rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
                        <h6 className="font-medium w-3/4 mx-auto text-center">
                          <FontAwesomeIcon
                            className="me-4"
                            icon={faExclamationTriangle}
                          />
                          <img
                            src="../assets/images/sure_about_that.jpg"
                            alt=""
                          />
                          Are you sure about the action?
                        </h6>
                        <div className="flex flex-wrap items-center justify-between mx-auto w-full">
                          <button
                            onClick={() => handleDelete(sId)}
                            className="w-1/3 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center py-2.5"
                          >
                            Delete
                          </button>
                          <button
                            type="submit"
                            className="w-1/3 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5"
                            onClick={closedeleteModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
