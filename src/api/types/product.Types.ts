/*상품 아이템*/
export type ProductItem = {
  title: string;
  body: string;
};

/*상품 아이템 리스트*/
export interface ProductListItem {
  _id: string;
  product_name: string;
  price: number;
  sales_count: number;
  stock_quantity: number;
  thumbnail: string;
  images: string[];
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  like_user_list: string[];
}

/*상품 디테일 페이지 정보*/
export interface ProductDetail {
  _id: string;
  title: string;
  detail_images: string;
  product: {
    thumbnail: string;
    price: number;
    stock_quantity: number;
  };
  like_user_list: string[];
}

/**새 상품 등록  */
export interface NewProductForm {
  product_name: string;
  price: number;
  stock_quantity: number;
  images: FileList | null;
  thumbnail: FileList | null;
}

// export interface NewProductForm {
//   product_name: string;
//   price: number;
//   stock_quantity: number;
//   images: FileList | null;
// }
