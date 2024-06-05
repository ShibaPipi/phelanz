import { difference } from 'lodash';

/**
 * Computes the difference between two arrays of IDs to determine which IDs need to be connected and which need to be disconnected.
 *
 * @param {number[]} connectedIds - Array of currently connected IDs.
 * @param {number[]} newIds - Array of new IDs to be connected.
 * @returns {Object} An object containing `connect` and `disconnect` arrays with the respective IDs.
 */
export const relationDifferenceByIds = (
  connectedIds: number[],
  newIds: number[],
): {
  connect: Array<{
    id: number;
  }>;
  disconnect: Array<{
    id: number;
  }>;
} => {
  const disconnect = difference(connectedIds, newIds).map((id) => ({
    id,
  }));
  const connect = difference(newIds, connectedIds).map((id) => ({
    id,
  }));

  return { connect, disconnect };
};

/**
 * Converts a relative image path to a full URL by replacing the 'public' directory with the application's base URL.
 *
 * @param {string} path - The relative path to the image.
 * @returns {string} The full URL to the image.
 */
export const getImageFullUrl = (path: string): string =>
  path.replace('public', process.env.APP_URL);

/**
 * Parses a query parameter key to extract the field name and condition (if any).
 *
 * @param {string} key - The query parameter key.
 * @returns {[string, string]} A tuple containing the field name and condition.
 */
export const parseFieldAndCondition = (key: string): [string, string] => {
  const parts = key.split('_');
  if (parts.length > 1) {
    const condition = parts.pop();
    const field = parts.join('_');
    return [field, condition];
  }
  return [key, ''];
};

/**
 * Parses a query parameter value to convert it to the appropriate type.
 *
 * @param {any} value - The query parameter value.
 * @returns {any} The parsed value, converted to the appropriate type.
 */
export const parseValue = (value: any): any => {
  if (typeof value === 'string' && !isNaN(Number(value))) {
    return Number(value);
  } else if (typeof value === 'string') {
    return value;
  } else if (Array.isArray(value)) {
    return { in: value };
  } else if (typeof value === 'object') {
    return value;
  }
  return value;
};
