import { Mongo } from 'meteor/mongo';

// Notice that we stored the file in the imports/api directory,
// which is a place to store API-related code, like publications and methods.
// You can name this folder as you want, this is just an optional way to name it.
// Note : For our collection to work, you need to import it into the server-side, so it sets some plumbing up.

export const FilesCollection = new Mongo.Collection('files');
