import '../components/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CountryQuizPage from "@/components/CountryQuizPage";

export const metadata = {
  title: "Country Quiz",
  openGraph: {
    title: "Country Quiz",
    description: "Test your knowledge about the countries of the world.",
    images: [
      {
        url: "https://csyxkpbavpcrhwqhcpyy.supabase.co/storage/v1/object/public/challenges/50/challenge-50-thumbnail",
        width: 1920,
        height: 1080,
        alt: "Country Quiz Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Country Quiz",
    description: "Test your knowledge about the countries of the world.",
    images: [
      "https://csyxkpbavpcrhwqhcpyy.supabase.co/storage/v1/object/public/challenges/50/challenge-50-thumbnail",
    ],
  },
}

export default function Home() {
  return <CountryQuizPage />
}
