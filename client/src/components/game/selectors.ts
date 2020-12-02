import { IState } from '../../store';

export const getGameError = (state: IState) => state.game.error;
export const getParticipants = (state: IState) => state.game.room.participants;
export const getRoomId = (state: IState) => state.game.room.id;
export const getRoomSocket = (state: IState) => state.game.room.socket;
