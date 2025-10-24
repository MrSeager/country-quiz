export type CountryProps = {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  capital: string;
  region: string;
};

export type QuestionProps = {
  type: string;
  question: string;
  flagUrl?: string;
  option: number;
  answer: string;
  choices: string[];
}