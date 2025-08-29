"use client";

import FormOfEditAddress from "@/app/components/page/payment/FormOfEditAddress";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetAddress, useDeleteAddress } from "@/hooks/queries/useAddress";

import useArticleDetail from "@/hooks/queries/useArticleDetail";
import { Address } from "@/api/types/address.type";
import useAuthCheck from "@/hooks/query/useAuthCheck";

export default function PaymentPage() {
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [addressOfEdit, setAddressesOfEdit] = useState<Partial<Address>>({});
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectAdressFromRadio, setSelectAdressFromRadio] = useState<Address>();

  const searchParams = useSearchParams();
  const articleId = searchParams.get("productId");
  const router = useRouter();

  const [productPrice, setProductPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const totalPrice = productPrice + shippingCost;

  const { data: userData } = useAuthCheck();
  const { data: dataOfAddress = [] } = useGetAddress();

  const deleteMutation = useDeleteAddress();

  const { data: articleData } = useArticleDetail(articleId);
  console.log(articleId);
  useEffect(() => {
    if (articleData?.product?.price) {
      setProductPrice(articleData.product.price);
    } else {
      setProductPrice(0);
    }
  }, [articleData]);

  const defaultAddress = dataOfAddress.find((a) => a.is_default);

  const handleDeleteAddress = (_id: string) => {
    deleteMutation.mutate(_id);
  };

  const handleEditAddress = (address: Address) => {
    setAddressesOfEdit(address);
    setStep(3);
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6">주문/결제</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">구매자 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">이름</label>
            <p>{userData?.username}</p>
          </div>
          <div>
            <label className="block mb-2">이메일</label>
            <p>{userData?.email}</p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">배송지 정보</h2>

        {selectedAddress ? (
          <div className="border p-4 rounded bg-gray-50">
            <p>받는 사람: {selectedAddress.receiver_name}</p>
            <p>
              주소: {selectedAddress.main_address}{" "}
              {selectedAddress.detail_address}
            </p>
            <p>연락처: {selectedAddress.receiver_phone}</p>
            <p>우편번호: {selectedAddress.zip_code}</p>
            <p>메모: {selectedAddress.shipping_memo}</p>
          </div>
        ) : defaultAddress ? (
          <div className="border p-4 rounded bg-gray-50">
            <p>받는 사람: {defaultAddress.receiver_name}</p>
            <p>
              주소: {defaultAddress.main_address}{" "}
              {defaultAddress.detail_address}
            </p>
            <p>연락처: {defaultAddress.receiver_phone}</p>
            <p>우편번호: {defaultAddress.zip_code}</p>
            <p>메모: {defaultAddress.shipping_memo}</p>
          </div>
        ) : (
          <p>기본 배송지가 없습니다.</p>
        )}

        <button
          onClick={() => setModal(true)}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          배송지 관리
        </button>
      </section>

      {modal && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center">
          <div className="bg-white w-[550px] h-[600px] p-8 rounded-md overflow-y-scroll">
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">배송지 조회</h2>
                {dataOfAddress?.map((address: Address) => (
                  <div
                    key={address.id}
                    className="border p-4 mb-4 rounded relative"
                  >
                    <input
                      type="radio"
                      checked={selectAdressFromRadio?._id === address._id}
                      onChange={() => setSelectAdressFromRadio(address)}
                      className="absolute right-4 top-4"
                    />
                    <p>받는 사람: {address.receiver_name}</p>
                    <p>
                      주소: {address.main_address} {address.detail_address}
                    </p>
                    <p>연락처: {address.receiver_phone}</p>
                    <p>우편번호: {address.zip_code}</p>
                    <p>메모: {address.shipping_memo}</p>
                    <button
                      onClick={() => handleEditAddress(address)}
                      className="text-blue-600 mr-2"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address._id)}
                      className="text-red-600"
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    if (selectAdressFromRadio) {
                      handleSelectAddress(selectAdressFromRadio);
                      setModal(false);
                    }
                  }}
                  className="w-full mt-2 bg-gray-600 text-white py-2 rounded"
                >
                  배송지 선택
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-2 bg-gray-500 text-white py-2 rounded"
                >
                  배송지 추가
                </button>
                <button
                  onClick={() => setModal(false)}
                  className="w-full mt-2 bg-gray-400 text-white py-2 rounded"
                >
                  닫기
                </button>
              </div>
            )}

            {step === 2 && <FormOfEditAddress setStep={setStep} />}
            {step === 3 && (
              <FormOfEditAddress
                setStep={setStep}
                addressOfEdit={addressOfEdit}
              />
            )}
          </div>
        </div>
      )}

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">결제 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700">
              총 상품 가격: ₩{productPrice?.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              배송비: ₩{shippingCost.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-700 font-bold">
              총 결제 금액: ₩{totalPrice.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      <button
        onClick={() => router.push("/payment/product_id=1")}
        className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
      >
        결제하기
      </button>
    </div>
  );
}
