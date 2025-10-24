import { CountryProps, QuestionProps } from "@/types/types";

export async function generateQuestions(): Promise<QuestionProps> {
  const generators = [generateFlagQuestion, generateCapitalQuestion, generateCountryFromCapitalQuestion, generateRegionQuestion];
  const randomIndex = Math.floor(Math.random() * generators.length);
  return await generators[randomIndex]();
}

function getRandomUnique<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

// Which country does this flag {flag} belong to? - question
export async function generateFlagQuestion(): Promise<QuestionProps> {
const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
  const countries = await res.json();

  const validCountries = countries.filter((c: CountryProps) => c.name?.common && c.cca2);
  const selected: CountryProps[] = getRandomUnique(validCountries, 4);
  const correctIndex = Math.floor(Math.random() * 4);
  const correctCountry = selected[correctIndex];

  return {
    type: "flag",
    question: "Which country does this flag {flag} belong to?",
    flagUrl: `https://flagcdn.com/48x36/${correctCountry.cca2.toLowerCase()}.png`,
    option: correctIndex + 1,
    answer: correctCountry.name.common,
    choices: selected.map((c: CountryProps) => c.name.common),
  };
}

// What is the capital of {country} - question
export async function generateCapitalQuestion(): Promise<QuestionProps> {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,capital');
  const countries = await res.json();

  const validCountries = countries.filter((c: CountryProps) => c.name?.common && Array.isArray(c.capital) && c.capital[0]);
  const selected: CountryProps[] = getRandomUnique(validCountries, 4);
  const correctIndex = Math.floor(Math.random() * 4);
  const correctCountry = selected[correctIndex];

  return {
    type: "capital",
    question: `What is the capital of ${correctCountry.name.common}?`,
    flagUrl: undefined,
    option: correctIndex + 1,
    answer: correctCountry.capital[0],
    choices: selected.map((c: CountryProps) => c.capital[0]),
  };
}

// Which country has the capital {capital}? - question
export async function generateCountryFromCapitalQuestion(): Promise<QuestionProps> {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,capital');
  const countries = await res.json();

  const validCountries = countries.filter(
    (c: CountryProps) => c.name?.common && Array.isArray(c.capital) && typeof c.capital[0] === "string"
  );

  // Ensure unique capital cities
  const uniqueCapitalCountries: CountryProps[] = [];
  const seenCapitals = new Set<string>();

  for (const country of validCountries) {
    const capital = country.capital[0];
    if (!seenCapitals.has(capital)) {
      uniqueCapitalCountries.push(country);
      seenCapitals.add(capital);
    }
  }

  const selected: CountryProps[] = getRandomUnique(uniqueCapitalCountries, 4);
  const correctIndex = Math.floor(Math.random() * 4);
  const correctCountry = selected[correctIndex];

  return {
    type: "country-from-capital",
    question: `Which country has the capital ${correctCountry.capital[0]}?`,
    flagUrl: undefined,
    option: correctIndex + 1,
    answer: correctCountry.name.common,
    choices: selected.map((c: CountryProps) => c.name.common),
  };
}

// Which region does {country} belong to?
export async function generateRegionQuestion(): Promise<QuestionProps> {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,region');
  const countries = await res.json();

  const uniqueRegionCountries: CountryProps[] = [];
  const seenRegions = new Set<string>();

  const validCountries = countries.filter(
    (c: CountryProps) => c.name?.common && typeof c.region === "string" && c.region.length > 0
  );

  for (const country of validCountries) {
    if (!seenRegions.has(country.region)) {
      uniqueRegionCountries.push(country);
      seenRegions.add(country.region);
    }
  }

  const selected: CountryProps[] = getRandomUnique(uniqueRegionCountries, 4);
  const correctIndex = Math.floor(Math.random() * 4);
  const correctCountry = selected[correctIndex];

  return {
    type: "region",
    question: `Which region does ${correctCountry.name.common} belong to?`,
    flagUrl: undefined,
    option: correctIndex + 1,
    answer: correctCountry.region,
    choices: selected.map((c: CountryProps) => c.region),
  };
}