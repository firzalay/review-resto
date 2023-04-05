import { useHttp } from "./useHttp";

export const useReviewsRepository = () => {
    const http = useHttp();

    const store = (data) => http.post("/api/reviews", data);

    return {
        store
    }
}