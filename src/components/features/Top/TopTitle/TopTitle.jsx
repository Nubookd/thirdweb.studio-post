import styles from './TopTitle.module.scss';

export default function TopTitle({ children }) {
  return (
    <div className={styles.top__title}>
      <h1>Design studio</h1>
      <span>for the</span>
      <span>web3 world</span>
    </div>
  );
}
