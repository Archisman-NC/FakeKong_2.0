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

  async updateApi(
    apiId: string,
    organizationId: string,
    updates: Partial<{ name: string; description: string; baseUrl: string; status: string }>
  ): Promise<Api> {
    const api = await this.apiRepository.updateApi(apiId, organizationId, updates);
    if (!api) {
      throw new Error("API not found or update failed");
    }
    return api;
  }

  async deleteApi(apiId: string, organizationId: string): Promise<void> {
    const success = await this.apiRepository.deleteApi(apiId, organizationId);
    if (!success) {
      throw new Error("API not found or failed to delete");
    }
  }
}

