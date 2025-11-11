import styles from './LoginModal.module.scss';

export default function LoginModal({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
