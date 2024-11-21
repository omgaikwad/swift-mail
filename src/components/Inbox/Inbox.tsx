import { useEffect, useState } from "react";
import styles from "./Inbox.module.css";
import Filters from "../Filters/Filters";
import SingleMailCard from "../SingleMailCard/SingleMailCard";
import MailBody from "../MailBody/MailBody";
import axios from "axios";
import { SyncLoader } from "react-spinners";

export interface SingleMail {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: number;
  subject: string;
  short_description: string;
}

const Inbox = () => {
  // STATES
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [openMail, setOpenMail] = useState<SingleMail | null>(null);
  const [page, setPage] = useState<number>(1);

  console.log("🚀 ~ Inbox ~ page:", page);

  const [allMails, setAllMails] = useState<SingleMail[]>([]);
  const [filteredMails, setFilteredMails] = useState<SingleMail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [readMails, setReadMails] = useState<string[]>([]);
  const [favouriteMails, setFavouriteMails] = useState<string[]>([]);

  // HANDLERS
  const handleActiveFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleOpenMail = (mail: SingleMail) => {
    setOpenMail(mail);
  };

  const handleReadMail = (mailId: string) => {
    setReadMails([...readMails, mailId]);
  };
  const handleFavouriteMail = (mailId: string) => {
    setFavouriteMails([...favouriteMails, mailId]);
  };

  const fetchAllEmails = async (page: number) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://flipkart-email-mock.now.sh/?page=${page}`
      );

      const { list } = data;

      setAllMails(list);
      setFilteredMails(list);

      // Reset
      setOpenMail(null);
      setActiveFilter("");

      setLoading(false);

      return list;
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  };

  const isMailRead = (mailId: string) => {
    const isRead = readMails.includes(mailId);

    return isRead;
  };
  const isMailFavourite = (mailId: string) => {
    const isRead = favouriteMails.includes(mailId);

    return isRead;
  };

  const handleNextPage = () => {
    const totalItems = 10 * (page - 1) + allMails.length;

    if (totalItems < 10 * page) {
      // do nothing
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleFilter = (activeFilter: string) => {
    if (activeFilter === "read") {
      const readMailsList: SingleMail[] = allMails.filter((item) =>
        readMails.includes(item.id)
      );

      setFilteredMails(readMailsList);

      return;
    }

    if (activeFilter === "unread") {
      const unreadMailsList: SingleMail[] = allMails.filter(
        (item) => !readMails.includes(item.id)
      );

      setFilteredMails(unreadMailsList);

      return;
    }

    if (activeFilter === "favourites") {
      const favouriteMailsList: SingleMail[] = allMails.filter((item) =>
        favouriteMails.includes(item.id)
      );

      console.log(
        "🚀 ~ handleFilter ~ favouriteMailsList:",
        favouriteMailsList
      );

      setFilteredMails(favouriteMailsList);

      return;
    }
  };

  // useEffect
  useEffect(() => {
    fetchAllEmails(page);
  }, [page]);

  useEffect(() => {
    if (activeFilter) {
      handleFilter(activeFilter);
    }
  }, [activeFilter]);

  return (
    <main className={styles["inbox_wrapper"]}>
      {loading ? (
        <div className={styles["loading_container"]}>
          <SyncLoader color={"#e54065"} />
        </div>
      ) : (
        <div className={styles["inbox_container"]}>
          {/* Filter Component */}
          <nav
            aria-label="Filter and Pagination"
            className={styles["filter_and_pagination_wrapper"]}
          >
            <Filters
              activeFilter={activeFilter}
              handleActiveFilter={handleActiveFilter}
            />

            <div className={styles["pagination_container"]}>
              <button
                className={styles["pagination_button"]}
                onClick={handlePreviousPage}
              >
                Previous Page
              </button>
              <p>{page}</p>
              <button
                className={styles["pagination_button"]}
                onClick={handleNextPage}
              >
                Next Page
              </button>
            </div>
          </nav>

          <section className={styles["mail_wrapper"]}>
            {/* Mail Container */}
            <div
              className={
                openMail
                  ? styles["mail_container_shrinked"]
                  : styles["mail_container"]
              }
            >
              {filteredMails.map((mailData: SingleMail, index) => {
                return (
                  <SingleMailCard
                    key={index}
                    mailData={mailData}
                    handleOpenMail={handleOpenMail}
                    handleReadMail={handleReadMail}
                    isMailRead={isMailRead}
                    isMailFavourite={isMailFavourite}
                  />
                );
              })}
            </div>

            {/* Opened Mail Container */}
            {openMail && (
              <MailBody
                mailData={openMail}
                handleFavouriteMail={handleFavouriteMail}
                isMailFavourite={isMailFavourite}
              />
            )}
          </section>
        </div>
      )}
    </main>
  );
};

export default Inbox;
