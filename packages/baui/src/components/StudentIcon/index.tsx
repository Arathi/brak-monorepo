import { useEffect, useMemo, useState } from "react";
import { Student as Metadata } from "@brak/schale-api";
import { api } from "../../utils/schale-db";

import "./index.less";

type Student = {
  id: number;
};

type Props = {
  metadata: Metadata | number;
  student?: Student;
  name?: string;
  onClick: () => void;
};

export const StudentIcon: React.FC<Props> = (props) => {
  const [metadata, setMetadata] = useState<Metadata>();

  useEffect(() => {
    loadMetadata();
  }, [props.metadata]);

  async function loadMetadata() {
    if (typeof props.metadata === "number") {
      const id = props.metadata;
      const metadata = await api.getStudent<Metadata>(id);
      if (metadata !== null) {
        setMetadata(metadata);
      }
    } else {
      setMetadata(metadata);
    }
  }

  const id = useMemo(() => {
    return metadata?.Id ?? 0;
  }, [metadata]);

  const name = useMemo(() => {
    if (props.name !== undefined) return props.name;
    if (metadata !== undefined) return metadata.Name;
    return "未知";
  }, [metadata]);

  const nameSize = useMemo(() => {
    const minSize = 1;
    const minLength = 3;
    const maxSize = 2;
    const maxLength = 10;

    let size = 2;
    if (name.length <= minLength) {
      size = maxSize;
    } else if (name.length >= maxLength) {
      size = minSize;
    } else {
      size = maxSize - (name.length - minLength) * (maxSize - minSize);
    }
    return `${size.toFixed(2)}em`;
  }, [name]);

  const collectionSrc = useMemo(() => {
    return api.getStudentAsset("collection", id);
  }, [id]);

  const attackSrc = api.getAsset("images", "ui", "Type_Attack_s.png");
  const armorSrc = api.getAsset("images", "ui", "Type_Defense_s.png");

  return (
    <button className="student-icon">
      <div className="container">
        <img className="avatar" alt="student" src={collectionSrc} />
        <div className="information">
          <div className="attack-armor">
            <div className="attack-type">
              <img className="attack-icon" src={attackSrc} />
            </div>
            <div className="armor-type">
              <img className="armor-icon" src={armorSrc} />
            </div>
          </div>
          <div className="name" style={{ fontSize: nameSize }}>
            {name}
          </div>
        </div>
      </div>
    </button>
  );
};
