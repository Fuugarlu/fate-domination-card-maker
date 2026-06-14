export function capitalizeString(word: string) {
    const firstLetterCapitalized = word.charAt(0).toUpperCase();
    const remainingLetters = word.substring(1);
    return firstLetterCapitalized + remainingLetters;
}