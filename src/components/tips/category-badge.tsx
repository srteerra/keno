import { FaCode, FaGitAlt, FaCss3Alt, FaReact, FaDocker } from "react-icons/fa";
import {
  SiGnubash,
  SiTypescript,
  SiJavascript,
  SiPostgresql,
} from "react-icons/si";
import { VscDebugAlt } from "react-icons/vsc";
import { Category } from "@/types/category";
import { MapCategory } from "@/lib/mappers/categories.mapper";

interface Props {
  type: Category;
  onClick?: () => void;
  "data-testid"?: string;
}

const IconCategory = ({ type }: Props) => {
  switch (type) {
    case Category.GIT_COMMAND:
      return <FaGitAlt />;
    case Category.EDITOR:
      return <FaCode />;
    case Category.TERMINAL:
      return <SiGnubash />;
    case Category.REACT:
      return <FaReact />;
    case Category.CSS:
      return <FaCss3Alt />;
    case Category.TYPESCRIPT:
      return <SiTypescript />;
    case Category.JAVASCRIPT:
      return <SiJavascript />;
    case Category.DOCKER:
      return <FaDocker />;
    case Category.DEVTOOLS:
      return <VscDebugAlt />;
    case Category.SQL:
      return <SiPostgresql />;
    default:
      return <FaCode />;
  }
};

export const CategoryBadge = ({
  type,
  onClick,
  "data-testid": testId,
}: Props) => {
  const bg = MapCategory.bgColor(type);
  const color = MapCategory.color(type);

  return (
    <div
      onClick={onClick}
      data-testid={testId}
      className={`badge ${onClick && "cursor-pointer transition-all ease-out hover:brightness-150"} border-0 px-6 py-4 font-bold`}
      style={{ backgroundColor: bg, color }}
    >
      <IconCategory type={type} />
      {MapCategory.labels(type)}
    </div>
  );
};
