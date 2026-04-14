export type Role = "OWNER" | "ADMIN" | "DEVELOPER" ;

export const requiredRoles = (allowedRoles: Role[]) => {
    return (req:any,res:any,next:any)=>{
        const role = req.organization?.role;

        if(!role|| !allowedRoles.includes(role)){
            return res.status(403).json({Message:"Forbidden"})
        }
        next();
    }
}