import Image from "next/image";
import styles from "./page.module.css";
import '../components/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CountryQuizPage from "@/components/CountryQuizPage";

export default function Home() {
  return <CountryQuizPage />
}
