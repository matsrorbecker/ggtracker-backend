const axios = require('axios')
const URL = 'http://api.scb.se/OV0104/v1/doris/sv/ssd/START/ME/ME0201/ME0201B/Partisympati051'
const query = {
  query: [
    {
      code: 'Kon',
      selection: {
        filter: 'item',
        values: [
          '1',
          '2'
        ]
      }
    },
    {
      code: 'Alder',
      selection: {
        filter: 'item',
        values: [
          '18-29',
          '30-49',
          '50-64',
          '65+',
          'tot18+'
        ]
      }
    },
    {
      code: 'Parti',
      selection: {
        filter: 'item',
        values: [
          'm',
          'c',
          'l',
          'kd',
          'mp',
          's',
          'v',
          'SD',
          'övr'
        ]
      }
    },
    {
      code: 'Tid',
      selection: {
        filter: 'item',
        values: []
      }
    }
  ],
  response: {
    format: 'json'
  }
}

module.exports = async (pollMonth, previousPollMonth) => {
  const _fetchData = async (month) => {
    query.query.find(el => el.code === 'Tid').selection.values = [month]
    console.log(`Hämtar PSU-data för undersökningsmånad ${month}...`)
    return await axios.post(URL, query)
  }

  let response
  try {
    response = await _fetchData(pollMonth)
  } catch (err) {
    if (err.response.status === 404) {
      response = await _fetchData(previousPollMonth)
    } else {
      throw err
    }
  }

  return response.data
}
