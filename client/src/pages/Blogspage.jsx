import { Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Blogpreview from "../components/Blogpreview";

export default function Blogspage() {
  const { title, id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    async function init() {
      const res = await fetch(`http://localhost:4000/blog/getblog/${id}`);
      const data = await res.json();
      setBlog(data.blog);
    }
    init();
  }, []);

  const changeDate = new Date(blog.createdAt);
  const year = changeDate.getFullYear();
  const month = changeDate.getMonth() + 1;
  const day = changeDate.getDate();

  const dayOfWeeknumber = changeDate.getDay();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = days[dayOfWeeknumber];
  const newDate = `${day}-${month}-${year} (${dayOfWeek})`;

  return (
    <Skeleton isLoaded={blog.title}>
      <Blogpreview
        title={blog.title}
        content={blog.content}
        createdBy={blog.createdBy}
        newDate={newDate}
      />
    </Skeleton>
  );
}
