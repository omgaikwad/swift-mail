import styles from "./Avatar.module.css";

interface Avatar {
  initials: string;
}

const Avatar = (props: Avatar) => {
  const { initials } = props;

  return <div className={styles["avatar"]}>{initials}</div>;
};

export default Avatar;
