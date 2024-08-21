import styles from '../page.module.scss';
export const Categories = ({
  isSelected,
  handleData,
  data,
}: {
  // eslint-disable-next-line no-unused-vars
  handleData: (e: {}, slug: string) => void;
  data: { category?: string; id?: string };
  isSelected?: boolean;
}) => {
  return (
    <span
      style={{
        color: isSelected ? 'black' : '#0000007F',
      }}
      onClick={() => handleData(data, 'category_id')}
      key={data?.id}
    >
      <div className={isSelected ? styles.active : styles.inactive}></div>
      {data?.category}
    </span>
  );
};
