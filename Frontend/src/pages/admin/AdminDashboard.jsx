import Lottie from "lottie-react";
import React from "react";
import { Col, Row } from "reactstrap";
import animation from "../../assets/json/ani.json";
import SiderBar from "../../components/admin/AdminSiderBar/AdminSideBar";
import AdminCommonSection from "../../shared/AdminCommonSection";
import "../../styles/admin/AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard-content">
      <Row>
        <AdminCommonSection />

        <Col lg="4" className="admin__col">
          <SiderBar />
        </Col>
        <Col lg="8">
          <div className="admin__welcome-section">
            <h1 className="admin__welcome-text">Welcome to Your Kirana Admin Dashboard!</h1>
            <p className="admin__welcome-subtext">
              Here, you can manage all aspects of your products, orders, and customers.
            </p>
            <Lottie animationData={animation} className="admin__animation" />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AdminDashboard;
