import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const InterestedUsers = ({ interestedUsers, onClose }) => {
  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"></div>

      {/* Modal */}
      <div className="fixed top-20 right-40 w-2/3 h-[500px] bg-white dark:bg-gray-950 z-50 backdrop-blur-lg shadow-lg overflow-auto">
        <header className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">All Registerd Users</h1>
          <div className="relative">
            <button
              onClick={(e) => {
                "/bb/dashboard"
              }}
            >
              <FontAwesomeIcon
                icon={faClose}
                className="cursor-pointer border-spacing-24 border-gray-700 p-1 rounded-xl"
              />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&amp;_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    Full Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    Email
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    Phone Number
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    Blood Group
                  </th>
                </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0">
                {interestedUsers &&
                  interestedUsers.map((user) => (
                    <tr
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      key={user.id}
                    >
                      <td className="px-4 py-2">{user.fullName}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.number}</td>
                      <td className="px-4 py-2">{user.bloodGroup}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterestedUsers;
