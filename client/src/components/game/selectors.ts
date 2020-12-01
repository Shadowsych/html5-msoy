import { IState } from '../../store';

export const getParticipants = (state: IState) => state.game.room.participants;
export const getRoomSocket = (state: IState) => state.game.room.socket;
