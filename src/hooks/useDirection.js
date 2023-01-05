import { useRouter } from "next/router";

import { getDir } from "@/utils/locale";

const useDirection = () => {
  const { locale } = useRouter();
  return getDir(locale);
};

export default useDirection;
