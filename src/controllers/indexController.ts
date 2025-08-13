import { Request, Response } from "express";
import { getAllItems, getFilteredItems } from "../db/queries";
import {
  query,
  body,
  validationResult,
  ValidationChain,
} from "express-validator";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const EmptyError = "must not be empty.";

const itemNameLengthError = "must be between 1 and 50 characters.";
const itemNameError = "must only contain alphanumeric characters.";

const SECRET = process.env.SECRET_PASSWORD ?? ""; // set in .env, not committed

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

const validateFilter: ValidationChain[] = [
  query("item_name")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage(`Item name ${EmptyError}`)
    .isAlphanumeric()
    .withMessage(`Item name ${itemNameError}`)
    .isLength({ min: 1, max: 50 })
    .withMessage(`Item name ${itemNameLengthError}`),

  query("category")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage(`WHAT ARE YOU DOING`)
    .isAlpha()
    .withMessage(`STOP TRYING TO HACK ME!!!!`)
    .isLength({ min: 1, max: 50 })
    .withMessage(`I put a length max :PPPPPPPPP`)
    .isIn(["all", "weapon", "clothing", "food", "accessories", "ammunition"])
    .withMessage(`category: HOW DID YOU EVEN DO THIS!!!!`),

  query("sort_by")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage(`WHAT ARE YOU DOING`)
    .isAlpha()
    .withMessage(`STOP TRYING TO HACK ME!!!!`)
    .isLength({ min: 1, max: 50 })
    .withMessage(`I put a length max :PPPPPPPPP`)
    .isIn(["none", "price", "food", "durability", "quantity"])
    .withMessage(`sort_by: HOW DID YOU EVEN DO THIS!!!!`),

  query("order")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage(`WHAT ARE YOU DOING`)
    .isAlpha()
    .withMessage(`STOP TRYING TO HACK ME!!!!`)
    .isLength({ min: 1, max: 50 })
    .withMessage(`I put a length max :PPPPPPPPP`)
    .isIn(["none", "ascending", "descending"])
    .withMessage(`order: HOW DID YOU EVEN DO THIS!!!!`),
];

const validateSecretPath: ValidationChain[] = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(`You're not one of my friends... :P NO SECRET`)
    .isAlpha()
    .withMessage(`WHY ARE YOU EVEN TRYING THIS`)
    .isIn(["patrick", "tyler", "joesph"])
    .withMessage("WHAT ARE YOU DOING DUDE"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage(`You're not one of my friends... :P NO SECRET`),
];

export async function getItems(req: Request, res: Response) {
  const items = await getAllItems();
  res.render("index", { title: "Items list", items: items });
}

export const filterItems = [
  validateFilter,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const items = await getAllItems();
      return res.status(400).render("index", {
        title: "Items list",
        items: items,
        errors: errors.array(),
      });
    }
    const items = await getFilteredItems(req.query);
    res.render("index", { title: "Items list", items: items });
  },
];

export function secretButton(req: Request, res: Response) {
  res.render("entrance");
}

export const welcomeToTheSecret = [
  validateSecretPath,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // re-render with errors (don’t echo password)
      return res.status(400).render("entrance", { errors: errors.array() });
    }

    const { password } = req.body as { password: string };

    if (!safeEqual(password, SECRET)) {
      return res.status(401).render("entrance", {
        errors: [{ msg: "Wrong password." }],
      });
    }
    res.render("secret");
  },
];
