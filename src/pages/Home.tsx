import React from 'react';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { GitHubStats } from '../components/GitHubStats';
import { Certificates } from '../sections/Certificates';
import { Experience } from '../sections/Experience';
import { Contact } from '../sections/Contact';

export const Home: React.FC = () => {
  return (
    <main className="w-full">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GitHubStats />
      <Certificates />
      <Experience />
      <Contact />
    </main>
  );
};
