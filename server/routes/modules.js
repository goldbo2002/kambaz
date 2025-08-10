import { Router } from "express";
import * as dao from "../dao/modules.js";

const router = Router();

router.get("/course/:cid", async (req, res) => res.json(await dao.findByCourse(req.params.cid)));
router.post("/", async (req, res) => res.status(201).json(await dao.createOne(req.body)));
router.put("/:mid", async (req, res) => {
  const updated = await dao.updateOne(req.params.mid, req.body);
  if (!updated) return res.sendStatus(404);
  res.json(updated);
});
router.delete("/:mid", async (req, res) => {
  const removed = await dao.removeOne(req.params.mid);
  if (!removed) return res.sendStatus(404);
  res.json({ ok: true });
});

export default router;
