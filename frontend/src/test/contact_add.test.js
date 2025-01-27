import axios from "axios";
import contact_create from "../mock/contact_create";
const baseURL = "http://localhost:5000";


describe("Add contact Testing" , () =>{
    
    it("Contact Create ", async () => {
            const res = await axios.post(`${baseURL}/api/contact/create_contact`, contact_create);
            expect(res.status).toEqual(200);
            expect(res.data.success).toEqual(true);  
        });
    });
        
    