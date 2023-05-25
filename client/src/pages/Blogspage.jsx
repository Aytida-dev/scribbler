import { useParams } from "react-router-dom";

export default function Blogspage() {
  const { title } = useParams();

  return (
    <div>
      <h1>{title}</h1>
      <p>Content of the blog with title: {title}</p>
    </div>
  );
}
