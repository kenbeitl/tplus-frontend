import { Box, SxProps, Theme } from '@mui/material';

interface EmojiProps {
  symbol: string;
  size?: number;
  sx?: SxProps<Theme>;
  className?: string;
}

export default function Emoji({ symbol, size = 20, sx, className }: EmojiProps) {
  return (
    <Box
      component="span"
      role="img"
      aria-label="emoji"
      sx={{
        width: size,
        height: size,
        fontSize: size * 0.75,
        display: 'inline-flex',
        placeItems: 'center',
        ...sx,
      }}
      className={className}
    >
      {symbol}
    </Box>
  );
}