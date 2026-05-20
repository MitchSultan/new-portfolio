import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/skill";
import NewTest from "./components/new-test";
import Footer from "./components/footer";
import HomeBelowFold from "./components/HomeBelowFold";

export default function Page() {
  return (
    <div className="p-4 overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <NewTest />
      <HomeBelowFold />
      <Footer />
    </div>
  );
}
