export function ProgressBar({ current, total }) {
  const progressPercent = (current / total) * 100;

  return (
    <>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className="progress-text">
        Seção <span>{current}</span> de <span>{total}</span>
      </p>
    </>
  );
}