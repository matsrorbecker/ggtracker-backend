const fetchData = require('./fetchData')

module.exports = async (pollMonth, previousPollMonth) => {
  let response, latestPollMonth
  try {
    response = await fetchData(pollMonth)
    latestPollMonth = pollMonth
  } catch (err) {
    if (err.response.status === 404) {
      response = await fetchData(previousPollMonth)
      latestPollMonth = previousPollMonth
    } else {
      throw err
    }
  }

  return {
    data: response.data,
    latestPollMonth
  }
}
