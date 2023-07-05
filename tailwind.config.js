/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    fontFamily: {
      sans: ['Cairo', 'sans-serif'],
    },
    extend: {
      borderRadius: {
        '1/2': '50%'
      },
      colors: {
        'primary': '#dc834e',
        'primaryhover': '#9E5D36',
        'secondary': '#202F59',
        'secondaryhover': '#121D39',
        "globaltext": "#9ca2b1",
        "global": "#999999",
        'background-1': '#F7F7F7',
        'background-2': '#EEEEEE',
      },
      boxShadow: {
        base: '0 0 30px rgb(0 0 0 / 5%)',
        full: ' 0 0 30px 0 rgb(6 30 98 / 8%)',
      },
      width: {
        '1px': '1px',
        '2px': '2px'
      },
      height: {
        '100': '400px'
      },
      gridTemplateRows: {
        'auto-1fr': 'auto 1fr',
      },
      gridTemplateColumns: {
        'auto-1fr': 'auto 1fr',
      },
      backgroundImage: {

        'bannerLeft': "url('assets/banner/h1_bg-3.jpg')",
        'bannerRight': "url('assets/banner/h1_bg-1.jpg')",
        'banner1': "url('assets/banner/h1_banner-1.jpg')",
        'banner2': "url('assets/banner/h1_banner-2.jpg')",
        'banner3': "url('assets/banner/h1_banner-3.jpg')",
        'content': "url('assets/banner/h1_shape-4.png')",
        'bannerDestination': "url('assets/banner/breadcrumb-bg.jpg')",
        // 'des1': "url('assets/background/destination-01.jpg')",
        // 'des2': "url('assets/background/destination-02.jpg')",
        // 'des3': "url('assets/background/destination-03.jpg')",
        // 'des4': "url('assets/background/destination-04.jpg')",
        // 'des5': "url('assets/background/destination-05.jpg')",
        // 'des6': "url('assets/background/destination-06.jpg')",
        // 'des7': "url('assets/background/destination-07.jpg')",
        // 'des8': "url('assets/background/destination-08.jpg')",
      },

      backgroundSize: {
        'full': '100%',
        '1.5': '150%'
      },
      minHeight: {
        'banner': 'calc(100vh - 96px)'
      },
      fontFamily: {
        'dancing': ['Dancing Script', 'sans-serif']
      },
      animation: {
        display: 'fadeIn 0.3s linear, heightScaleOn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        heightScaleOn: {
          '0%': { maxHeight: '0' },
          '100%': {
            maxHeight: '100%',
          },
        },

      }

    },
  },
  plugins: [],
}
