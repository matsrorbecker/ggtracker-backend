module.exports = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  let pollMonth, previousPollMonth
  if (month >= 1 && month <= 5) {
    pollMonth = `${year - 1}M11`
  } else if (month >= 7 && month <= 11) {
    pollMonth = `${year}M05`
  } else if (month === 6) {
    pollMonth = `${year}M05`
    previousPollMonth = `${year - 1}M11`
  } else {
    pollMonth = `${year}M11`
    previousPollMonth = `${year}M05`
  }

  return {
    pollMonth,
    previousPollMonth
  }
}
