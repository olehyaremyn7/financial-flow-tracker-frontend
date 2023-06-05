import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../components/Title';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTitle from '../../hooks/useTitle';
import { initialize } from '../../redux/reducers/init/actionCreators';
import { MainProps } from './interface';
import styles from './styles.module.scss';

const Main: FC<MainProps> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useTitle('Main page');

  const initRedux = (): void => {
    dispatch(initialize());
  };

  useEffect((): void => {
    initRedux();
  }, []);

  return (
    <main id="main" className={clsx(styles.root, 'bg-background-default')}>
      <Title text={t('main.hello')} className="text-primary-text" />
    </main>
  );
};

export default Main;
