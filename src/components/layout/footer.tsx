import { Beaker } from 'lucide-react';
import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="relative py-16 px-4">
      <div className="section-divider mb-16" />
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2.5">
            <Beaker className="h-6 w-6 text-accent-amber" />
            <span className="text-xl font-bold text-text-primary tracking-tight">
              Transmute <span className="text-gradient">Labs</span>
            </span>
          </div>
          <div className="text-text-muted text-center md:text-right text-sm">
            <p>&copy; {new Date().getFullYear()} Transmute Labs LLP. All rights reserved.</p>
            <p className="mt-1 text-text-muted/60">transmutelabs.in</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
