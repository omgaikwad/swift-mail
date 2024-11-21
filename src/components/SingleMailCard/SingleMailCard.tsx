import formatDate from "../../utils/date-utils";
import Avatar from "../Avatar/Avatar";
import { SingleMail } from "../Inbox/Inbox";
import styles from "./SingleMailCard.module.css";

interface SingleMailCard {
  mailData: SingleMail;
  handleOpenMail: (mailId: SingleMail) => void;
  handleReadMail: (mailId: string) => void;
  isMailRead: (mailId: string) => boolean;
  isMailFavourite: (mailId: string) => boolean;
}

const SingleMailCard = (props: SingleMailCard) => {
  const {
    mailData,
    handleOpenMail,
    handleReadMail,
    isMailRead,
    isMailFavourite,
  } = props;

  const { id, from, date, subject, short_description } = mailData;

  const { email, name } = from;

  const firstCharacterOfName = name.split("")[0].toUpperCase();

  // HANDLER
  const openMailHandler = () => {
    handleOpenMail(mailData);
    handleReadMail(id);
  };

  const isRead = isMailRead(id);

  return (
    <article
      className={styles["mail_card_container"]}
      style={{
        backgroundColor: isRead ? "#f2f2f2" : "#ffffff",
      }}
      onClick={openMailHandler}
    >
      {/* Avatar Container */}
      <div className={styles["avatar_container"]}>
        <Avatar initials={firstCharacterOfName} />
      </div>

      {/* Mail Overview */}
      <div className={styles["mail_overview_container"]}>
        <header className={styles["mail_header_container"]}>
          {/* From */}
          <div className={styles["mail_from_container"]}>
            <p>From:</p>
            <p className={styles["highlighted_text"]}>
              {name} &lt;{email}&gt;
            </p>
          </div>

          {/* Subject */}
          <div className={styles["mail_subject_container"]}>
            <p>Subject:</p>
            <p className={styles["highlighted_text"]}>{subject}</p>
          </div>
        </header>

        {/* Message */}
        <div className={styles["mail_message_container"]}>
          <p className={styles["mail_message"]}>{short_description}</p>
        </div>

        {/* Footer */}
        <footer className={styles["mail_footer_container"]}>
          <p>{formatDate(date)}</p>
          {isMailFavourite(id) && (
            <p className={styles["favourite_text"]}>Favourite</p>
          )}
        </footer>
      </div>
    </article>
  );
};

export default SingleMailCard;
