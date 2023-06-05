import clsx from 'clsx';
import { FC } from 'react';

import { TitleProps } from './interface';
import styles from './styles.module.scss';

const Title: FC<TitleProps> = ({ text, className }) => (
  <h1 className={clsx(styles.root, className)} data-cy="title">
    {text}
  </h1>
);

export default Title;
