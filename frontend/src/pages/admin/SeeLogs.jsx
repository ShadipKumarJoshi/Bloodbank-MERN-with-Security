import React, { useEffect, useState } from "react";
import { fetchAuditLogsApi } from "../../apis/api";

const SeeLogs = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const response = await fetchAuditLogsApi(currentPage);
        console.log(response);
        setLogs(response?.data?.logs);
        setTotalPages(response?.data?.totalPages);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
        className="container content"
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <h2>Audit Logs</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    {/* <th>Image</th> */}
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Current Address</th>
                    <th>Activity</th>
                    <th>Route Used</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((item) => (
                    <tr key={item._id}>
                      {/* <td><img className="w-28 rounded-full" src={item?.user.userImageURL} alt="" /></td> */}
                      <td>{item?.user.fullName || "Null"}</td>
                      <td>{item?.user.email || "Null"}</td>
                      <td>{item?.user.number || "Null"}</td>
                      <td>{item?.user.currentAddress || "Null"}</td>
                      <td>{item?.action || "Null"}</td>
                      <td>{item?.route || "Null"}</td>
                      <td>{new Date(item?.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between py-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md text-white bg-gray-950 hover:bg-gray-600 ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page <span className="font-semibold">{currentPage}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md text-white bg-gray-950 hover:bg-gray-600 ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeLogs;
