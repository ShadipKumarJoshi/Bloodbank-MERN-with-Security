import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AdminDashboard = () => {
//   const [data, setData] = useState({
//     bloodBank: [],
//     hospital: [],
//     users: 0,
//     campaigns: 0,
//   });

//   const currentYear = new Date().getFullYear();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [bloodBankRes, hospitalRes, usersRes, campaignsRes] =
//           await Promise.all([
//           ]);

//         setData({
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const { bloodBank, hospital, users, campaigns } = data;

// //   const countByMonth = (items) => {
// //     const currentYear = new Date().getFullYear(); // Define current year inside the function
// //     return items.reduce((acc, item) => {
// //       const itemDate = new Date(item.createdAt);
// //       if (!isNaN(itemDate)) { // Check if the date is valid
// //         if (itemDate.getFullYear() === currentYear) {
// //           const month = itemDate.getMonth();
// //           acc[month] = (acc[month] || 0) + 1;
// //         }
// //       }
// //       return acc;
// //     }, {});
// // };

//   const bloodBankByMonth = 4;
//   const hospitalByMonth = 5;

//   const createChartData = (dataByMonth) => {
//     return Array.from({ length: 12 }, (_, index) => ({
//       name: new Date(currentYear, index).toLocaleString("default", {
//         month: "short",
//       }),
//       count: dataByMonth[index] || 0,
//     }));
//   };

//   const bloodBankData = createChartData(bloodBankByMonth);
//   const hospitalData = createChartData(hospitalByMonth);

//   const StatCard = ({ icon, value, label }) => (
//     <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
//       <div className="flex flex-col space-y-1.5">
//         <div className="w-8 h-8 text-red-500">{icon}</div>
//         <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">
//           {value}
//         </div>
//         <p className="text-gray-600 dark:text-gray-400">{label}</p>
//       </div>
//     </div>
  // );

  return (
    <></>
    // <div className="container">
    //   <h2 className="text-center">Dashboard</h2>
    //   <div className="charts d-flex flex-row flex-wrap justify-content-between">
    //     <div className="chart">
    //       <h3 className="text-center">Old Age Home By Month ({currentYear})</h3>
    //       <LineChart width={500} height={300} data={bloodBankData}>
    //         <XAxis dataKey="name" />
    //         <YAxis />
    //         <Tooltip />
    //         <Legend />
    //         <Line type="monotone" dataKey="count" stroke="#8884d8" />
    //       </LineChart>
    //     </div>
    //     <div className="chart">
    //       <h3 className="text-center">
    //         Orphanages Added By Month ({currentYear})
    //       </h3>
    //       <BarChart width={500} height={300} data={hospitalData}>
    //         <XAxis dataKey="name" />
    //         <YAxis />
    //         <Tooltip />
    //         <Legend />
    //         <Bar dataKey="count" fill="#82ca9d" />
    //       </BarChart>
    //     </div>
    //   </div>

    //   <section className="bg-white dark:bg-gray-800 py-12 md:py-16">
    //     <div className="container mx-auto px-4 md:px-6 lg:px-8">
    //       <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">
    //         Statistics
    //       </h2>
    //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    //         <StatCard
    //           icon={
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="24"
    //               height="24"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeWidth="2"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //             >
    //               <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
    //             </svg>
    //           }
    //           value={hospital.length}
    //           label="Total Organizations Registered"
    //         />
    //         <StatCard
    //           icon={
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="24"
    //               height="24"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeWidth="2"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //             >
    //               <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    //               <circle cx="9" cy="7" r="4"></circle>
    //               <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    //               <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    //             </svg>
    //           }
    //           value={bloodBank.length}
    //           label="Total Orphanage Registered"
    //         />
    //         <StatCard
    //           icon={
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="24"
    //               height="24"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeWidth="2"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //             >
    //               <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    //               <circle cx="9" cy="7" r="4"></circle>
    //               <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    //               <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    //             </svg>
    //           }
    //           value={bloodBank.length}
    //           label="Total Old Age Home Registered"
    //         />
    //         <StatCard
    //           icon={
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="24"
    //               height="24"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeWidth="2"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //             >
    //               <path d="m12 14 4-4"></path>
    //               <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
    //             </svg>
    //           }
    //           value={users}
    //           label="All Registered Users"
    //         />
    //         <StatCard
    //           icon={
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="24"
    //               height="24"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeWidth="2"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //             >
    //               <path d="M8 2v4"></path>
    //               <path d="M16 2v4"></path>
    //               <rect width="18" height="18" x="3" y="4" rx="2"></rect>
    //               <path d="M3 10h18"></path>
    //             </svg>
    //           }
    //           value={campaigns}
    //           label="Upcoming Event Drives"
    //         />
    //       </div>
    //     </div>
    //   </section>
    // </div>
  );
};

export default AdminDashboard;
