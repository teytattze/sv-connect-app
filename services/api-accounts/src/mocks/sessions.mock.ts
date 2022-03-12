import { ISessionsClient } from '@sv-connect/domain';

export const mockSessionsService: ISessionsClient = {
  createSession: jest.fn(),
};
