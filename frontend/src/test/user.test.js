import axios from "axios";
import user_mock from "../mock/user_mock";

const baseURL = "https://localhost:5000"

describe("User Testing", () => {

    //product
})
it("Fetch all User", async () => {
    const res = await axios.get(`${baseURL}/api/user/get_user`)
    expect(res.status).toEqual(200);
    expect(res.data.success).toBeDefined();
    //matching each product name with the mock data
    res.data.users.forEach((individualProduct, index) => {
        expect(individualProduct.firstName).toEqual(user_mock[index].firstName);
        expect(individualProduct.lastName).toEqual(user_mock[index].lastName);
        expect(individualProduct.email).toEqual(user_mock[index].email);
        expect(individualProduct.password).toEqual(user_mock[index].password);

    });

});
