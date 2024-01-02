// *** Error *** //
export const error = {
  type: "object",
  required: ["name", "message"],
  properties: {
    name: { type: "string" },
    message: { type: "string" },
  },
  additionalProperties: true,
} as const;
