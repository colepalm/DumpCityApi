import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import messageResolvers from './message';
import showResolvers from './show';
import songResolvers from './song';
import venueResolvers from './venue'

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
  songResolvers,
  showResolvers,
  venueResolvers
];