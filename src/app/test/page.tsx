"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Product {
  id: string;
  content: string;
}

export default function PostView() {
  const [post, setPost] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const response = await fetch(
      "http://localhost:3000/api/articles?limit=10&page=1",
      {
        credentials: "include",
      }
    );
    const result = await response.json();
    return result.data;
  };
  fetchProducts();


  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load products.</p>;
  }
  return (
    <div>
      <h1>게시글 조회</h1>

      <ul>
        {post.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
}
