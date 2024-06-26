import { Image, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface SearchResult {
  id: number;
  title: string;
  image: string;
}

interface SearchProps {
  data: { results: SearchResult[] };
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ data, value, setValue }) => {
  // console.log(data);

  return (
    <div>
      <Input
        style={{
          width: "550px",
          padding: "10px",
          position: "relative",
          border: "2px solid #1677ff",
          borderRadius: "0px",
        }}
        type="text"
        placeholder="Search"
        onChange={(e) => setValue(e.target.value)}
      />
      {value.length > 2 && (
        <ul
          style={{
            top: 157,
            border: "2px solid #1677ff ",
            padding: "15px",
            zIndex: 10,
            position: "absolute",
            width: "550px",
            listStyle: "none",
            borderTop: "none",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(5px)",
          }}
        >
          {data?.results?.map((item) => (
            <Link key={item?.id} to={`/app/edit-category/${item?.id}`}>
              <li
                key={item?.id}
                style={{
                  marginBottom: "15px",
                  padding: "5px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Image width={80} src={item?.image} alt="" />
                <p style={{ color: "black" }}>{item?.title}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
