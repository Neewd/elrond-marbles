const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#FAFAFA',
          300: '#D4D4D8',
          500: '#838383',
          600: '#52525B',
          900: '#18181B',
        },
      },
      skew: {
        24: '24deg',
      },
      fontFamily: {
        inter: ['Inter'],
        jakarta: ['"Plus Jakarta Sans"'],
      },
    },
  },
  plugins: [],
};
