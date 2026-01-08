export type Category = "general" | "template" | "billing" | "emergency" | "career" | "idea";
export type ActionKind = "WHATSAPP" | "EMAIL" | "TICKET" | "DOCS" | "MAPS";

export type AgentAction = {
  kind: ActionKind;
  label: string;
  value: string;
};

export type AgentResponse = {
  category: Category;
  reply: string;
  actions?: AgentAction[];
  lead?: { intent: "low" | "medium" | "high"; summary?: string };
};
