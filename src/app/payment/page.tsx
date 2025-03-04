"use client"; // Next.js 클라이언트 컴포넌트임을 명시

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import FormOfEditAddress from "../components/page/payment/FormOfEditAddress";

// 배송지 타입 정의 (주소 관련 정보를 담는 타입)
type Address = {
  id: number;
  receiver_name: string;
  receiver_phone: string;
  main_address: string;
  detail_address: string;
  zip_code: string;
  shipping_memo: string;
  is_default: boolean;
  _id: number;
};

// 결제 페이지 컴포넌트
export default function PaymentPage() {
  // react-hook-form을 사용하여 폼 제어 및 검증 처리
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Address>();

  // 구매자 정보를 위한 상태 (이름, 이메일, 비밀번호)
  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  // URL의 쿼리 파라미터를 가져오기 위한 훅
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  // 페이지 이동을 위한 Next.js 라우터
  const router = useRouter();

  // 배송지 목록을 관리하기 위한 상태
  const [addresses, setAddresses] = useState<Address[]>([]);

  // 상품 가격과 배송비를 상태로 관리
  const [productPrice, setProductPrice] = useState("");
  const [shippingCost, setShippingCost] = useState("");

  // 배송지 추가/수정 모달의 열림 상태 관리
  const [modal, setModal] = useState(false);

  // 수정 시 선택된 배송지 정보를 담는 상태
  const [addressOfEdit, setAddressesOfEdit] = useState({});

  // 현재 모달에서 진행 중인 단계 (조회, 추가, 수정 등)
  const [step, setStep] = useState<number>(1);

  // 수정할 배송지 정보를 담기 위한 상태
  const [editingAddress, setEditingAddress] = useState<
    Address | null | undefined
  >(null);

  // 사용자가 선택한 배송지 정보를 담는 상태
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // 총 결제 금액 (상품가격 + 배송비)
  const totalPrice =
    (parseInt(productPrice) || 0) + (parseInt(shippingCost) || 0);

  // 라디오 버튼으로 선택한 배송지 상태 관리
  const [selectAdressFromRadio, setSelectAdressFromRadio] = useState<Address>();

  // 회원 인증 정보 조회 함수 (서버 API 호출)
  const authCheck = async () => {
    const response = await fetch("http://localhost:3000/api/users/auth-check", {
      credentials: "include",
    });
    const result = await response.json();
    return result.data;
  };

  // react-query를 사용하여 회원 정보를 조회
  const { data } = useQuery({
    queryKey: ["get"],
    queryFn: authCheck,
  });

  // 새로운 배송지 추가 API 호출 함수 (POST)
  const postAddress = async (data: Address) => {
    const response = await fetch("http://localhost:3000/api/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.data;
  };

  // 배송지 목록 조회 API 호출 함수 (GET)
  const getAddress = async () => {
    const response = await fetch("http://localhost:3000/api/address", {
      credentials: "include",
    });
    const result = await response.json();
    console.log(result, "data");
    return result.data;
  };

  // react-query를 사용하여 배송지 목록을 조회
  const { data: dataOfAddress } = useQuery({
    queryKey: ["address"],
    queryFn: getAddress,
  });

  console.log(dataOfAddress, "asd");

  // 조회된 배송지 목록 중 기본 배송지를 찾음
  const filterDataOfAddress = dataOfAddress?.find((item: any) => {
    return item.is_default;
  });
  console.log(filterDataOfAddress, "filter");

  // 배송지 추가를 위한 mutation 설정
  const Mutation = useMutation({
    mutationFn: (data) => postAddress(data as any),
  });

  // 배송지 추가 폼 제출 시 호출되는 함수
  const onSubmit = (data: any) => {
    const {
      receiver_name,
      main_address,
      detail_address,
      zip_code,
      receiver_phone,
      shipping_memo,
      is_default,
    } = data;
    const finalData = {
      receiver_name,
      main_address,
      detail_address,
      zip_code,
      receiver_phone,
      shipping_memo,
      is_default,
    };

    //@ts-ignore
    Mutation.mutate(finalData, {
      onSuccess: (newAddress) => {
        console.log("성공", newAddress);
        alert("입력완료");

        // 새로운 배송지 정보를 기존 배열에 추가
        setAddresses((prevAddresses) => [...(prevAddresses || []), newAddress]);

        // 배송지 추가 후 1단계(배송지 조회)로 돌아감
        setStep(1);
      },
      onError: (err) => {
        console.log(err, "실패");
        alert("입력실패");
      },
    });
  };

  // react-query의 queryClient 인스턴스 (캐시 무효화 등에 사용)
  const queryClient = useQueryClient();

  // 배송지 삭제를 위한 mutation 설정 (DELETE 요청)
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`http://localhost:3000/api/address/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
    },
    onSuccess: () => {
      // 삭제 성공 시 배송지 목록을 새로고침
      queryClient.invalidateQueries({ queryKey: ["address"] });
      alert("주소가 삭제되었습니다.");
    },
    onError: (err) => {
      console.log(err, "삭제 실패");
      alert("삭제에 실패했습니다.");
    },
  });

  // 삭제 버튼 클릭 시 호출되는 함수
  const handleDeleteAddress = (id: number) => {
    mutate(id);
  };

  // 배송지 수정 API 호출 함수 (PUT)
  const updateAddress = async ({
    id,
    updatedData,
  }: {
    id: number;
    updatedData: Address;
  }) => {
    const response = await fetch(`http://localhost:3000/api/address/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedData),
    });
    const result = await response.json();
    return result.data;
  };

  // 배송지 수정을 위한 mutation 설정
  const updateMutation = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      alert("주소가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
    onError: () => {
      alert("수정에 실패하였습니다.");
    },
  });

  console.log(addressOfEdit, "저장");

  // 배송지 목록이 로드되면, 폼의 초기 값을 설정 (수정 시 활용)
  useEffect(() => {
    if (dataOfAddress) {
      setValue("receiver_name", dataOfAddress?.receiver_name);
      setValue("main_address", dataOfAddress.main_address);
      setValue("detail_address", dataOfAddress.detail_address);
      setValue("receiver_phone", dataOfAddress.receiver_phone);
      setValue("shipping_memo", dataOfAddress.shipping_memo);
      setValue("zip_code", dataOfAddress.zip_code);
    }
  }, [dataOfAddress, setValue]);

  // 배송지 수정 버튼 클릭 시 호출되는 함수
  const handleEditAddress = (address: Address) => {
    // 수정할 배송지 데이터를 상태에 저장 (현재는 dataOfAddress 전체가 넘어가지만,
    // 보통은 해당 address 하나만 넘겨줘야 함)
    setEditingAddress(dataOfAddress);
    // 수정 모달 단계로 전환
    setStep(3);
  };

  // 배송지 선택 시 호출되는 함수 (사용자가 선택한 배송지를 저장)
  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  console.log(addresses, "addresses");
  console.log(selectedAddress, "selected");
  console.log(selectAdressFromRadio, "setSelectAdressFromRadio");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">주문/결제</h1>

      {/* 구매자 정보 섹션 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">구매자 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">이름</label>
            <p>{data?.username}</p>
          </div>
          <div>
            <label className="block mb-2">이메일</label>
            <p>{data?.email}</p>
          </div>
        </div>
      </section>

      {/* 배송지 정보 섹션 */}
      <section className="mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">받는 사람 정보</h2>
          <div className="p-4 border rounded flex items-center justify-between">
            <div>
              <p>
                받는 사람:{" "}
                {selectedAddress
                  ? selectedAddress?.receiver_name
                  : filterDataOfAddress?.receiver_name}
              </p>
              <p>
                기본 주소:{" "}
                {selectedAddress
                  ? selectedAddress?.main_address
                  : filterDataOfAddress?.main_address}
              </p>
              <p>
                상세 주소:{" "}
                {selectedAddress
                  ? selectedAddress?.detail_address
                  : filterDataOfAddress?.detail_address}
              </p>
              <p>
                우편번호:{" "}
                {selectedAddress
                  ? selectedAddress?.zip_code
                  : filterDataOfAddress?.zip_code}
              </p>
              <p>
                연락처:{" "}
                {selectedAddress
                  ? selectedAddress?.receiver_phone
                  : filterDataOfAddress?.receiver_phone}
              </p>
              <p>
                배송 메모:{" "}
                {selectedAddress
                  ? selectedAddress.shipping_memo
                  : filterDataOfAddress?.shipping_memo}
              </p>
            </div>
          </div>
        </div>
        {/* 배송지 추가 모달 오픈 버튼 */}
        <button
          onClick={() => setModal(true)}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          배송지 추가
        </button>
      </section>

      {/* 배송지 조회/추가/수정 모달 */}
      {modal && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center">
          <div className="bg-white w-[550px] h-[600PX]  p-8 rounded-md overflow-y-scroll ">
            {step === 1 && (
              <div className="h-auto">
                <h2 className="text-xl font-semibold mb-4">배송지 조회</h2>
                {dataOfAddress?.map((address: Address) => {
                  console.log(address);
                  return (
                    <div
                      key={address?.id}
                      className="border p-4 mb-4 rounded relative"
                    >
                      {/* 라디오 버튼을 통해 배송지 선택 */}
                      <input
                        type="radio"
                        checked={selectAdressFromRadio?._id === address._id}
                        className="block w-[50px] mb-4 p-2 border rounded absolute right-0"
                        onChange={() => {
                          setSelectAdressFromRadio(address);
                        }}
                      />
                      <p>받는 사람: {address?.receiver_name}</p>
                      <p>기본 주소: {address?.main_address}</p>
                      <p>상세 주소: {address?.detail_address}</p>
                      <p>우편번호: {address?.zip_code}</p>
                      <p>연락처: {address?.receiver_phone}</p>
                      <p>배송 메모: {address?.shipping_memo}</p>
                      <p> {address?.is_default}</p>
                      {/* 배송지 수정 버튼 */}
                      <button
                        onClick={() => {
                          handleEditAddress(dataOfAddress);
                          setAddressesOfEdit(address);
                        }}
                      >
                        수정
                      </button>
                      {/* 배송지 삭제 버튼 */}
                      <button onClick={() => handleDeleteAddress(address?._id)}>
                        삭제
                      </button>
                    </div>
                  );
                })}
                {/* 선택한 배송지를 확정하는 버튼 */}
                <button
                  onClick={() => {
                    if (selectAdressFromRadio) {
                      handleSelectAddress(selectAdressFromRadio);
                    }
                    setModal(false);
                  }}
                  className="w-full mt-2 bg-gray-500 text-white py-2 my-2 rounded"
                >
                  배송지 선택
                </button>
                {/* 배송지 추가 폼으로 전환하는 버튼 */}
                <button
                  className="w-full mt-2  bg-gray-500 text-white py-2 my-2 rounded"
                  onClick={() => setStep(2)}
                >
                  배송지추가
                </button>
                {/* 모달 닫기 버튼 */}
                <button
                  onClick={() => setModal(false)}
                  className="w-full mt-2 bg-gray-500 text-white py-2 rounded"
                >
                  닫기
                </button>
              </div>
            )}

            {/* step이 2인 경우: 배송지 추가 폼 렌더링 */}
            {step === 2 && <FormOfEditAddress setStep={setStep} />}
            {/* step이 3인 경우: 배송지 수정 폼 렌더링 (수정할 배송지 정보를 props로 전달) */}
            {step === 3 && (
              <FormOfEditAddress
                setStep={setStep}
                addressOfEdit={addressOfEdit}
              />
            )}
          </div>
        </div>
      )}

      {/* 결제 정보 섹션 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">결제 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700">
              총 상품 가격: ₩{productPrice.toLocaleString()}
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

      {/* 결제 진행 버튼 (클릭 시 결제 페이지로 이동) */}
      <button
        onClick={() => {
          router.push("/payment/product_id=1");
        }}
        className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
      >
        결제하기
      </button>
    </div>
  );
}
