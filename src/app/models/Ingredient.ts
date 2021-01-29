export enum Id {
    coffee = 1,
    water = 2,
    milk = 3,
    cocoa = 4
}
export enum Name {
    coffee = "Coffee",
    water = "Water",
    milk = "Milk",
    cocoa = "Cocoa"
}
export enum Unit {
    ml = "ml",
    g = "g"
}

export class Ingredient {
    id!: Id;
    name!: string;
    unit!: Unit;
    amount!: number;
}