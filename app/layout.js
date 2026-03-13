import './globals.css';
import NavBar from './components/NavBar';

export const metadata = {
  title: 'Logos Nova LLC | AI Automation Consulting',
  description:
    'AI Automation Consulting for Federal and Commercial Clients. SDVOSB Certified. Austin, Texas.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NavBar />
        <main>{children}</main>
        <footer className="bg-navy text-white py-10 px-6">
          <div className="max-w-6xl mx-auto text-center space-y-2">
            <p className="font-semibold">
              Logos Nova LLC | SDVOSB Certified | Austin, Texas
            </p>
            <p className="text-muted text-sm">
              AI Automation Consulting for Federal and Commercial Clients
            </p>
            <p className="text-muted text-sm">© 2025 Logos Nova LLC</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
