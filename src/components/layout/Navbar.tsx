import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 transition-all duration-300 ${isScrolled ? 'pt-4' : 'pt-6'}`}
    >
      <div className={`glass px-6 py-3 rounded-full flex items-center justify-between w-full max-w-5xl transition-all duration-300 ${isScrolled ? 'border-white/10 bg-black/40' : 'border-transparent bg-transparent'}`}>
        <a href="#" className="text-xl font-display font-bold text-white tracking-tighter">
          HASEEB<span className="text-neonBlue">.DEV</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white hover:text-shadow-glow transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="relative px-5 py-2 text-sm font-medium text-white rounded-full group overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-neonBlue to-neonPurple opacity-80 group-hover:opacity-100 transition-opacity"></span>
          <span className="relative z-10">Hire Me</span>
        </a>
      </div>
    </motion.nav>
  );
};
