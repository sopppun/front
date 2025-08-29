import { ProductDetail } from "./product.Types";

/**위시리스트 */
export interface WishlistProduct {
  _id: string;
  title: string;
  product: {
    price: number;
    stock_quantity: number;
  };
  detail_images: string[] | string;
  like_user_list: string[];
}

/**장바구니 */
export interface CartPeoduct {
  userId: string;
  article_list: {
    _id: string;
    article: string;
    quantity: number;
    product?: ProductDetail;
  }[];
}
