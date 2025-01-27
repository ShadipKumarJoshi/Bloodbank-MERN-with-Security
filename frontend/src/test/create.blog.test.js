import axios from "axios";
import blog_mock from "../mock/blog_mock";

const baseURL = "https://localhost:5000"

describe("Blog Testing", () => {

    it("Blog Create ", async () => {
        const res = await axios.post(`${baseURL}/api/blog/create_blog`, blog_mock);
        expect(res.status).toEqual(200);
        expect(res.data.success).toEqual(false);
        expect(res.data.message).toEqual("Please provide all required fields and an image.");
    });
});

