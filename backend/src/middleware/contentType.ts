import { Request, Response, NextFunction } from 'express';

const contentType = (...supported: string[]) => {
  supported = supported.map(x => x.toLowerCase());

  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers['content-type']);
    if(!supported.includes(req.headers['content-type']?.toLowerCase() as string)) {
      res
        .status(406)
        .send(`Content-Type "${req.headers['content-type'] || 'No Content-Type' }" is not supported for "${req.url}"`);
    } else {
      next();
    }
  };
}

export default contentType;
