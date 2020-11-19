import * as ContentTypeHelpers from 'content-type';
import { AnyJson, isDefined } from './typescript';

const CONTENT_TYPE_RESPONSE_HEADER = 'content-type';
const CONTENT_TYPE_JSON = 'application/json';
const checkIsJsonResponse = (response: Response) => {
  const contentTypeHeader = response.headers.get(CONTENT_TYPE_RESPONSE_HEADER);

  return (
    isDefined(contentTypeHeader) &&
    ContentTypeHelpers.parse(contentTypeHeader).type === CONTENT_TYPE_JSON
  );
};

/**
 * Note: restrict the type of JSON to `AnyJson` so that `any` doesn't leak downstream.
 */
export const getJsonResponse = (response: Response): Promise<AnyJson> => {
  if (checkIsJsonResponse(response)) {
    return response.json();
  } else {
    throw new Error('expected JSON response from server');
  }
};
