import qs from "query-string";

interface formUrlQueryProps {
  params: string;
  key: string;
  value: string;
}

interface removeKeysFromQueryProps {
  params: string;
  keysToRemove: string[];
}

export const formUrlQuery = ({ params, key, value }: formUrlQueryProps) => {
  const queryString = qs.parse(params);

  queryString[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: removeKeysFromQueryProps) => {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  );
};
