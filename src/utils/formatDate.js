export default (date) => {
  let seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let span = Math.floor(seconds / 31536000);

  if (span >= 1) {
    return span + " year";
  }
  span = Math.floor(seconds / 2592000);
  if (span >= 1) {
    return span + " month";
  }
  span = Math.floor(seconds / 86400);
  if (span >= 1) {
    return span + " day";
  }
  span = Math.floor(seconds / 3600);
  if (span >= 1) {
    return span + " hour";
  }
  span = Math.floor(seconds / 60);
  if (span >= 1) {
    return span + " minute";
  }
  return Math.floor(seconds) + " second";
}