import { AxiosResponse } from 'axios';

import * as http from '../../../http';
import { Init } from '../../../interfaces';
import { mockHttpData, mockHttpErrorMessage } from '../../../tests/mocks';
import { afterEach, describe, it, Mocked } from '../../../tests/utils';
import { fetchInitData, postInitData } from '../../init';

vi.mock('../../../http');

const mockedHttp = http as Mocked<typeof http>;

describe('Init service', (): void => {
  afterEach((): void => {
    vi.clearAllMocks();
  });

  describe('fetchInitData()', () => {
    it('Should return init data', async (): Promise<void> => {
      const httpGetResponse: Pick<AxiosResponse<Init[]>, 'data'> = {
        data: mockHttpData,
      };

      mockedHttp.get.mockResolvedValue(httpGetResponse);

      const response = await fetchInitData();

      expect(mockedHttp.get).toHaveBeenCalledTimes(1);
      expect(mockedHttp.get).toHaveBeenCalledWith('');
      expect(response).toEqual(httpGetResponse.data);
    });

    it('Should return an error', async (): Promise<void> => {
      mockedHttp.get.mockRejectedValueOnce(new Error(mockHttpErrorMessage));

      await expect(fetchInitData()).rejects.toThrow(mockHttpErrorMessage);
    });
  });

  describe('postInitData()', () => {
    const [data] = mockHttpData;

    it('Should transfer data and return response', async (): Promise<void> => {
      const httpPostResponse: Pick<AxiosResponse<{ response: string; data: Init }>, 'data'> = {
        data: {
          response: 'Created',
          data,
        },
      };

      mockedHttp.post.mockResolvedValue(httpPostResponse);

      const response = await postInitData(data);

      expect(mockedHttp.post).toHaveBeenCalledTimes(1);
      expect(mockedHttp.post).toHaveBeenCalledWith('', data);
      expect(response).toEqual(httpPostResponse.data);
    });

    it('Should return an error', async (): Promise<void> => {
      mockedHttp.post.mockRejectedValueOnce(new Error(mockHttpErrorMessage));

      await expect(postInitData(data)).rejects.toThrow(mockHttpErrorMessage);
    });
  });
});
