type Props = {
  rank?: number;
  weapon?: number;
  gap?: number;
  scale?: number;
  hideGolden?: boolean;
};

const STAR_URL = "https://justin163.com/planner/icons/Misc/mysticstar.png";
const AssetWidth = 30;

import "./index.less";

export const Stars: React.FC<Props> = ({
  rank = 1,
  weapon = 0,
  gap = 0,
  scale = 1,
  hideGolden = false,
}) => {
  const starURL = STAR_URL;

  const stars: React.ReactNode[] = [];

  let displayGolden: string | undefined = undefined;
  if (rank >= 5 && weapon > 0 && hideGolden) {
    displayGolden = "none";
  }

  if (weapon <= 0 || hideGolden === false) {
    for (let i = 0; i < rank; i++) {
      stars.push(
        <img
          key={`golden-star-${i + 1}`}
          src={starURL}
          style={{
            zIndex: stars.length,
            display: displayGolden,
            marginLeft: stars.length === 0 ? 0 : gap,
          }}
        />
      );
    }
  }

  if (weapon > 0) {
    for (let i = 0; i < weapon; i++) {
      stars.push(
        <img
          key={`blue-star-${i + 1}`}
          src={starURL}
          style={{
            zIndex: stars.length,
            filter: "grayscale(0) hue-rotate(150deg)",
            marginLeft: stars.length === 0 ? 0 : gap,
          }}
        />
      );
    }
  }

  return (
    <div className="stars" style={{ scale }}>
      {stars}
    </div>
  );
};

export const Star = () => {};
