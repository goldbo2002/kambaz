import { Router } from "express";
import * as dao from "../dao/assignments.js";

const router = Router();

router.get("/course/:cid", async (req, res) => res.json(await dao.findByCourse(req.params.cid)));

router.post("/", async (req, res) => {
  const created = await dao.createOne(req.body);
  res.status(201).json(created);
});

router.put("/:aid", async (req, res) => {
  const updated = await dao.updateOne(req.params.aid, req.body);
  if (!updated) return res.sendStatus(404);
  res.json(updated);
});

router.delete("/:aid", async (req, res) => {
  const removed = await dao.removeOne(req.params.aid);
  if (!removed) return res.sendStatus(404);
  res.json({ ok: true });
});

export default router;
