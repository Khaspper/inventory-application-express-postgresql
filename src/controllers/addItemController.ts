import { Request, Response } from "express";
import { postNewItem } from "../db/queries";
import { body, validationResult, ValidationChain } from "express-validator";

const EmptyError = "must not be empty.";

const itemNameLengthError = "must be between 1 and 50 characters.";
const itemNameError = "must only contain alphanumeric characters.";

const NumberError = "must only contains numbers.";
const priceRangeError = "must be between 1 and 999999.";

const durabilityRangeError = "must be between 1 and 999999.";

const quantityRangeError = "must be between 1 and 5.";

export const validateItem: ValidationChain[] = [
  body("item_name")
    .trim()
    .notEmpty()
    .withMessage(`Item name ${EmptyError}`)
    .isAlphanumeric()
    .withMessage(`Item name ${itemNameError}`)
    .isLength({ min: 1, max: 50 })
    .withMessage(`Item name ${itemNameLengthError}`),

  body("price")
    .trim()
    .notEmpty()
    .withMessage(`Price ${EmptyError}`)
    .isNumeric()
    .withMessage(`Price ${NumberError}`)
    .isFloat({ min: 1, max: 999999 })
    .withMessage(`Price ${priceRangeError}`),

  body("durability")
    .trim()
    .notEmpty()
    .withMessage(`Durability ${EmptyError}`)
    .isNumeric()
    .withMessage(`Durability ${NumberError}`)
    .isFloat({ min: 1, max: 5 })
    .withMessage(`Durability ${durabilityRangeError}`),

  body("quantity")
    .trim()
    .notEmpty()
    .withMessage(`Quantity ${EmptyError}`)
    .isNumeric()
    .withMessage(`Quantity ${NumberError}`)
    .isFloat({ min: 1, max: 9999 })
    .withMessage(`Quantity ${quantityRangeError}`),

  body("category")
    .trim()
    .notEmpty()
    .withMessage(`WHAT ARE YOU DOING`)
    .isAlpha()
    .withMessage(`STOP TRYING TO HACK ME!!!!`)
    .isLength({ min: 1, max: 50 })
    .withMessage(`I put a length max :PPPPPPPPP`)
    .isIn(["weapon", "clothing", "food", "accessories", "ammunition"])
    .withMessage(`HOW DID YOU EVEN DO THIS!!!!`),
];

export const addNewItemToDB = [
  validateItem,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addItemForm", {
        title: "Add New Item",
        errors: errors.array(),
      });
    }
    await postNewItem(req.body);
    res.redirect("/");
  },
];

export async function addItemForm(req: Request, res: Response) {
  res.render("addItemForm", { title: "Add New Item" });
}
