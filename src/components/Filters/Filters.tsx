import styles from "./Filters.module.css";

interface FiltersProps {
  activeFilter: string;
  handleActiveFilter: (filter: string) => void;
}

const Filters = (props: FiltersProps) => {
  const { activeFilter, handleActiveFilter } = props;

  return (
    <div className={styles["filter_container"]}>
      <p className={styles["filter_heading"]}>Filter By: </p>

      <div className={styles["filter_action_buttons"]}>
        <button
          className={
            activeFilter === "unread"
              ? styles["active_filter"]
              : styles["filter_button"]
          }
          onClick={() => handleActiveFilter("unread")}
        >
          Unread
        </button>
        <button
          className={
            activeFilter === "read"
              ? styles["active_filter"]
              : styles["filter_button"]
          }
          onClick={() => handleActiveFilter("read")}
        >
          Read
        </button>
        <button
          className={
            activeFilter === "favourites"
              ? styles["active_filter"]
              : styles["filter_button"]
          }
          onClick={() => handleActiveFilter("favourites")}
        >
          Favourites
        </button>
      </div>
    </div>
  );
};

export default Filters;
