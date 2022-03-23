export const millisToMinutesAndSeconds = (millis: number) => {
    const hours = Math.floor((millis / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((millis / (1000 * 60)) % 60)
    const seconds = Math.floor(+((millis % 60000) / 1000));
    if (hours > 0) {
      return hours + ':' + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }