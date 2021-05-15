const axios = require('axios')

const URL = 'http://api.scb.se/OV0104/v1/doris/sv/ssd/START/ME/ME0201/ME0201B/Partisympati051'
const AGE_GROUPS = [
  '18-29',
  '30-49',
  '50-64',
  '65+',
  'tot18+'
]

module.exports = async (monthOrMonths, ageGroup) => {
  const query = `
    {
      "query": [
        {
          "code": "Kon",
          "selection": {
            "filter": "item",
            "values": [
              "1",
              "2"
            ]
          }
        },
        {
          "code": "Alder",
          "selection": {
            "filter": "item",
            "values": [
              ${ageGroup ? `"${ageGroup}"` : AGE_GROUPS.map(ageGroup => `"${ageGroup}"`).join(',')}
            ]
          }
        },
        {
          "code": "Parti",
          "selection": {
            "filter": "item",
            "values": [
              "m",
              "c",
              "l",
              "kd",
              "mp",
              "s",
              "v",
              "SD",
              "övr"
            ]
          }
        },
        {
          "code": "Tid",
          "selection": {
            "filter": "item",
            "values": [
              ${Array.isArray(monthOrMonths) ? monthOrMonths.map(month => `"${month}"`).join(',') : `"${monthOrMonths}"`}
            ]
          }
        }
      ],
      "response": {
        "format": "json"
      }
    }
  `

  console.log(`Hämtar PSU-data för följande månad/månader: ${monthOrMonths}`)
  return await axios.post(URL, JSON.parse(query))
}
