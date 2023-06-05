import initAPI from '../../api';
import { Init } from '../../interfaces';

const { initFetch, initPost } = initAPI;

export const fetchInitData = async (): Promise<Init[]> => {
  const { data } = await initFetch();

  return data;
};

export const postInitData = async (postData: Init): Promise<unknown> => {
  const { data } = await initPost(postData);

  return data;
};
