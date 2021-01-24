import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import responseType from '../middleware/responseType';
import YAML from 'yaml';
import Post from '../models/post';

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
  .get(async (_req, res) => {
    res.sendResponse(await Post.find())
  })
  // TODO: check the schema of the body
  .post(bodyParser.json(), async (req, res) => {
    res.sendResponse(await new Post(req.body).save());
  })
  .all(methodNotSupported);

router.route("/:id")
  .options(options)
  .get(async (req, res) => { 
    const post = await Post.findOne({ '_id': req.params['id']});
    if(post) {
      res.sendResponse(post);
    } else {
      res.status(404).sendResponse({
        msg: `Postd with id "${req.params.id}" not found`,
      })
    }
  })
  .delete(async (req, res) => {
    const post = await Post.findOneAndDelete({ '_id': req.params.id });
    if(post) {
      res.sendResponse(post);
    } else {
      res.status(404).sendResponse({
        msg: `Postd with id "${req.params.id}" not found`,
      })
    }
  })
  // TODO: check the schema of the body
  .put(bodyParser.json(), async (req, res) => {
    // This does not return the updated module
    const post = await Post.findOneAndReplace({ "_id": req.params.id }, req.body, { new: true });
    if(post) {
      res.sendResponse(post);
    } else {
      res.status(404).sendResponse({
        msg: `Postd with id "${req.params.id}" not found`,
      });
    }
  })
  .all(methodNotSupported)

  export default router;
