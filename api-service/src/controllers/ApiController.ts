import {Request,Response} from 'express';
import { ApiService } from '../services/ApiService';

export class ApiContoller{
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
            res.status(500).json({Message:err.message|| "Failed to create API"})
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

    getApibyId = async (req:Request,res:Response) =>{
        try{
            const id = req.params.id as string;
            const organizationId = (req as any).organizationId?.id;

            const api = await this.apiService.getApiById(id,organizationId)

        }
        catch(err:any){
            console.error("[ApiContoller.getApiById]",err);
            res.status(404).json({"message":err.message||"API not found"})
        }
    }
}