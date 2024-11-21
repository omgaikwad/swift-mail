import moment from "moment";

function formatDate(timestamp: number) {
  return moment(timestamp).format("DD/MM/YYYY hh:mm A");
}

export default formatDate;
