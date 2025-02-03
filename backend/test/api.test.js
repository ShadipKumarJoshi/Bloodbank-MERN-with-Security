const request = require("supertest");
const app = require("../index");

describe("API Testings", () => {
  // testing get_all_bloodbanks route /api/bloodbank/getallbloodbank
  it("GET /api/bloodbank/getallbloodbank | Response with valid json", async () => {
    const response = await request(app).get("/api/bloodbank/getallbloodbank");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Fetched");
  });

  it("POST /api/user/login | Response with valid json", async () => {
    const response = await request(app).post("/api/user/login").send({
      email: "user",
      password: "user",
    });
    // console.log(response.body);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Logged In successfully");

    expect(response.body.token).toBeDefined();
  });

  it("GET Hospitals  | Fetch Hospitals", async () => {
    const response = await request(app).get("/api/hospital/getallhospitals");
    expect(response.body.success).toBe(true);
  });

  it;

  it("GET BloodRequests  | Fetch BloodRequests", async () => {
    const response = await request(app).get("/api/blood_request/all_requests");
    expect(response.body.success).toBe(true);
  });

  it("GET Contacts  | Fetch Contacts", async () => {
    const response = await request(app).get("/api/contact/getallcontact");
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty("contacts");
  });

  it("GET Requests  | Fetch Requests", async () => {
    const response = await request(app).get("/api/blood_request/all_requests");
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty("requestList");
  });

  // fetch Users test
  it("GET Users  | Fetch Users", async () => {
    const response = await request(app).get("/api/user/getallusers");
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty("users");
  });

  // add Blood Request test
  it("POST /api/blood_request/add_request | Response with valid json", async () => {
    const response = await request(app)
      .post("/api/blood_request/add_request")
      .send({
        patientName: "MockTest",
        patientAge: "28",
        patientBloodType: "AB+",
        components: "RBC AND WBC",
        phoneNumber: 9845852200,
        hospitalName: "Lumbini Zonal Hospital",
        hospitalAddress: "Butwal",
        quantity: "5 Pint",
        urgency: "Urgent",
        reason: "Vampire",
        date: "2022-12-20",
        instruction: "Please make it fast",
        anyPrecautions: "No any precautions required",
        contactPerson: "Aashutosh Paneru",
        latitude: 27.484986,
        longitude: 86.65654,
        userId: "658e7bc94e9dbf5b148e8248",
      });
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Your Request has been added");
  });

  // add blood bank test
  it("POST /api/bloodbank/addbloodbank | Response with valid json", async () => {
    const response = await request(app)
      .post("/api/bloodbank/addbloodbank")
      .send({
        bName: "mocktest",
        bAddress: "Gorkha",
        bContact: 4312431,
        oHours: "mock",
        bgavailable: "A+",
        serviceOffered: "sdgsdg",
        specialInstructions: "sd",
        additionalNotes: "sdgsdg",
        socialLinks: "sdgsdgsd",
        latitude: 27,
        longitude: 87,
        bImage: null,
      });
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Please upload a valid image");
  });
});
