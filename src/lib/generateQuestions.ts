import { CountryProps, QuestionProps } from "@/types/types";

export async function generateQuestions(): Promise<QuestionProps> {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
  const countries = await res.json();

  const validCountries = countries.filter((c: CountryProps) => c.name?.common && c.cca2);

  const selected = Array.from({ length: 4 }, () => {
    const index = Math.floor(Math.random() * validCountries.length);
    return validCountries[index];
  });

  const correctIndex = Math.floor(Math.random() * 4);
  const correctCountry = selected[correctIndex];

  return {
    question: `Which country does this flag belong to?`, // image will be rendered inline in UI
    flagUrl: `https://flagcdn.com/48x36/${correctCountry.cca2.toLowerCase()}.png`,
    option: correctIndex + 1,
    answer: correctCountry.name.common,
    choices: selected.map((c: CountryProps) => c.name.common),
  };
}