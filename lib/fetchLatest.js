const fetchData = require('./fetchData')

module.exports = async (pollMonth, previousPollMonth) => {
  let response
  try {
    response = await fetchData(pollMonth)
  } catch (err) {
    if (err.response.status === 404) {
      response = await fetchData(previousPollMonth)
    } else {
      throw err
    }
  }

  return response.data
}
