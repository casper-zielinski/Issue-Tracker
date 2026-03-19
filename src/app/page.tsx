import ConfirmedLogin from "./components/ConfirmedLogin";
import Hero from "./Hero";

export default function Home() {
  return (
    <ConfirmedLogin>
      <Hero />
    </ConfirmedLogin>
  );
}
