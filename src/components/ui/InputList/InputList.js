import styles from './InputList.module.scss';

export const InputList = ({ children }) => {
  return <div className={styles.inputList}>{children}</div>;
};
