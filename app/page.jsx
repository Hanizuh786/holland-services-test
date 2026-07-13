import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeSections from "../components/HomeSections";
import JsonLd from "../components/JsonLd";
export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <HomeSections />
      </main>
      <Footer />
    </>
  );
}
