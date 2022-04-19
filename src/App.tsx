import type { Component } from "solid-js";
import { createSignal, createMemo } from "solid-js";
import { Gender, WeightUnit, formulas } from "./formulas";
import Comp from "./Comp";
import { styled } from "solid-styled-components";

const Btn = styled("div")`
  font-size: 1rem;
  font-weight: bolder;
  cursor: pointer;
  background: none;
  border: 0.5px solid;
  border-radius: 2px;
  color: inherit;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-right: 1.5rem;
  min-width: 3.2rem;
  text-align: center;
  transition: all 0.08s ease-in-out;
`;

const RadioGroup = styled("div")`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  input[type="radio"] + label {
    color: #a1a1aa;
  }
  input[type="radio"]:checked + label {
    color: #dc2626;
  }
  input[type="radio"] + label > div:hover {
    color: #fafafa;
  }
  input[type="radio"]:checked + label > div:hover {
    color: #dc2626;
  }
`;

const InputContainer = styled("div")`
  display: flex;
  font-size: 1.5rem;
  outline: none;
  background: unset;
  border: unset;
  color: inherit;
  align-items: center;
  justify-content: space-between;

  label {
    color: #e4e4e7;
  }
`;

const BigInput = styled("input")`
  text-align: right;
  width: 100%;
  font-size: 1.5rem;
  outline: none;
  background: unset;
  border: unset;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
  color: inherit;
`;

const BigTxt = styled("p")`
  width: 100%;
  font-size: 1.5rem;
  outline: none;
  background: unset;
  border: unset;
  color: inherit;
`;

const ResultItem = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 24px;

  :first-child {
    font-size: 1.3rem;
  }
  :nth-child(2) {
    font-size: 2rem;
    font-weight: bolder;
  }
`;

const App: Component = () => {
  const [gender, setGender] = createSignal(Gender.MALE);
  const [weight, setWeight] = createSignal(0);
  const [squat, setSquat] = createSignal(0);
  const [bench, setBench] = createSignal(0);
  const [deadlift, setDeadlift] = createSignal(0);
  const [unit, setUnit] = createSignal(WeightUnit.LB);
  const rawTotal = createMemo(() => squat() + bench() + deadlift());
  const totalKg = createMemo(() =>
    unit() === WeightUnit.KG ? rawTotal() : (rawTotal() / 1000) * 453.592
  );
  const weightKg = createMemo(() =>
    unit() === WeightUnit.KG ? weight() : (weight() / 1000) * 453.492
  );

  const getFloat = (input: string, prev: number) => {
    if (!input) {
      return 0;
    }

    try {
      const num = Number.parseFloat(input);
      if (isFinite(num)) {
        return num;
      }
      return prev;
    } catch (err) {
      return prev;
    }
  };
  return (
    <>
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          "justify-content": "center",
          "max-width": "1000px",
          "margin-top": "4rem",
          padding: ".5rem",
        }}
      >
        <form
          style={{
            display: "block",
            "margin-top": "4rem",
            "max-width": "500px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <RadioGroup>
            <input
              id="male"
              type="radio"
              name="gender"
              onChange={() => setGender(Gender.MALE)}
              checked
              style={{ display: "none" }}
            />
            <label for="male">
              <Btn>Male</Btn>
            </label>
            <input
              id="female"
              type="radio"
              onChange={() => setGender(Gender.FEMALE)}
              name="gender"
              style={{ display: "none" }}
            />
            <label for="female">
              <Btn>Female</Btn>
            </label>
          </RadioGroup>
          <RadioGroup>
            <input
              id="lb"
              type="radio"
              name="unit"
              onChange={() => setUnit(WeightUnit.LB)}
              checked
              style={{ display: "none" }}
            />
            <label for="lb">
              <Btn>LB</Btn>
            </label>
            <input
              id="kg"
              type="radio"
              onChange={() => setUnit(WeightUnit.KG)}
              name="unit"
              style={{ display: "none" }}
            />
            <label for="kg">
              <Btn>KG</Btn>
            </label>
          </RadioGroup>
          <InputContainer
            style={{ "margin-bottom": "1rem", "margin-top": "2rem" }}
          >
            <label>BW</label>
            <BigInput
              required={true}
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              placeholder="0"
              onInput={(e) =>
                setWeight(getFloat((e.target as any).value, weight()))
              }
            />
          </InputContainer>
          <InputContainer>
            <label>Squat</label>
            <BigInput
              required={true}
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              placeholder="0"
              onInput={(e) =>
                setSquat(getFloat((e.target as any).value, squat()))
              }
            />
          </InputContainer>
          <InputContainer>
            <label>Bench</label>
            <BigInput
              required={true}
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              placeholder="0"
              onInput={(e) =>
                setBench(getFloat((e.target as any).value, bench()))
              }
            />
          </InputContainer>
          <InputContainer>
            <label>Deadlift</label>
            <BigInput
              required={true}
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              placeholder="0"
              onInput={(e) =>
                setDeadlift(getFloat((e.target as any).value, deadlift()))
              }
            />
          </InputContainer>

          <hr style={{ "margin-top": "1rem" }} />
          <div>
            <InputContainer>
              <BigTxt
                style={{ "text-align": "right", "margin-right": "0.25rem" }}
              >
                {rawTotal()}
              </BigTxt>
              {unit()}
            </InputContainer>
            <br />
            <div
              style={{
                display: "flex",
                "flex-wrap": "wrap",
                "margin-top": "1rem",
              }}
            >
              {Object.entries(formulas).map(([name, fn]) => (
                <ResultItem>
                  <div>{name}</div>
                  <div>
                    {fn({
                      gender: gender(),
                      total: totalKg(),
                      weight: weightKg(),
                    }).toFixed(2)}
                  </div>
                </ResultItem>
              ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
