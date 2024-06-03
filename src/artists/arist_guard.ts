import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

export class ArtistsGuard extends AuthGuard ('jwt'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
         return super.canActivate(context);
    }
    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (err|| !user) throw ("Error soomething user or some one please check in artist_guard");
        if (user.artistId) return user;
        throw ("Error can't found artist with this id");
    }
}