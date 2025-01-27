
import axios from "axios";
import add_user_mock from "../mock/create_mock";

const baseURL = "http://localhost:5000"

describe("User Testing" , () =>{
    
    
it("User Create ", async () => {
        const res = await axios.post(`${baseURL}/api/user/create`, add_user_mock);
        expect(res.status).toEqual(200);
        expect(res.data.success).toEqual(false);
        expect(res.data.message).toEqual("Please provide all required fields and an image.");
    });
});
    

