// Pack Your Tour — Design System tokens as JS object
// Load this once in each UI kit HTML as <script src="../../tokens.js"></script>

window.PYT = {
  color: {
    brand50:  'rgb(238,237,255)',
    brand100: 'rgb(216,213,255)',
    brand300: 'rgb(154,147,255)',
    brand500: 'rgb(87,75,255)',
    brand600: 'rgb(61,49,231)',
    brand700: 'rgb(72,60,239)',

    ink900: 'rgb(19,18,25)',
    ink800: 'rgb(58,58,60)',
    ink700: 'rgb(80,80,81)',
    ink600: 'rgb(102,102,103)',
    ink500: 'rgb(124,124,125)',
    ink400: 'rgb(145,145,146)',
    ink300: 'rgb(217,217,219)',
    ink200: 'rgb(230,230,232)',
    ink150: 'rgb(238,238,240)',
    ink100: 'rgb(247,247,247)',
    ink50:  'rgb(240,240,242)',
    white: 'rgb(255,255,255)',
    black: 'rgb(0,0,0)',

    green100: 'rgb(167,240,186)',
    green600: 'rgb(14,96,39)',
    green800: 'rgb(5,62,33)',
    red500: 'rgb(255,82,87)',
    red600: 'rgb(218,30,40)',
    yellow500: 'rgb(255,199,0)',
    blue500: 'rgb(0,122,255)',
  },
  radius: { xs: 4, sm: 6, md: 8, lg: 16, pill: 9999 },
  space:  { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 16: 64 },
  shadow: {
    card: '0 1px 0 0 rgba(0,0,0,0.1)',
    popover: '0 4px 12px rgba(0,0,0,0.08)',
    primary: '0 0 0 1px rgb(72,60,239)',
    focus: '0 0 0 3px rgba(87,75,255,0.18)',
  },
  font: {
    sans: '"Helvetica Neue","Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
    tracking: { sm: '0.020em', xs: '0.030em' },
  },
};
