import styles from '../page.module.scss';
//@ts-ignore
export const Input = ({ handleValue, data, name }) => {
  return (
    <div className={styles.input_ctn}>
      <div>
        <span>min</span>
        <input
          value={(data && String(data[0])) || ''}
          onChange={(e) => handleValue(e, 0)}
          name={name}
        />
      </div>
      <div>
        <span>max</span>
        <input
          onChange={(e) => handleValue(e, 1)}
          value={(data && data[1]) || ''}
          name={name}
        />
      </div>
    </div>
  );
};
