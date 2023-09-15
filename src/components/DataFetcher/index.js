import React, { memo } from "react";
import { fetcher } from "src/api/api";
import useSWRImmutable from "swr/immutable";
import Error from "../Error";

const DataFetcher = ({ queryKey, render, initialData, loading = () => {} }) => {
  const { data, error, isValidating, mutate } = useSWRImmutable(
    queryKey,
    () =>
      fetcher(queryKey)
        .then((res) => Promise.resolve(res))
        .catch((err) => Promise.reject(err)),
    { fallbackData: initialData }
  );

  if (isValidating) {
    return loading();
  }

  const onRetryClicked = () => {
    mutate();
  };

  if (error) {
    return <Error onRetryClicked={onRetryClicked} error={error} />;
  }
  return render(data);
};

export default memo(DataFetcher);
