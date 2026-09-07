// @ts-check
import { module } from "@prisma/composer";
import mediabookService from "./service.mjs";

export default module("filmsbook", ({ provision }) => {
  provision(mediabookService);
});
