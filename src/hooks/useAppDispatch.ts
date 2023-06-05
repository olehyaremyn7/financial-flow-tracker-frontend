import { useDispatch } from 'react-redux';

import { AppDispatch } from '../redux/interface';

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
