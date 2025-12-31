import { useQuery } from "@tanstack/react-query";
import { apiConnector } from "../services/apiconnector";
import { catalogData } from "../services/apis";

const { CATALOGPAGEDATA_API } = catalogData;

export function useCatalogPageData(categoryId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["catalogPageData", categoryId],
    queryFn: async () => {
      const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
        categoryId: categoryId,
      });

      if (!response?.data?.success) {
        throw new Error("Could not Fetch Categories page Data");
      }

      return response.data;
    },
    enabled: !!categoryId, // Only run if categoryId is provided
  });

  return {
    data,
    isLoading,
    error,
  };
}
