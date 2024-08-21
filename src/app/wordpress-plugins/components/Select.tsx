import { FaAngleDown } from 'react-icons/fa6';

import useOutsideClick from '@/lib/useOutsideClick';

import styles from '../page.module.scss';
export const SelectCtn = ({
  handleModal,
  handleData,
  value,
  title,
  data,
  name,
  open,
}: {
  handleModal: () => void;
  handleData: any;
  title: string;
  open: boolean;
  name: string;
  value: any;
  data: any;
}) => {
  const phpRef = useOutsideClick<HTMLDivElement>(handleModal, open);

  return (
    <div className={styles.select}>
      <label>{title}</label>
      <div className={styles.select_ctn}>
        <div className={styles.dropDown} onClick={handleModal}>
          {value || 'All versions'}
          <FaAngleDown />
        </div>
        {open && (
          <div className={styles.versions} ref={phpRef}>
            {data?.map((el: any, index: number) => {
              if (el) {
                return (
                  <span
                    onClick={() => {
                      handleData(el, name);
                      handleModal();
                    }}
                    key={el}
                  >
                    {el} {index !== 0 && el !== 'Not specified' && 'or higher'}
                  </span>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};
