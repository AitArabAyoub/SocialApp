import { z } from 'zod';

export const RegSchema = z.object({
    name: z.string().min(6,{message : "Too Short"}),
    username: z.string().min(6,{message : "Too Short"}),
    email: z.string().email({message : "Invalide Email"}),
    password: z.string().min(8,{message : "Password Must be At least 8 characters"}),
})
export type RegSchemaProps = z.infer<typeof RegSchema>;
// 
export const LogSchema = z.object({
    email: z.string().email({message : "Invalide Email"}),
    password: z.string().min(8,{message : "Password Must be At least 8 characters"}),
})
export type LogSchemaProps = z.infer<typeof RegSchema>;
// 
export const EditSchema = z.object({
    name: z.string().min(6,{message : "Too Short"}),
    username: z.string().min(6,{message : "Too Short"}),
    profileImg : z.string(),
    bio : z.string()
})
export type EditSchemaProps = z.infer<typeof EditSchema>
