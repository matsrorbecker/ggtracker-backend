const express = require('express')
const cors = require('cors')
const schedule = require('node-schedule')
const fetchData = require('./lib/fetchData')
const figureOutPollMonth = require('./lib/figureOutPollMonth')

const app = express()
const port = process.env.PORT || 3001

const origin = process.env.NODE_ENV === 'production' ? 'https://ggtracker.rorbecker.com' : '*'
app.use(cors({ origin }))

let data = {}

app.get('/api/data', (req, res) => {
  res.json(data)
})

app.listen(port, () => {
  console.log(`Nu lyssnar ggtracker-backend på port ${port}...`)
})

const doStuff = async () => {
  const { pollMonth, previousPollMonth } = figureOutPollMonth()
  try {
    data = await fetchData(pollMonth, previousPollMonth)
  } catch (err) {
    console.log('Fel vid hämtning av PSU-data:', err)
  }
}

const rule = new schedule.RecurrenceRule()
rule.minute = 33
rule.hour = 9
rule.dayOfWeek = [new schedule.Range(1, 5)]
rule.tz = 'Europe/Stockholm'
schedule.scheduleJob(rule, doStuff)

doStuff()
