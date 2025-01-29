import {
  faCalendarAlt,
  faHouseMedical,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../src/style/homepage.css";
import "../../src/style/navbar.css";
import {
  fetchHospitalsApi,
  getallBloodBankApi,
  searchUsersApi,
  viewCampaignApi,
} from "../apis/api";
import BloodGroupLists from "../components/BloodGroupsList";
import CustomCircularProgress from "../components/CustomCircularProgress";
import DistrictList from "../components/DistrictsList";

const HomePage = ({ history }) => {
  const [hospitalData, setHospitalData] = useState([]);
  const [bloodbankData, setBloodbankData] = useState([]);
  const [campaigns, setCampiagns] = useState([]);
  const [district, setDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    searchUsersApi(district, bloodGroup)
      .then((res) => {
        navigate("/users-list", { state: { searchedUsers: res.data.users } });
      })
      .catch((err) => {
        console.error("Error searching users:", err);
      });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    fetchHospitalsApi().then((res) => {
      if (res.data.success && res.data.hospital.length > 0) {
        setHospitalData(res.data.fewHospitals);
      }
    });
  }, []);

  useEffect(() => {
    getallBloodBankApi().then((res) => {
      if (res.data.success) {
        setBloodbankData(res?.data?.fewBloodBanks);
      }
    });
  }, []);

  useEffect(() => {
    viewCampaignApi().then((res) => {
      if (res.data.success) {
        setCampiagns(res?.data?.latestCampaings);
      } else {
        toast.error("Error fetching campaigns");
      }
    });
  }, []);

  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "pub_388315c80e0c4fa3e9c2a9fbeba0625cce9fe";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${apiKey}&q=nepali%20news&country=np`
        );
        const data = await response.json();
        if (response?.ok) {
          setNewsData(data?.results);
        } else {
          setError(data?.results);
        }
      } catch (error) {
        setError("Error fetching news. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        id="carouselExampleControlsNoTouching"
        className="carousel slide"
        data-bs-touch="true"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="../assets/images/donation.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="../assets/images/after.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="../assets/images/csone.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* <section className="bg-white p-0 mt-4">
        <div className="container p-0">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-8 col-xl-7 col-xxl-6">
              <div className=" text-center text-xl-start">
                <h1 className="display-5 fw-bolder text-danger mb-2">
                  Welcome to Blood Bank
                </h1>
                <p className="lead fw-normal text-danger mb-4">
                  A place where you can find the blood donors and request for
                  blood. We are here to help you. <br />
                  "Empower Compassion, Donate with Passion"
                </p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                  <a
                    className="btn btn-outline-danger btn-lg px-4 me-sm-3"
                    href="#features"
                  >
                    Get Started
                  </a>
                  <a className="btn btn-outline-dark btn-lg px-4" href="#!">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
              <img
                className="img-fluid rounded-3"
                src="https://www.kvgmch.org/wp-content/uploads/2019/06/blood-bank-min.jpg"
                alt="..."
              />
            </div>
          </div>
        </div>
      </section> */}

      <section className="bg-white p-0  mt-14">
        <div className="container p-0">
          <div className="row align-items-center justify-content-between">
            <div className="hidden md:block col-xl-5 col-xxl-6 d-none d-xl-block text-center">
              <img
                className="img-fluid rounded-3"
                src="assets/images/search.png"
                alt="..."
              />
            </div>
            <div className="col-lg-8 col-xl-7 col-xxl-6">
              <div className=" text-center text-xl-start">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
                  Search Users
                </h2>
                <form id="userSearchForm" className="flex flex-col space-y-4">
                  <div className="form-group">
                    <DistrictList
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="form-group">
                    <BloodGroupLists
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="btn btn-primary w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {bloodbankData && (
        <div className="hospitals-container m-4 mt-5 p-2 border-primary">
          <div className="w-full flex flex-row justify-between mt-4">
            <h3>Bloodbanks</h3>
            <a
              href="/bloodbanks"
              className="text-blue-500 no-underline hover:underline"
            >
              View All Bloodbanks
            </a>
          </div>
          {bloodbankData.map((bloodbank) => (
            <div className="hospital-item">
              <img
                src={
                  bloodbank.userImageURL ??
                  "https://www.brookings.edu/wp-content/uploads/2017/05/hospital002.jpg"
                }
                alt={bloodbank.bbName}
                className="hospital-image"
              />
              <div className="hospital-details">
                <h3 className="text-lg font-bold m-0">{bloodbank.bbName}</h3>
                <p className="font-bold text-white m-0">
                  Address: {bloodbank.bbAddress}
                </p>
                <p className="font-bold text-white m-0">
                  Phone: {bloodbank.bContact}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {hospitalData && (
        <div className="hospitals-container m-4 p-2 border-primary">
          <div className="w-full flex flex-row justify-between mt-4">
            <h3>Hospitals</h3>
            <a
              href="/hospitals"
              className="text-blue-500 no-underline hover:underline"
            >
              View All Hospitals
            </a>
          </div>
          {hospitalData.map((hospital) => (
            <div className="hospital-item">
              <img
                src={
                  hospital.hospitalImageUrl ??
                  "https://www.brookings.edu/wp-content/uploads/2017/05/hospital002.jpg"
                }
                alt={hospital.hospitalName}
                className="hospital-image"
              />
              <div className="hospital-details">
                <h3 className="text-lg font-bold m-0">
                  {hospital.hospitalName}
                </h3>
                <p className="font-bold text-white m-0">
                  Address: {hospital.hospitalAddress}
                </p>
                <p className="font-bold text-white m-0">
                  Phone: {hospital.hospitalContactNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {campaigns && (
        <section id="campaigns" className="w-full pt-2 md:py-24 lg:py-32">
          <div className="flex flex-col w-full md:w-1/4 mx-auto">
            <h2 className="text-4xl font-bold text-center text-red-700 mb-8 mt-2">
              Upcoming Campaigns
              <div className="border-2 border-solid border-red-700 mt-2"></div>
            </h2>
          </div>
          <div className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-6">
            {campaigns.map((campaign) => (
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <img
                  src={campaign.campaignImageUrl}
                  height="200"
                  alt="Campaign"
                  className="aspect-[2/1] overflow-hidden rounded-t-xl object-cover"
                />
                <div className="space-y-2 p-4">
                  <h3 className="text-lg font-bold">{campaign.campaignName}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-block rounded-full py-1 text-sm font-semibold text-white">
                      {" "}
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="mr-2 text-gray-800"
                      />
                      <span className="text-gray-800 pe-2">
                        {formatDate(campaign.campaignStartDate)}
                      </span>
                      <span className="text-gray-800">----</span>
                      <span className="text-gray-800  ps-2">
                        {formatDate(campaign.campaignEndDate)}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <FontAwesomeIcon
                      icon={faLocationCrosshairs}
                      className="mr-2 text-gray-800"
                    />
                    <span>{campaign.campaignLocation}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <FontAwesomeIcon
                      icon={faHouseMedical}
                      className="mr-2 text-gray-800"
                    />
                    <span>{campaign.user.fullName}</span>
                  </div>
                  {/* <a
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Learn More
                  </a> */}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {isLoading && <CustomCircularProgress />}
      {error && (
        <p className="text-center text-danger">
          Error: No News Available Right Now
        </p>
      )}
      {!isLoading && !error && (
        <section className="w-full pt-2 md:py-24 lg:py-32">
          <div className="w-full">
            <div className="w-full">
              <h2 className="text-3xl text-center font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Latest News
              </h2>
              <p className="mt-2 text-center text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Stay up-to-date with the latest trends and insights in the world
                of technology.
              </p>
            </div>
          </div>
          <div className="container grid items-start gap-6 px-4 md:px-6 lg:grid-cols-[1fr_300px] xl:gap-12">
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 xl:grid-cols-3 xl:gap-8">
              {newsData?.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <img
                    src={item?.image_url ?? "assets/images/news.png"}
                    alt="News Article"
                    width="400"
                    height="300"
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                    style={{ aspectRatio: "400 / 300;", objectFit: " cover;" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4 transition-all duration-300 group-hover:from-gray-900/60">
                    <div className="flex h-full flex-col justify-end">
                      <h3 className="text-lg font-semibold text-white">
                        {item?.title ?? "No Title Provided"}
                      </h3>
                      <p className="mt-2 text-sm text-gray-300 line-clamp-2">
                        {item?.description ?? "No Description Provided"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HomePage;
