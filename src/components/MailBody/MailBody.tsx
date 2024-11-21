import { useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";
import styles from "./MailBody.module.css";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import { SingleMail } from "../Inbox/Inbox";
import formatDate from "../../utils/date-utils";

interface MailBody {
  mailData: SingleMail;
  handleFavouriteMail: (mailId: string) => void;
  isMailFavourite: (mailId: string) => boolean;
}

interface MailBodyData {
  id: string;
  body: string;
}

const MailBody = (props: MailBody) => {
  // PROPS
  const { mailData, handleFavouriteMail, isMailFavourite } = props;

  const { id, from, date, subject } = mailData;

  const { name } = from;

  const firstCharacterOfName = name.split("")[0].toUpperCase();

  // STATES
  const [mailBodyData, setMailBodyData] = useState<MailBodyData>({
    id: "",
    body: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSingleMailData = async (mailId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://flipkart-email-mock.now.sh/?id=${mailId}`
      );

      const { data } = response;

      setMailBodyData(data);

      setLoading(false);

      return data;
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleMailData(id);
  }, [id]);

  return (
    <section className={styles["mail_body_wrapper"]}>
      {loading ? (
        <div className={styles["loading_container"]}>
          <SyncLoader color={"#e54065"} />
        </div>
      ) : (
        <div className={styles["mail_body"]}>
          <div className={styles["avatar_container"]}>
            <Avatar initials={firstCharacterOfName} />
          </div>

          <div className={styles["mail_body_container"]}>
            {/* Header */}
            <header className={styles["mail_header"]}>
              <div className={styles["heading_date"]}>
                <h2>{subject}</h2>

                {/* Date */}
                <p>{formatDate(date)}</p>
              </div>
              <button
                disabled={isMailFavourite(id)}
                onClick={() => handleFavouriteMail(id)}
                className={styles["favourite_button"]}
              >
                Mark as favourite
              </button>
            </header>

            {/* Body */}
            <section className={styles["mail_body"]}>
              <div
                id={id}
                dangerouslySetInnerHTML={{ __html: mailBodyData.body }}
              />
            </section>
          </div>
        </div>
      )}
    </section>
  );
};

export default MailBody;
