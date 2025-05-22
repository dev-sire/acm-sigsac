import React, { useEffect } from 'react';

const sponsors = [
  { id: 1, name: "Meherma Tech", logo: "/msp.jpg" },
  { id: 2, name: "IEEE Education Society", logo: "/1.svg" },
];

const outreachPartners = [
  { id: 3, name: "ACM Cyber", logo: "acm-cys.jpeg" },
  { id: 4, name: "ACM BAHRIA", logo: "/2.svg" },
];

const collaborators = [
  { id: 5, name: "AIS", logo: "/ais.png" },
  { id: 6, name: "AICP", logo: "/aicp.jpeg" },
  { id: 7, name: "ACM-CSS-DUET", logo: "/acm-css.jpeg" },
];

const SectionBlock = ({ title, items }) => {
  return (
    <div className="mb-12 scroll-fx">
      <h3 className="text-white text-xl font-semibold mb-6 text-center">{title}</h3>
      <div className="flex flex-wrap justify-center gap-8">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative group scroll-fx transition-transform duration-300"
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            {/* Animated Border */}
            <div className="relative w-36 h-36 flex items-center justify-center rounded-lg">
              <div className="absolute inset-0 rounded-lg animate-border border-mask" />
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg overflow-hidden w-full h-full flex items-center justify-center relative z-10 group-hover:border-cyber-neon/80 transition-all">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-full w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-cyber-dark/90 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {item.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CollaboratorsSection = () => {
  useEffect(() => {
    const scrollFx = () => {
      const elements = document.querySelectorAll('.scroll-fx');
      elements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.85) {
          el.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', scrollFx);
    scrollFx();
    return () => window.removeEventListener('scroll', scrollFx);
  }, []);

  return (
    <section id="collaborators" className="py-24 relative bg-cyber-dark/50 mx-auto">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-neon/5 to-transparent -z-10" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-fx">
          <h2 className="text-heading-md mb-4">
            Our <span className="text-cyber-neon">Strategic</span> Alliances
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            We're proud to work with these leading organizations to advance cybersecurity 
            education and provide exceptional opportunities for our members.
          </p>
        </div>

        <SectionBlock title="Our Sponsors" items={sponsors} />
        <SectionBlock title="Outreach Partners" items={outreachPartners} />
        <SectionBlock title="Collaborators" items={collaborators} />

        <div className="mt-16 text-center scroll-fx">
          <div className="inline-block border border-white/10 bg-white/5 rounded-lg p-6 max-w-3xl">
            <h3 className="text-xl mb-4 text-cyber-neon">Become a Partner</h3>
            <p className="text-white/70 mb-6">
              Interested in collaborating with ACM SIGSAC DUET? We're always looking 
              for partners who share our passion for cybersecurity education.
            </p>
            <button className="px-6 py-2 bg-cyber-neon text-cyber-dark font-medium rounded-md hover:bg-cyber-neon/80 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaboratorsSection;
