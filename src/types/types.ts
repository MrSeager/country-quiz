export type CountryProps = {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  capital: string;
};

export type QuestionProps = {
  type: "flag" | "capital";
  question: string;
  flagUrl?: string;
  option: number;
  answer: string;
  choices: string[];
}