import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { TelegrafException, TelegrafExecutionContext } from "nestjs-telegraf";
import { Observable } from "rxjs";
import { Context } from "../../common/interfaces/context.interface";

@Injectable()
export class AdminGuard implements CanActivate {
    private readonly ADMIN_IDS = [];

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = TelegrafExecutionContext.create(context);
        const { from } = ctx.getContext<Context>();

        const isAdmin = this.ADMIN_IDS.includes(from.id);
        if (!isAdmin) {
            throw new TelegrafException('You are not admin ((:');
        }

        return true;
    }
}