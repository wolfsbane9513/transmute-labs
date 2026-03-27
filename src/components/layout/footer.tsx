import { Beaker } from 'lucide-react';
import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Beaker className="h-6 w-6 text-accent-amber" />
            <span className="text-xl font-bold text-text-primary">Transmute Labs</span>
          </div>
          <div className="text-text-muted text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Transmute Labs LLP. All rights reserved.</p>
            <p className="text-sm mt-1">transmutelabs.in</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
