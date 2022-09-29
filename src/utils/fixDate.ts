function fixDate(msTime: number) {
  const date = new Date(msTime)
  return date.toLocaleDateString()
}

export default fixDate
