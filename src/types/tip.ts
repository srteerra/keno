import { TipSchema } from "@/lib/schemas/tip.schema";
import { z } from "zod";

export type Tip = z.infer<typeof TipSchema>;
