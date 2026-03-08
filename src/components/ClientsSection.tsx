import { useState } from "react";

const categories: Record<string, string[]> = {
  Sugar: ["Balrampur Chini Mills", "Dalmia Bharat Sugar", "EID Parry", "Bajaj Hindusthan", "Triveni Engineering", "Dwarikesh Sugar", "Simbhaoli Sugars", "Mawana Sugars"],
  OEM: ["ThyssenKrupp", "ISGEC Heavy Engineering", "Walchandnagar Industries", "Thermax", "McNally Bharat", "TRF Limited"],
  "Chemical & Fertilizer": ["IFFCO", "NFL", "RCF", "Coromandel International", "Chambal Fertilisers"],
  Steel: ["SAIL", "BHEL", "Tata Steel", "JSW Steel", "Jindal Steel", "RINL Vizag Steel"],
  Cement: ["Ambuja Cement", "UltraTech Cement", "ACC Limited", "Dalmia Cement", "Shree Cement", "JK Cement"],
  Export: ["Philippines", "Mauritius", "Malaysia", "Uganda", "Kenya", "Tanzania", "Indonesia", "United Kingdom"],
};

const ClientsSection = () => {
  const [active, setActive] = useState("Sugar");

  return (
    <section id="clients" className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-foreground">Our Valued Clients</h2>
        <div className="gold-underline" />
        <p className="section-subtitle">Trusted by industry leaders across sectors</p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all ${
                active === cat
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Client grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories[active].map((client) => (
            <div
              key={client}
              className="bg-card border border-border rounded-lg p-5 flex items-center justify-center text-center hover:border-accent/40 hover:shadow-md transition-all"
            >
              <span className="font-heading font-semibold text-sm text-foreground">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
