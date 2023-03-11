import { Command, Hears, Scene, SceneEnter, SceneLeave, Sender } from "nestjs-telegraf";
import { HELLO_SCENE_1 } from "../bot.constants";
import { Context } from "../interfaces/context.interface";

@Scene(HELLO_SCENE_1)
export class RandomNumberScene {
    @SceneEnter()
    onSceneEnter(): string {
        console.log('Enter to scene 1');
        return 'Welcome on scene 1';
    }

    @SceneLeave()
    onSceneLeave(): string {
        console.log('Leave from scene 1');
        return 'Bye Bye 1';
    }

    @Command('leave')
    async onLeaveCommand(ctx: Context): Promise<void> {
        await ctx.scene.leave();
    }

    @Hears(['hi', 'hello', 'hey', 'qq'])
    onGreetings(
      @Sender('first_name') firstName: string,
    ): string {
      return `scene1: Hey ${firstName}`;
    }
}