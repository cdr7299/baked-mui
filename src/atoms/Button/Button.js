import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const Button = styled(MuiButton)(({ theme, variant }) => {
  const variants = {
    special: {
      color: theme.palette.primary.main,
      backgroundColor: 'white',
      borderColor: 'rgba(0, 0, 0, 0.22)',
      '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.primary.main
      }
    }
  };

  const defaultVariant = {
    color: theme.palette.primary.main,
    backgroundColor: 'white',
    width: '10.5rem',
    borderColor: 'rgba(0, 0, 0, 0.22)',
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.primary.main
    }
  };
  return variants[variant] ?? defaultVariant;
});

export default Button;
