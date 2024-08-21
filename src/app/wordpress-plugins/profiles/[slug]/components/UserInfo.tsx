import { IContributor } from '@/@types/plugin';

import styles from '../page.module.scss';
export const UserInfo = ({ data }: { data: IContributor }) => {
  return (
    <div className={styles.info_ctn}>
      <img src={data?.avatar} />
      <div>
        <h1>{data?.author_name}</h1>
        <p>{data?.username}</p>
      </div>
    </div>
  );
};
