import { ApiRepository } from "../repositories/ApiRepository";
import { Api, CreateApiInput } from "../models/Api";

export class ApiService {
  constructor(private apiRepository: ApiRepository) {}

  async createApi(
    input: CreateApiInput,
    organizationId: string,
    userId: string
  ): Promise<Api> {

    if (!input.name || input.name.trim() === "") {
      throw new Error("API name is required");
    }
    if (!input.baseUrl || input.baseUrl.trim() === "") {
      throw new Error("baseUrl is required");
    }
    const baseUrl = input.baseUrl.trim();

    const api = await this.apiRepository.createApi(
      input.name.trim(),
      input.description,
      baseUrl,
      organizationId,
      userId
    );

    return api;
  }

  async getApisByOrg(organizationId: string): Promise<Api[]> {
    if (!organizationId) {
      throw new Error("organizationId is required");
    }

    return await this.apiRepository.findByOrg(organizationId);
  }

  async getApiById(apiId: string, organizationId: string): Promise<Api> {
    if (!apiId) {
      throw new Error("apiId is required");
    }

    const api = await this.apiRepository.findById(apiId, organizationId);

    if (!api) {
      throw new Error("API not found");
    }

    return api;
  }
}
