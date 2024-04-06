import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Navbar } from '../components/Nav/Navbar'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Welcome />
    </>
  );
}