/**
 * @function capitalize
 * @description function to convert lowercase letters to capitalized letters.
 * @param {string} string - lowercase letters
 * @returns {string} string - capitalized letters
 * @exports capitalize
 */
export default string => string.charAt(0).toUpperCase() + string.slice(1);
