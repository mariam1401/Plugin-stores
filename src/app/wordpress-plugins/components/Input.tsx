import styles from '../page.module.scss';
//@ts-ignore
export const Input = ({ handleValue, data, name }) => {
  return (
    <div className={styles.input_ctn}>
      <div>
        <span>min</span>
        <input
          onChange={(e) => handleValue(e, 0)}
          name={name}
          placeholder={'0'}
          value={data && (
              data[0] >= 10000000 ? '10M+' :
                  data[0] >= 1000000 ? `${Math.floor(data[0] / 1000000)}M+` :
                      data[0] >= 100000 ? `${Math.floor(data[0] / 1000)}K+` :
                          data[0] || ''
          )}

        />
      </div>
      <div>
        <span>max</span>
        <input
          onChange={(e) => handleValue(e, 1)}
          value={data && (
              data[1] >= 10000000 ? '10M+' :
                  data[1] >= 1000000 ? `${Math.floor(data[1] / 1000000)}M+` :
                      data[1] >= 100000 ? `${Math.floor(data[1] / 1000)}K+` :
                          data[1] || ''
          )}
          name={name}
        />
      </div>
    </div>
  );
};
