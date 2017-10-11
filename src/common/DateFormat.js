export function formatDate(data) {

  let year = data.getFullYear()
  let month = data.getMonth()
  let day = data.getDate()
  return year + '' + padLeftZero(month + 1) + padLeftZero(day)
}

function padLeftZero(str) {
  if (str < 10) {
    return '0' + str;
  } else {
    return str
  }
}

export function lastDate(data) {
  let month = data.getMonth()
  let day = data.getDate()
  let weekday = []
  weekday[0]="星期日"
  weekday[1]="星期一"
  weekday[2]="星期二"
  weekday[3]="星期三"
  weekday[4]="星期四"
  weekday[5]="星期五"
  weekday[6]="星期六"
  return (month + 1) + '月' + padLeftZero(day) + '日  ' + weekday[data.getDay()]
}
