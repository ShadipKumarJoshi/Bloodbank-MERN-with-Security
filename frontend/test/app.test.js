import axios from "axios";
import add_hospital_mock from "../mock/add.hospital.mock.js";
import add_contact_mock from "../mock/add_contact.mock.js";
import add_requests_mock from "../mock/addrequests.mock.js";
import bloodbank_mock from "../mock/bloodbanks.mock.js";
import hospitals_mock from "../mock/hospital.mock.js";
import login_mock from "../mock/login.mock.js";
import register_mock from "../mock/register.mock.js";
import users_mock from "../mock/users.mock.js";

// install this package => npm i jest @testing-library/jest-dom @testing-library/react

// backend url
const baseUrl = "http://localhost:5000";

describe("Mock testing", () => {
  //   register test
  it("Register Mock Test", async () => {
    const response = await axios.post(
      `${baseUrl}/api/user/register`,
      register_mock
    );
    expect(response.status).toEqual(200);
    expect(response.data.success).toEqual(false);
    expect(response.data.message).toEqual("Please upload a valid image");
  });

  //   login test

  it("Login Mock Test", async () => {
    const response = await axios.post(`${baseUrl}/api/user/login`, login_mock);
    expect(response.status).toEqual(200);
    expect(response.data.success).toEqual(true);
  });

  //  fetching all users mock test
  it("Fetch all the users", async () => {
    const response = await axios.get(`${baseUrl}/api/user/getAllUsers`);
    expect(response.status).toEqual(200);
    expect(response.data.users).toBeDefined();
    expect(response.data.message).toBeDefined();
    response.data.users.forEach((ind, index) => {
      expect(ind.fullName).toEqual(users_mock[index].fullName);
    });
  });

  // fetching all hospitals mock test
  it("Fetch all the hospitals", async () => {
    const response = await axios.get(`${baseUrl}/api/hospital/getallhospitals`);
    expect(response.status).toEqual(200);
    expect(response.data.success).toEqual(true);
    response.data.hospital.forEach((ind, index) => {
      expect(ind.hospitalName).toEqual(hospitals_mock[index].hospitalName);
    });
  });

  // fetching single hospital mock test
  // it("Fetch single hospital", async () => {
  //   const response = await axios.get(
  //     `${baseUrl}/api/hospital/single-hospital/65bfcbb458bfd235f9b33773`
  //   );
  //   expect(response.status).toEqual(200);
  //   expect(response.data.hospital).toBeDefined();
  //   expect(response.data.hospital.hospitalName).toEqual(
  //     hospitals_mock[0].hospitalName
  //   );
  // });

  // fetching all bloodbanks mock test
  it("Fetch all the bloodbanks", async () => {
    const response = await axios.get(
      `${baseUrl}/api/bloodbank/getallbloodbank`
    );
    expect(response.status).toEqual(200);
    expect(response.data.bloodBank).toBeDefined();
    response.data.bloodBank.forEach((bb, index) => {
      expect(bb.bbName).toEqual(bloodbank_mock[index].bbName);
    });
  });

  // fetching single bloodbank mock test
  it("Fetch single bloodbank", async () => {
    const response = await axios.get(
      `${baseUrl}/api/bloodbank/single-bloodbank/65cc71c9d606e28cd6774c5a`
    );
    expect(response.status).toEqual(200);
    expect(response.data.bloodbank).toBeDefined();
    expect(response.data.bloodbank.bbName).toEqual(bloodbank_mock[0].bbName);
  });

  // fetching all the contacts mock test
  it("Fetch all the contacts", async () => {
    const response = await axios.get(`${baseUrl}/api/contact/getallcontact`);
    expect(response.status).toEqual(200);
    expect(response.data.contacts).toBeDefined();
  });

  // add blooodbank mock test
  it("Add bloodbank", async () => {
    const response = await axios.post(
      `${baseUrl}/api/bloodbank/addbloodbank`,
      bloodbank_mock
    );
    expect(response.status).toEqual(200);
    // console.log(response.data);
    expect(response.data.success).toEqual(false);
    expect(response.data.message).toEqual("Please upload a valid image");
  });

  // add hospital mock test
  it("Add hospital", async () => {
    const response = await axios.post(
      `${baseUrl}/api/hospital/addhospital`,
      add_hospital_mock
    );
    expect(response.status).toEqual(200);
    expect(response.data.success).toEqual(false);
    expect(response.data.message).toEqual("Please upload a valid image");
  });

  // add request mock test
  it("Add request", async () => {
    const response = await axios.post(
      `${baseUrl}/api/blood_request/add_request`,
      add_requests_mock
    );
    expect(response.status).toEqual(200);
    expect(response.data.success).toEqual(true);
    expect(response.data.message).toEqual("Your Request has been added");
  });

  // add contact mock test
  it("Add contact", async () => {
    const response = await axios.post(
      `${baseUrl}/api/contact/send-message`,
      add_contact_mock
    );
    expect(response.status).toEqual(201);
    expect(response.data.success).toEqual(true);
    expect(response.data.message).toEqual("Message Sent successfully");
  });

  // delete hospital mock test
  it("Delete hospital", async () => {
    const response = await axios.delete(
      `${baseUrl}/api/hospital/deletehospital/65bfca7658bfd235f9b33769`
    );
    expect(response.status).toEqual(200);
    expect(response.data.success).toEqual(false);
    expect(response.data.message).toEqual("Hospital Not Found");
  });
});
