import z from 'zod';

export const statusEquipment = z.enum(['working', 'maintenance', 'broken']);
export const typeMachine = z.enum(['Cardio', 'Weights', 'Resistance', 'Training', 'Flexibility']);

export type status = z.infer<typeof statusEquipment>