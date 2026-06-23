'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface StoryItem {
  image: string;
  text: string;
  highlight?: string;
  align: 'left' | 'right' | 'center';
}

const stories: StoryItem[] = [
  {
    image: '/images/lorenzo-1.jpg',
    text: 'Esse é o',
    highlight: 'Lorenzo.',
    align: 'center',
  },
  {
    image: '/images/lorenzo-2.jpg',
    text: 'Ele está prestes a completar',
    highlight: '6 anos.',
    align: 'right',
  },
  {
    image: '/images/lorenzo-3.jpg',
    text: 'Ele adora brincar, correr, dar risada...\ne também é fã do',
    highlight: 'Homem-Aranha! 🕷️',
    align: 'left',
  },
  {
    image: '/images/spider-city.jpg',
    text: 'Mas até os heróis\nprecisam dos seus',
    highlight: 'amigos.',
    align: 'center',
  },
  {
    image: '/images/lorenzo-hero.jpg',
    text: 'Por isso você foi escolhido para',
    highlight: 'essa missão.',
    align: 'right',
  },
];

function StoryCard({ story, index }: { story: StoryItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const isOdd = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 gpu-accelerated"
      >
        <Image
          src={story.image}
          alt={`Foto do Lorenzo ${index + 1}`}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={index === 0}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: isOdd
              ? 'linear-gradient(to bottom, rgba(10,10,26,0.5) 0%, rgba(10,10,26,0.3) 40%, rgba(10,10,26,0.85) 75%, #0A0A1A 100%)'
              : 'linear-gradient(to bottom, rgba(10,10,26,0.6) 0%, rgba(10,10,26,0.4) 40%, rgba(10,10,26,0.9) 75%, #0A0A1A 100%)',
          }}
        />
      </motion.div>

      {/* Text content */}
      <div className="relative z-10 w-full max-w-sm mx-auto mt-auto pb-12">
        <AnimatedSection delay={100}>
          <div
            className={`flex flex-col gap-1 ${
              story.align === 'center'
                ? 'items-center text-center'
                : story.align === 'right'
                ? 'items-end text-right'
                : 'items-start text-left'
            }`}
          >
            <p className="text-white/80 text-xl font-light leading-snug whitespace-pre-line">
              {story.text}
            </p>
            {story.highlight && (
              <p
                className="text-gradient-hero font-display text-5xl md:text-6xl leading-none"
                style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
              >
                {story.highlight}
              </p>
            )}
          </div>
        </AnimatedSection>
      </div>

      {/* Spider web accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A0A1A)' }}
      />
    </div>
  );
}

export default function StorySection() {
  return (
    <section id="story">
      {stories.map((story, i) => (
        <StoryCard key={i} story={story} index={i} />
      ))}
    </section>
  );
}
