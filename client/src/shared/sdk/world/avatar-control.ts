import * as PIXI from 'pixi.js-legacy';
import { ActorControl, EntityType, WorkerMessage } from '.';

export class AvatarControl extends ActorControl {
  private actions: string[] = [];

  constructor(
    socket: WebSocket,
    hasControl: boolean,
    id: number,
    name: string,
    sheet: PIXI.Spritesheet,
    script: string,
  ) {
    super(socket, hasControl, id, name, sheet, script);
    this.type = EntityType.AVATAR;
  }

  /**
   * @override
   */
  protected listenWorkerMessage() {
    super.listenWorkerMessage();
    this.worker.addEventListener('message', (event: MessageEvent) => {
      const { data } = event;
      if (data.type === WorkerMessage.REGISTER_ACTIONS) {
        const { value } = data.payload;
        this.registerActions(value);
      }
    });
  }

  /**
   * Registers the avatar's actions.
   * These actions will appear for the user to see and change between them.
   *
   * @param actions An Array of actions, each must be less than 64 characters.
   */
  public registerActions(actions: string[]) {
    const maxActionLength = 64;

    const registeredActions = actions.map((action) => {
      if (action.length > maxActionLength) {
        throw new Error(`Actions cannot be greater than ${maxActionLength} characters.`);
      }
      return action;
    });

    this.actions = registeredActions;
  }
}
