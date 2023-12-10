import { apiClient } from "./utils/AxiosInterceptor";

export const GetCompanies = async () => {
  return await apiClient.get("companies")
}

export const GetPaginatedCompanies = async ({ limit, page }: { limit?: number | undefined, page?: number | undefined }) => {
  return await apiClient.get(`companies/paginated/?limit=${limit}&page=${page}`)
}

export const FuzzySearchCompanies = async ({ searchString, limit, page }: { searchString?: string, limit: number | undefined, page: number | undefined }) => {
  return await apiClient.get(`search/companies?key=${searchString}&limit=${limit}&page=${page}`)
}
