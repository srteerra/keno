import { FaCode, FaGitAlt, FaCss3Alt, FaReact } from "react-icons/fa";
import { SiGnubash } from "react-icons/si";
import { Category } from "@/types/category";
import { MapCategory } from "@/lib/mappers/categories.mapper";

interface Props {
  type: Category;
  onClick?: () => void;
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
    default:
      return <FaCode />;
  }
};

export const CategoryBadge = ({ type, onClick }: Props) => {
  const bg = MapCategory.bgColor(type);
  const color = MapCategory.color(type);

  return (
    <div
      onClick={onClick}
      className={`badge ${onClick && "cursor-pointer transition-all ease-out hover:brightness-150"} border-0 px-6 py-4 font-bold`}
      style={{ backgroundColor: bg, color }}
    >
      <IconCategory type={type} />
      {MapCategory.labels(type)}
    </div>
  );
};
