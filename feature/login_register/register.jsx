import React, {useState} from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [errors, setErrors] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^01[0-9]{8,9}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if(!emailRegrex.test(email))
    {
      newErrors.email = "올바른 이메일 주소를 입력하세요.";
    }
    if(!password.trim())
    {
      newErrors.password = "비밀번호를 입력하세요.";
    }
    if(!name.trim())
    {
      newErrors.name = "이름을 입력하세요.";
    }
    if(!phoneRegex.test(phone))
    {
      newErrors.phone = "올바른 전화번호를 입력하세요. (예: 01012345678)";
    }
    setErrors(newErrors);

    //에러 없으면 승인하기
    if(Object.keys(newErrors).leng === 0)
    {
      alert("회원가입 성공!"); //api 연동
    }

  };

  return (
     <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        {/* 로고 */}
         <div className="mb-6 text-left">
          <h1 className="text-2xl font-bold text-blue-900">
            <span className="text-black">Law</span>
            <span className="text-blue-600">Bot</span>
          </h1>
        </div>

        {/* 제목 */}
        <h2 className="mb-6 text-center text-xl font-semibold">회원가입</h2>

        {/* 폼 */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              placeholder="전화번호"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <input
            type="text"
            placeholder="가입 목적 (선택)"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-black p-3 text-white hover:bg-gray-800"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
  )
}