import {Request,Response} from 'express';
import { ApiService } from '../services/ApiService';

export class ApiController{
    constructor(private apiService: ApiService){}

    createApi = async (req:Request,res:Response) => {
        try{
            const organizationId = (req as any).organization?.id;
            const userId = (req as any).user?.userID;

            const api = await this.apiService.createApi(
                req.body,
                organizationId,
                userId
            )

            res.status(201).json(api)
        }
        catch(err:any){
            console.log("[ApiContoller.createApi]",err);
            res.status(500).json({message:err.message|| "Failed to create API"})
        }
    }

    getApis = async (req: Request, res: Response) => {
        try {
            const organizationId = (req as any).organization?.id;

            const apis = await this.apiService.getApisByOrg(organizationId);

            res.json(apis);
        } catch (err: any) {
        console.error("[ApiController.getApis]", err);
        res.status(500).json({ message: "Failed to fetch APIs" });
        }
    };

    getApiById = async (req:Request,res:Response) =>{
        try{
            const id = req.params.id as string;
            const organizationId = (req as any).organization?.id;

            const api = await this.apiService.getApiById(id,organizationId)

            return res.json(api)

        }
        catch(err:any){
            console.error("[ApiContoller.getApiById]",err);
            res.status(404).json({"message":err.message||"API not found"})
        }
    }

    updateApi = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const organizationId = (req as any).organization?.id;

            const updatedApi = await this.apiService.updateApi(id, organizationId, req.body);

            res.json(updatedApi);
        } catch (err: any) {
            console.error("[ApiController.updateApi]", err);
            res.status(err.message === "API not found or update failed" ? 404 : 500).json({ message: err.message });
        }
    };

    deleteApi = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const organizationId = (req as any).organization?.id;

            await this.apiService.deleteApi(id, organizationId);

            res.status(204).send();
        } catch (err: any) {
            console.error("[ApiController.deleteApi]", err);
            res.status(err.message === "API not found or failed to delete" ? 404 : 500).json({ message: err.message });
        }
    };
}