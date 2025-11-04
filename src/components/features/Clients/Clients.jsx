import Image from "next/image";
import styles from "./Clients.module.scss";

export default function Clients({ children }) {
  return (
    <section className={styles.clients}>
      <span className={styles.clients__title}>Our clients are backed by:</span>
      <div className={`${styles.clients__images} ${styles.running_line}`}>
        <div className={`${styles.items} ${styles.marquee}`}>
          <div>
            <Image
              
              src="/images/logo-ycombinator.png"
              alt="ycombinator"
              width={242}
              height={50}
            />
          </div>

          <div>
            <Image
              
              src="/images/logo-coinbase.png"
              alt="coinbase"
              width={242}
              height={44}
            />
          </div>

          <div>
            <Image
              
              src="/images/logo-a16z.png"
              alt="a16z"
              width={138}
              height={56}
            />
          </div>

          <div>
            <Image
              
              src="/images/logo-blockchange.png"
              alt="blockchange"
              width={143}
              height={22}
            />
          </div>
        </div>
        <div className={`${styles.items} ${styles.marquee}`}>
          <Image
            className={styles["running_line-span"]}
            src="/images/logo-ycombinator.png"
            alt="ycombinator"
            width={242}
            height={50}
          />
          <Image
            className={styles["running_line-span"]}
            src="/images/logo-coinbase.png"
            alt="coinbase"
            width={242}
            height={44}
          />
          <Image
            className={styles["running_line-span"]}
            src="/images/logo-a16z.png"
            alt="a16z"
            width={138}
            height={56}
          />
          <Image
            className={styles["running_line-span"]}
            src="/images/logo-blockchange.png"
            alt="blockchange"
            width={143}
            height={22}
          />
        </div>
      </div>
    </section>
  );
}
