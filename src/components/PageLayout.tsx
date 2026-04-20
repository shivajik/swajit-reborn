import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopStrip from "@/components/TopStrip";

const PageLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <TopStrip />
    <Navbar />
    <main className="pt-24 md:pt-[116px]">{children}</main>
    <Footer />
  </div>
);

export default PageLayout;
