/**
 * Generates a random integer between the specified minimum and maximum values, inclusive.
 *
 * @param {number} min - The minimum value for the random integer.
 * @param {number} max - The maximum value for the random integer.
 * @return {number} The randomly generated integer.
 */

export const randomInt = (min: number, max: number): number => {
    return Math.floor(min + Math.random() * (max + 1 - min)) 
}