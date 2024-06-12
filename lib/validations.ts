import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


export const QuestionsSchema = z.object({
  title  : z.string().min(5).max(130),
  explanation : z.string().min(100),
  tags : z.array(z.string().min().max(15).min(1).max(3)),
   
});
