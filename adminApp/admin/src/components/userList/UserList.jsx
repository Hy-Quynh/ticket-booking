import React from "react";
import { useEffect, useState } from "react";
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { connect } from "react-redux";
import { fetchAdmins, deleteAdmin } from "../../action";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import Notification from "../notification/Notification";
import moment from "moment";

function UserList(props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "fullName",
            headerName: "Full name",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 170,
        },
        { field: "phoneNumber", headerName: "Phone Number", width: 170 },
        { field: "dateCreated", headerName: "Date Created", width: 140 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/admins/" + params.row._id}>
                            <button className="UserListEdit">Edit</button>
                        </Link>
                    </>
                );
            },
        },
    ];
    useEffect(() => {
        props.fetchAdmins();
    }, [props.fetchAdmins]);

    function onDeleteAdmin(admin) {
        setSelectedAdmin(admin);
        setShowModal(true);
    }

    function handleDelete() {
        props.deleteAdmin(selectedAdmin._id);
        setShowModal(false);
    }

    const actions = (
        <>
            <button
                onClick={() => handleDelete()}
                className="ui negative button"
            >
                Confirm
            </button>
            <button onClick={() => setShowModal(false)} className="ui button">
                Back
            </button>
        </>
    );

    return (
        <>
            <div className="userList">
                <div className="userListTitleContainer">
                    <h1 className="userListTitle">Admins</h1>
                    <Link to="/admins/newAdmin">
                        <button className="userAddButton">Create</button>
                    </Link>
                </div>
                <DataGrid
                    rows={props.admins}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                />
                {showModal ? (
                    <Modal
                        redirect="/admins"
                        actions={actions}
                        header="Warning"
                        content={`Do you want to delete ${selectedAdmin.fullName}`}
                    />
                ) : null}
            </div>
            <Notification notify={props.alert} />
        </>
    );
}

const mapStateToProps = (state, ownProps) => {
    const admins = Object.values(state.admins);
    admins.forEach((admin, index) => {
        admin.id = index + 1;
        if (admin?.dateCreated) {
            admin.dateCreated = moment(admin?.dateCreated).format("MM/DD/YYYY");
        }
    });
    return {
        admins: admins,
        alert: state.alert,
    };
};

export default connect(mapStateToProps, { fetchAdmins, deleteAdmin })(UserList);
