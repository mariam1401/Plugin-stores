import Link from 'next/link';

import styles from './page.module.scss';
export function Contributor({ plugin }: { plugin: any }) {
  return (
    plugin?.contributors?.length > 0 && (
      <div className={styles.ctn}>
        <h2>Contributors & Developers</h2>
        <div className={styles.header}>
          (
          <span
            dangerouslySetInnerHTML={{ __html: plugin?.plugin_name || '' }}
          />
          ) is open source software. The following people have contributed to
          this plugin.{' '}
        </div>
        <div className={styles.developers}>
          {plugin?.contributors?.map((el: any, index: number) => {
            return (
              <div key={index}>
                <img src={el?.avatar} />
                <Link href={`/wordpress-plugins/profiles/${el?.slug}`}>
                  {el?.author_name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
