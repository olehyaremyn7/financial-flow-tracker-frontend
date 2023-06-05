import { AxiosResponse } from 'axios';

import { get, post } from '../../http';
import { Init } from '../../interfaces';

export const initFetch = async (): Promise<AxiosResponse<Init[]>> => get('');

export const initPost = async (data: Init): Promise<AxiosResponse<unknown>> => post('', data);
