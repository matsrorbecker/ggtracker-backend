module.exports = latestPollMonth => {
  const previousPollMonths = []
  let year = +latestPollMonth.substring(0, 4)
  const month = latestPollMonth.substring(5, 7)
  previousPollMonths.push(latestPollMonth)
  if (month === '11') previousPollMonths.push(`${year}M05`)
  for (year -= 1; year >= 2006; year--) {
    previousPollMonths.push([
      `${year}M11`,
      `${year}M05`
    ])
  }

  return previousPollMonths.flat()
}
