import { Request, Response, NextFunction} from 'express';

declare module 'express-serve-static-core' {
  interface Response {
    sendResponse: (input: any) => void,
  }
}

type MimeType = {
  major: string,
  minor: string,
  params: {[key: string]: string},
}

const parseMimeType = (raw: string): MimeType => {
  const [
    major = '*',
    minor = '*',
    ...rawParams
  ] = raw.toLowerCase().split(/[\/;]/);

  return {
    major,
    minor,
    params: Object.fromEntries(rawParams.map(p => p.split('='))),
  }
}

type AcceptedTypes = {[major: string]: {[minor: string]: {
  stringify: (input: any) => string,
}}}

const mkCheckAccepted = (acceptedTypes: AcceptedTypes) => (check: MimeType): boolean => {

  if(check.major === '*') 
    return true;

  if(acceptedTypes[check.major] && ( acceptedTypes[check.major][check.minor] || check.minor === '*' ))
    return true;

  return false;
}

/**
 * Parses the `Accept` header of the sets the headers and encodes the response 
 * with the `sendResponse` function.
 * If the `Accept` header does not contain a supported type an status `406` is send.
 **/
const responseType = (acceptedTypes: AcceptedTypes) => {
  const checkAccepted = mkCheckAccepted(acceptedTypes);

  return (req: Request, res: Response, next: NextFunction) => {
    // The mimetype of that is supported with the heigest weigth or undefined
    const mimeType = req.headers.accept
      // Split on `,` and trim whitespace
      ?.split(',').map(r=> r.trim())
      // Parse as mime
      .map(parseMimeType)
      // Sort mime types by `q` (q 0-1, higher is better, default = 1)
      .sort((m1: MimeType, m2: MimeType) => 
        (m2.params['q'] || 1) as number - ((m1.params['q'] || 1) as number)
      )
      // Find the first accepted mime type (with heighest q value)
      .find(checkAccepted)

    // If a supperted mimetype is accepted the set the send function to use the correct encoding
    if(mimeType) {
      // Resolve '*' wildcards
      let { major, minor } = mimeType;
      major = major === '*' ? Object.keys(acceptedTypes)[0] : major;
      minor = minor === '*' ? Object.keys(acceptedTypes[major])[0] : minor;

      // Set the `Content-Type header`
      res.setHeader('Content-Type', `${major}/${minor}`);

      const { stringify } = acceptedTypes[major][minor];

      res.sendResponse = (input: any) => {
        res.send(stringify(input))
      }
      next();
    }
    // If no mimetype is supported send error 406
    else {
      res
        .status(406)
        .send(`Non of the Accept types: "${req.headers.accept}" are supported on "${req.method.toUpperCase()} ${req.originalUrl}"`)
    }
  }
}

export default responseType;
