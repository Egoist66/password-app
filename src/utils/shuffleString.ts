export const shuffleString = (str: string) => {
    return str.split('').sort(() => (
        0.5 - Math.random()
    )).join('')
}