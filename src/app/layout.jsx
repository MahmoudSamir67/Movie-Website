import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/components.css";
import AppNavbar from "@/components/Navbar";

function RootLayout({ children }) {
  return (
    <html dir="ltr">
      <head></head>
      <body>
        <AppNavbar />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
