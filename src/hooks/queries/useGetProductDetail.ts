const fetchDeatil = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) return null;

  const result = await response.json();

  return result;
};
