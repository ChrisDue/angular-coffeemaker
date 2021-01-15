export enum Unit {
    ml = "ml",
    g = "g"
}

export class Ingredient {
    id!: number;
    name!: string;
    unit!: Unit;
    amount!: number;
}