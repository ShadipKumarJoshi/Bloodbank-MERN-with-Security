import axios from "axios";
import contact_mock from "../mock/contact_mock";
const baseURL = "http://localhost:5000";

describe("Contact Testing" , () =>{
    it("Fetch all contact", async () => {
        const res = await axios.get(`${baseURL}/api/contact/get_contact`)
        expect(res.status).toEqual(200);
        expect(res.data.success).toBeDefined();
        //matching each product name with the mock data
        res.data.contacts.forEach((individualProduct, index) => {
            expect(individualProduct.contactMessage).toEqual(contact_mock[index].contactMessage)
        });
    });
});