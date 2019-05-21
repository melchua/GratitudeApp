export const getCurrentUnixDate = () => {
  var d = new Date();
  var seconds = Math.round(d.getTime() / 1000);
  return seconds
}

export const calculateStreak = () => {
  const currentDate = getCurrentUnixDate()
  const singleDay = 86400
  //these values need to be taken from the database
  const fakeData = [
    {
      date: 'Tuesday, November 30',
      gratitude: 'Going to the beach with friends.  Beautiful BC weather',
      createdOn:  1558379890
    },
  ]
  const mostRecentUploadDate = fakeData[0].createdOn
  let streakStartDate = 1556653954

  if (currentDate - mostRecentUploadDate > singleDay || mostRecentUploadDate === null) {
    console.warn('resetting streak')
    //resets streak start date to current date
    streakStartDate = currentDate
    streak = Math.floor((currentDate - streakStartDate)/singleDay)
    return streak
  } else {
    console.warn('calculating streak')
    //calculates streak based on start date and todays date
    streak = Math.floor((currentDate - streakStartDate)/singleDay)
    return streak
  }
}

