import { AxiosResponse } from 'axios';

import * as http from '../../../http';
import { Init } from '../../../interfaces';
import { mockHttpData, mockHttpErrorMessage } from '../../../tests/mocks';
import { afterEach, describe, it, Mocked } from '../../../tests/utils';
import { initFetch, initPost } from '../../init';

vi.mock('../../../http');

const mockedHttp = http as Mocked<typeof http>;

describe('Init API', (): void => {
  afterEach((): void => {
    vi.clearAllMocks();
  });

  describe('initFetch()', (): void => {
    it('Should be called and resolve request correctly', async (): Promise<void> => {
      const httpGetResponse: Pick<AxiosResponse<Init[]>, 'data'> = {
        data: mockHttpData,
      };

      mockedHttp.get.mockResolvedValueOnce(httpGetResponse);

      const response = await initFetch();

      expect(mockedHttp.get).toHaveBeenCalledTimes(1);
      expect(mockedHttp.get).toHaveBeenCalledWith('');
      expect(response).toEqual(httpGetResponse);
    });

    it('Should be called and rejecte request', async (): Promise<void> => {
      mockedHttp.get.mockRejectedValueOnce(new Error(mockHttpErrorMessage));

      await expect(initFetch()).rejects.toThrow(mockHttpErrorMessage);
    });
  });

  describe('initPost()', (): void => {
    const [data] = mockHttpData;

    it('Should be called and resolve request correctly', async (): Promise<void> => {
      const httpPostResponse: Pick<AxiosResponse<Init>, 'data'> = {
        data,
      };

      mockedHttp.post.mockResolvedValueOnce(httpPostResponse);

      const response = await initPost(data);

      expect(mockedHttp.post).toHaveBeenCalledTimes(1);
      expect(mockedHttp.post).toHaveBeenCalledWith('', data);
      expect(response).toEqual(httpPostResponse);
    });

    it('Should be called and rejecte request', async (): Promise<void> => {
      mockedHttp.post.mockRejectedValueOnce(new Error(mockHttpErrorMessage));

      await expect(initPost(data)).rejects.toThrow(mockHttpErrorMessage);
    });
  });
});
