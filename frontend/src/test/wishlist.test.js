import axios from "axios";
import wishlist_mock from "../mock/wishlist_mock";


const baseURL = "http://localhost:5000"

describe("Wishlist" , () =>{
    
t("GET /api/wishlist/get_wishlists | Should work", async () => {
    try {
        const response = await axios.post(`${backendURL}/api/favorite/get_wishlists`, {
        });
        expect(response.status).toBe(400);
        expect(response.data.message).toBe("Wishlist fetched successfully");
        expect(response.data.products).toBeDefined();
    } catch (error) {
        console.error("Error:", error);
    }
  });
});