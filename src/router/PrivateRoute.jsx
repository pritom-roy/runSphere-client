import { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <Loading />

    if (user) {
        return children;
    }

    return <Navigate state={location} to="/login" />

};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PrivateRoute;