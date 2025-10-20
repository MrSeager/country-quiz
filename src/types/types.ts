export type CountryProps = {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
};

export type QuestionProps = {
  question: string;
  flagUrl: string;
  option: number;
  answer: string;
  choices: string[];
}