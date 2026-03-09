import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center section-padding">
        <div className="text-center max-w-lg mx-auto">
          <h1 className="text-8xl md:text-9xl font-black text-primary/10 font-heading leading-none select-none">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground -mt-4 mb-4">
            Page Not Found
          </h2>
          <div className="gold-underline" />
          <p className="text-muted-foreground mb-8">
            The page <span className="font-medium text-foreground">{location.pathname}</span> doesn't exist or has been moved. Please check the URL or navigate back.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" onClick={() => window.history.back()}>
              <span className="cursor-pointer" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </span>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
