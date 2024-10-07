import { AddOn } from '@/app/wordpress-plugin/[slug]/components/AddOn/AddOn';

import { IDeveloper } from '@/@types/plugin';

import styles from '../page.module.scss';
export const Developer = ({
  title,
  data,
}: {
  data: IDeveloper[];
  title: string;
}) => {
  return (
    <div className={styles.ctn}>
      <h2>{title}</h2>
      <div>
        {data?.map((el: IDeveloper) => {
          return (
            <AddOn
              active_installations={el?.active_installations}
              category_name={el?.category?.category}
              downloads={el?.active_installations}
              withActiveInstallations={true}
              shortTitle={el?.short_title}
              className={styles.plugin}
              slug={el?.plugin_slug}
              name={el?.plugin_name}
              isBlackTheme={false}
              rating={el?.rating!}
              key={el?.plugin_id}
              image={el?.logo || '/defaultLogo.png'}
            />
          );
        })}
      </div>
    </div>
  );
};
