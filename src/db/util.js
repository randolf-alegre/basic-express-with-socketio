const DBErrorLogger = (error) => {
  console.log(error.detail ?? error);
}

module.exports = {
  DBErrorLogger
}