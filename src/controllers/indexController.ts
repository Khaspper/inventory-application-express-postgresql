import { Request, Response } from "express";
import { getAllItems, getFilteredItems } from "../db/queries";
import { query, validationResult, ValidationChain } from "express-validator";

const EmptyError = "must not be empty.";

const itemNameLengthError = "must be between 1 and 50 characters.";
const itemNameError = "must only contain alphanumeric characters.";

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
