import { IContributor } from '@/@types/plugin';

import styles from '../page.module.scss';
export const AboutAuthor = ({ data }: { data: IContributor }) => {
  return (
    <div className={styles.auth_ctn}>
      <div className={styles.info}>
        <h3>About author</h3>
        {data?.user_member_since && (
          <div>
            Member since:<span>{data?.user_member_since}</span>
          </div>
        )}
        {data?.location && (
          <div>
            Location:<span>{data?.location}</span>
          </div>
        )}
        {data?.job_title && (
          <div>
            Job title:<span>{data?.job_title}</span>
          </div>
        )}
        {data?.employer && (
          <div>
            Employer:<span>{data?.employer}</span>
          </div>
        )}
        {data?.website && (
          <div>
            Website:<span>{data?.website}</span>
          </div>
        )}
      </div>
      {(data?.bio || data?.wordpress_origin_story) && (
        <div className={styles.bio}>
          {data?.bio && (
            <div>
              <h2>Bio</h2>
              <p>{data?.bio}</p>
            </div>
          )}
          {data?.wordpress_origin_story && (
            <div>
              <h2>WordPress Origin Story</h2>
              <p>{data?.wordpress_origin_story}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
