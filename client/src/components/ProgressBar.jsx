const ProgressBar = ({ progress }) => {
  const colors = [
    "rgb(225,214,161)",
    "rgb(255,175,163)",
    "rgb(108,115,148)",
    "rgb(141,181,145)",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div className="w-[200px] h-4 bg-[rgb(216,216,216)] rounded-md overflow-hidden">
      <div
        className="h-4"
        style={{ width: `${progress}%`, backgroundColor: randomColor }}
      ></div>
    </div>
  );
};

export default ProgressBar;
