import * as z from "zod";

export const ProductsSchema = z.object({
  productName: z
    .string({ required_error: "Product name name is required*" })
    .min(1, { message: "Product name is required*" }),
  qty: z
    .string({ required_error: "Quantity is required*" })
    .min(1, { message: "Quantity  is required*" }),
  rate: z
    .string({ required_error: "Rate is required*" })
    .min(1, { message: "Rate is required*" }),
  discount: z
    .string({ required_error: "Discount is required*" })
    .min(1, { message: "Discount name is required*" }),
  tax: z
    .string({ required_error: "Tax  is required*" })
    .min(1, { message: "Tax name is required*" }),
  description: z.string().optional(),
});

export type TProduct = z.infer<typeof ProductsSchema>;

export const DebitNoteSchema = z.object({
  supplierName: z.object({ label: z.string(), value: z.string() }).nullable(),
  reference: z
    .string({ required_error: "Reference is required*" })
    .min(1, { message: "Reference  is required*" }),
  date: z
    .string({ required_error: "Date is required*" })
    .min(1, { message: "Date is required*" }),
  termsCondition: z.string().optional(),
  note: z.string().optional(),
});

type TDebitNoteSchema = z.infer<typeof DebitNoteSchema>;

export interface IDebitNote extends TDebitNoteSchema {
  products?: TProduct[];
}
