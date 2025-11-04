import styles from './Projects.module.scss';

export default function Projects({ children }) {
  return (
    <section className={styles.projects}>
      <span className={styles.projects__title}>Projects</span>
      <div className={styles.projects__inner}>
        <div className={styles['projects__inner-1']}></div>
        <div className={styles['projects__inner-2']}></div>
        <div className={styles['projects__inner-3']}></div>
        <div className={styles['projects__inner-4']}></div>
        <div className={styles['projects__inner-5']}>
          <span>How we design web3 products</span>
          <button>coming soon</button>
        </div>
      </div>
    </section>
  );
}
