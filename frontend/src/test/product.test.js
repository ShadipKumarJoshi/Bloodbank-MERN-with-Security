import axios from "axios";
import product_mock from "../mock/product_mock";


const baseURL = "https://localhost:5000"

describe("Product Testing", () => {

    //product
})
it("Fetch all products", async () => {
    const res = await axios.get(`${baseURL}/api/product/get_products`)
    expect(res.status).toEqual(200);
    expect(res.data.success).toBeDefined();
    //matching each product name with the mock data
    res.data.products.forEach((individualProduct, index) => {
        expect(individualProduct.plantCategory).toEqual(product_mock[index].plantCategory);


    });
});





