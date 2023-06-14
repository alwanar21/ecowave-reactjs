import React, { useState, useEffect } from "react";
import {
  useNavigate,
  Link,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import Cookies from "js-cookie";

// Komponen
import Search from "../../../components/Search";
import Pagination from "../../../components/Pagination";
import EmptyData from "../../../components/EmptyData";
import useCrud from "../../../hooks/FetchMockServer";

// Ikon & Gambar
import { EyeIcon } from "@heroicons/react/24/outline";
import Empty from "../../../assets/img/File Not Found.png";

export default function Ulasan() {
  const [search, setSearch] = useState();

  // const swrKey = `/admin/reviews?page=${pageValue}`;
  const swrKey = `/admin/reviews`;

  const { data, isLoading, error } = useCrud(swrKey);
  if (error) return <div>error</div>;
  console.log(data);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const getDataStatus = (e) => {
    console.log(e.target.name);
  };

  // Fungsi untuk pagination
  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changePage = (id) => {
    setCurrentPage(id);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearch(event.target.value);
    }
  };

  useEffect(() => {
    // setItemList(data);
  }, []);

  // Table Setup
  const TALBLE_COLUMNS = [
    { header: "No." },
    { header: "Produk ID" },
    { header: "Nama Produk" },
    { header: "Kategori" },
    { header: "Ulasan Diterima" },
    { header: "Tindakan" },
  ];

  return (
    <div className="flex-row px-5 py-10">
      {/* header */}
      <div className="text-h4 mb-2">Ulasan</div>
      <div className="text-h4 mb-2">{search}</div>
      {/* Search */}
      <div className="mt-7">
        <Search
          id="search-ulasan"
          placeholder="Cari item ID, nama produk"
          // onChange={handleChange}
          handleKeyDown={handleKeyDown}
        />
      </div>
      {/* Table */}
      <div className="overflow-x-auto mt-3">
        <table className="w-full min-w-[1000px] text-p4 text-left text-black mt-4">
          <thead className="bg-green-500 text-white">
            <tr>
              {TALBLE_COLUMNS &&
                TALBLE_COLUMNS.map((head, i) => (
                  <th
                    key={i}
                    className="py-[14px] px-[10px] text-p2 font-medium"
                  >
                    {head.header}
                  </th>
                ))}
            </tr>
          </thead>
          {isLoading ? (
            <tr>loading</tr>
          ) : (
            <tbody>
              {data &&
                data.Status == 200 &&
                data.Reviews.map((review, index) => (
                  <tr key={index} className="even:bg-gray-50 text-p4 text-left">
                    <td className="py-[18px] text-center w-[73px]">
                      {10 * (parseInt(data.Page) - 1) + index + 1}.
                    </td>
                    <td className="py-[18px] px-[10px] min-w-[100px]">
                      {review.ProductId}
                    </td>
                    <td className="py-[18px] px-[10px] min-w-[100px]">
                      {review.Name}
                    </td>
                    <td className="py-[18px] px-[10px] min-w-[100px]">
                      {review.Name}
                    </td>
                    <td className="py-[18px] px-[10px] min-w-[100px] w-[200px]">
                      {review.ReviewQty}
                    </td>
                    <td className="py-[18px] px-[10px] w-[100px] flex space-x-4 justify-center">
                      <Link to={`/admin/ulasan/${review.ProductId}`}>
                        <EyeIcon className="w-5 h-5 text-green-500" />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>

        {/* Empty */}
        {!data && (
          <EmptyData
            image={Empty}
            message="No. Resi yang Anda cari tidak ditemukan"
          />
        )}
      </div>
      {/* Pagination */}
      {data && (
        <Pagination
          currentPage={data.Page}
          totalPage={data.TotalPage}
          onPrev={prevPage}
          onChange={changePage}
          onNext={nextPage}
        />
      )}
    </div>
  );
}
