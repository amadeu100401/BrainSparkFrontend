import {
    FaEye,
    FaEyeSlash,
  } from "react-icons/fa";

export default function InputGroup({ icon, type, show, toggleShow, ...props }) {
  const isPassword = type === "password";

  return (
    <div className="flex items-center bg-white/10 rounded px-3 relative">
      <div className="text-white/70 pr-3">{icon}</div>
      <input
        {...props}
        type={isPassword && show ? "text" : type}
        className="flex-1 bg-transparent text-white placeholder-white/70 focus:placeholder-transparent py-2 outline-none pr-8"
      />
      {isPassword && (
        <div
          onClick={toggleShow}
          className="absolute right-3 text-white/70 cursor-pointer"
        >
          {show ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
    </div>
  );
}