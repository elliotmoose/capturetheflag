/**
 * a - b, where a and b are arrays of length 2
 * @param {Array} a
 * @param {Array} b
 * @returns {Array} answer
 */
export const Vector2Subtract = function(a, b) {
    //a - b
    return [a[0] - b[0], a[1] - b[1]];
};

/**
 * a + b, where a and b are arrays of length 2
 * @param {Array} a
 * @param {Array} b
 * @returns {Array} answer
 */
export const Vector2Addition = function(a, b) {
    //a - b
    return [a[0] + b[0], a[1] + b[1]];
};

/**
 * v * scale
 * @param {Array} v array of length 2
 * @param {number} scale number
 * @returns {Array} answer
 */
export const Vector2Multiply = function(v, scale) {
    return [v[0] * scale, v[1] * scale];
};

/**
 * Returns scale magnitude of vector
 * @param {Array} v array of length 2
 * @returns {number} magnitude
 */
export const Vector2Magnitude = function(v) {
    return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
};

/**
 * returns vector of magnitude 1
 * @param {Array} v array of length 2 
 * @returns {Array} answer
 */
export const Vector2Normalize = function(v) {
    //a - b
    let magnitude = Vector2Magnitude(v);
    return [v[0] / magnitude, v[1] / magnitude];
};