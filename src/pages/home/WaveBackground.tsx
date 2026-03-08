const WaveBackground = (): JSX.Element => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        className="absolute top-0 left-0 w-[200%] h-[80%] animate-wave-slow scale-y-[-1]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,234.7C840,245,960,235,1080,213.3C1200,192,1320,160,1380,144L1440,128L1440,320L0,320Z"
          fill="#009de6"
          fillOpacity="0.08"
        />
      </svg>
      <svg
        className="absolute top-0 left-0 w-[200%] h-[70%] animate-wave-mid scale-y-[-1]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L0,320Z"
          fill="#009de6"
          fillOpacity="0.12"
        />
      </svg>
      <svg
        className="absolute top-0 left-0 w-[200%] h-[60%] animate-wave-fast scale-y-[-1]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,256L48,261.3C96,267,192,277,288,272C384,267,480,245,576,234.7C672,224,768,224,864,234.7C960,245,1056,267,1152,261.3C1248,256,1344,224,1392,208L1440,192L1440,320L0,320Z"
          fill="#009de6"
          fillOpacity="0.06"
        />
      </svg>
    </div>
  );
};

export default WaveBackground;
