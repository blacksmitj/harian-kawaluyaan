import { create } from "zustand";

interface IMessage {
  message: string;
}

const useMessage = ({message}: IMessage) => {
  return {message}
}

export default useMessage;
