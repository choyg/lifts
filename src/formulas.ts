export enum Gender {
  MALE = "male",
  FEMALE = "female",
}
export enum WeightUnit {
  LB = "lb",
  KG = "kg",
}
type FormInput = {
  gender: Gender;
  total: number;
  weight: number;
};

export const wilks = ({ gender, weight, total }: FormInput) => {
  const f = -0.00000001291;
  const e = 0.00000701863;
  const d = -0.00113732;
  const c = -0.002388645;
  const b = 16.2606339;
  const a = -216.0475144;
  return (
    total *
    (500 /
      (a +
        b * weight +
        c * Math.pow(weight, 2) +
        d * Math.pow(weight, 3) +
        e * Math.pow(weight, 4) +
        f * Math.pow(weight, 5)))
  );
};

export const wilks2020 = ({ gender, weight, total }: FormInput) => {
  const f = -0.0000000120804336482315;
  const e = 0.00000707665973070743;
  const d = -0.001395833811;
  const c = 0.07369410346;
  const b = 8.472061379;
  const a = 47.46178854;
  return (
    total *
    (600 /
      (a +
        b * weight +
        c * Math.pow(weight, 2) +
        d * Math.pow(weight, 3) +
        e * Math.pow(weight, 4) +
        f * Math.pow(weight, 5)))
  );
};

export const ipfGL = ({ gender, weight, total }: FormInput) => {
  const a = 1199.72839;
  const b = 1025.18162;
  const c = -0.00921;

  return total * (100 / (a - b * Math.pow(Math.E, c * weight)));
};

export const dots = ({ gender, weight, total }: FormInput) => {
  const a = -0.000001093;
  const b = 0.0007391293;
  const c = -0.1918759221;
  const d = 24.0900756;
  const e = -307.75076;
  return (
    total *
    (500 /
      (a * Math.pow(weight, 4) +
        b * Math.pow(weight, 3) +
        c * Math.pow(weight, 2) +
        d * weight +
        e))
  );
};

export const formulas = {
  Wilks: wilks,
  "Wilks 2020": wilks2020,
  "IPF GL": ipfGL,
  DOTS: dots,
};
