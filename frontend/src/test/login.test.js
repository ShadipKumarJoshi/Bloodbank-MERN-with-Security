import axios from "axios";
import login_mock from "../mock/login_mock";
const baseURL = "https://localhost:5000";


describe("Login Tesing", () => {

    //login
    it("Login Should Work", async () => {
        const res = await axios.post(`${baseURL}/api/user/login`, login_mock);
        expect(res.status).toEqual(200);
        expect(res.data.success).toEqual(true);
    });
});