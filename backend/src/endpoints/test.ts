import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import responseType from '../middleware/responseType';

import YAML from 'yaml';

const router = Router();

type Options = {
  headers?: string[],
  origin?: string | null,
}

const optionHeaders = ({ headers = [], origin = null}: Options) => (req: Request, res: Response) => {
  res.setHeader(
    'Acces-Control-Allow-Methods',
    req.route.stack
      // Get all bound methods
      .map((l: any) => l['method'])
      // Filter off catchall
      .filter((x: any) => x)
      // Make Methods uppercase
      .map((m: string) => m.toUpperCase())
      // Join methods to string
      .join(", ")
  );

  res.setHeader('Acces-Control-Allow-Headers', headers.join(", "));
  res.setHeader('Acces-Control-Allow-Origin',  origin || 'null');

  res.status(200).sendResponse({ msg: 'OK' });
}

const options = optionHeaders({
  headers: [ 'Accept', 'Content-Type' ],
  origin: '*',
});

const methodNotSupported = (req: Request, res: Response) => {
  res
    .status(405)
    .sendResponse({
      msg: `Method "${req.method}" not supported on "${req.baseUrl}"`
    })
}

router.use(responseType({
  'application': {
    'json': { stringify: JSON.stringify },
    'yaml': { stringify: YAML.stringify },
  },
}));

router.route("/")
  .options(options)
  .get((_req, res) => res.sendResponse([
    { id: 0, msg: 'this is a test' },
    { id: 1, msg: 'another test' },
  ]))
  .all(methodNotSupported);

router.route("/:id")
  .options(options)
  .get((_req, res) => res.sendResponse({ id: 0, msg: 'this is a test' }))
  .post((_req, res) => res.sendResponse({ id: 0, msg: 'this is a test' }))
  .delete((_req, res) => res.sendResponse({ id: 0, msg: 'this is a test' }))
  .patch((_req, res) => res.sendResponse({ id: 0, msg: 'this is a test' }))
  .put((_req, res) => res.sendResponse({ id: 0, msg: 'this is a test' }))
  .all(methodNotSupported)

export default router;
