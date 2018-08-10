// @flow

const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => resolve(e.target.result))
    reader.addEventListener('error', (e) => reject(new Error(e.message)))
    reader.readAsText(file)
  })
}

export default readFile
