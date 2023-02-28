import { readdirSync } from 'node:fs';

import { Express, Router } from 'express';

export default function (app: Express) {
  const router = Router()
  app.use('/api', router)

  readdirSync(`${__dirname}/../routes`).map(async file => {
    if (!file.includes('.test.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
