import { Router } from "express";

export default function (router: Router): void {
  router.post('/sign-up', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
