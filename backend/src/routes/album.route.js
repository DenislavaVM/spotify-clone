import { Router } from "express";
import { getAlbumsId, getAllAlbums } from "../controller/album.controller.js";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumsId);

export default router;