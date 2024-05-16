import { difference } from 'lodash';

export const relationDifferenceByIds = (
  connectedIds: number[],
  newIds: number[],
) => {
  const disconnect = difference(connectedIds, newIds).map((id) => ({
    id,
  }));
  const connect = difference(newIds, connectedIds).map((id) => ({
    id,
  }));

  return { connect, disconnect };
};
