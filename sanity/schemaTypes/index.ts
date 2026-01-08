import { type SchemaTypeDefinition } from "sanity";
import category from "../../schemas/category";
import template from "../../schemas/template";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, template],
};
