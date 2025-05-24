// Home.jsx
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUsersList, getUserProfile } from "../api/userApi";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Header from "../components/Header";
import { Spinner } from "react-bootstrap";
import FilterBar from "../components/FilterBar";

const Home = () => {
  // const [users, setUsers] = useState([]);
  const [filterId, setFilterId] = useState("");
  const [filterName, setFilterName] = useState("");
  // const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const token = localStorage.getItem("token");
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersList(token),
  });
  const {
    data: selectedUser,
    isLoading: userLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => getUserProfile(selectedUserId, token),
    enabled: !!selectedUserId, // do not run until triggered
  });


  const handleView = (userId) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };


  const columns = [
    { name: "User ID", selector: (row) => row.useridId, sortable: true },
    { name: "Username", selector: (row) => row.name, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleView(row.useridId)}
          className="text-blue-500 underline flex items-center space-x-1"
        >
          <FaEye className="mr-1" />
          <span>View</span>
        </button>
      ),
    },
  ];

    const filteredUsers = users.filter(
        (user) =>
           
        user.useridId.toString().includes(filterId) &&
        user.name.toLowerCase().includes(filterName.toLowerCase())
    );

  return (
    <>
      <Header title={"User List"} />
      <div className="p-6 bg-gray-50 min-h-screen">
        
        {usersLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          <>
            <FilterBar
              filterId={filterId}
              setFilterId={setFilterId}
              filterName={filterName}
              setFilterName={setFilterName}
            />
            <Table columns={columns} data={filteredUsers} />
          </>
        )}

        {modalOpen && (
          <Modal
            user={selectedUser}
            loading={userLoading}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default Home;
