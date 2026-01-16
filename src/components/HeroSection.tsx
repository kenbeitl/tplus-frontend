import { Box, Typography } from '@mui/material';
import theme from '@/theme/theme';

interface HeroSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  /**
   * Color scheme for the gradient background and text
   * @default 'blue'
   */
  colorScheme?: 'blue' | 'indigo' | 'purple' | 'emerald' | 'cyan' | 'violet';
}

const colorSchemes = {
  blue: {
    gradient: theme.palette.gradientClasses.heroBlue,
    textColor: 'text-blue-100',
  },
  indigo: {
    gradient: theme.palette.gradientClasses.heroIndigo,
    textColor: 'text-purple-100',
  },
  purple: {
    gradient: theme.palette.gradientClasses.heroPurple,
    textColor: 'text-purple-100',
  },
  emerald: {
    gradient: theme.palette.gradientClasses.heroEmerald,
    textColor: 'text-teal-100',
  },
  cyan: {
    gradient: theme.palette.gradientClasses.heroCyan,
    textColor: 'text-cyan-100',
  },
  violet: {
    gradient: theme.palette.gradientClasses.heroViolet,
    textColor: 'text-purple-100',
  },
};

function splitIntoSentences(text: string): string[] {
  
  const sentences = text
    .split(/([.!?])\s+/)
    .reduce((acc: string[], curr, i, arr) => {
      if (i % 2 === 1 && i > 0) {
        acc[acc.length - 1] += curr;
      }      
      else if (curr.trim()) {
        acc.push(curr.trim());
      }
      return acc;
    }, []);

  return sentences.filter(s => s.length > 0);
}

export default function HeroSection({ 
  title, 
  description, 
  icon, 
  colorScheme = 'blue' 
}: HeroSectionProps) {
  const colors = colorSchemes[colorScheme];
  const sentences = splitIntoSentences(description);

  return (
    <Box className={`relative overflow-hidden rounded-2xl ${colors.gradient} p-5 text-white shadow-xl`}>
      <Box 
        className="absolute inset-0 bg-grid-white/10" 
        sx={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"60\\" height=\\"60\\" viewBox=\\"0 0 60 60\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cg fill=\\"none\\" fill-rule=\\"evenodd\\"%3E%3Cg fill=\\"%23ffffff\\" fill-opacity=\\"0.05\\"%3E%3Cpath d=\\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' 
        }}
      />
      <Box className="relative">
        <Box className="flex items-center space-x-3 mb-4">
          <Box className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            {icon}
          </Box>
          <Typography variant="h1" component="h1">
            {title}
          </Typography>
        </Box>
        <Box className={`${colors.textColor} text-lg max-w-3xl leading-relaxed`}>
          {sentences.map((sentence, index) => (
            <Typography key={index} variant="h5" component="p" sx={{ fontWeight: 400 }}>
              {sentence}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
