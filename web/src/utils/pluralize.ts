const pluralize = (word: string, count: number) => {
  if (count === 1) {
    return `1 ${word}`
  }

  return `${count} ${word}s`
}

export default pluralize
