import axios from "axios";
import blog_mock from "../mock/blog_mock";

const baseURL = "http://localhost:5000"

describe("App Testing" , () =>{

    it("Fetch all blog", async () => {
        const res = await axios.get(`${baseURL}/api/blog/get_blog`)
        expect(res.status).toEqual(200);
        expect(res.data.success).toBeDefined();
        //matching each product name with the mock data
        res.data.blogs.forEach((individualProduct, index) => {
            expect(individualProduct.blogTitle).toEqual(blog_mock[index].blogTitle);
            expect(individualProduct.blogAuthor).toEqual(blog_mock[index].blogAuthor)
            expect(individualProduct.blogCategory).toEqual(blog_mock[index].blogCategory)
      });
    });
});