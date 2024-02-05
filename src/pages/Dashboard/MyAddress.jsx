import { PATHS } from "@/constants/path";
import useQuery from "@/hooks/useQuery";
import { customerService } from "@/services/customerService";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyAddress = () => {
  const { profile } = useSelector((state) => state.auth);
  const { data: provinceData } = useQuery(
    () => customerService.getDataProvinceById(profile?.province),
    [profile?.province]
  );

  const { data: districtData } = useQuery(
    () => customerService.getDataDistrictById(profile?.district),
    [profile?.district]
  );
  const { data: wardData } = useQuery(
    () => customerService.getDataWardById(profile?.ward),
    [profile?.ward]
  );

  const address = `${profile?.street}, ${wardData?.name}, ${districtData?.name}, ${provinceData?.name}`;

  return (
    <div className="tab-pane fade active show">
      <p>
        The following addresses will be used on the checkout page by default.
      </p>
      <div className="row">
        <div className="col-lg-6">
          <div className="card card-dashboard">
            <div className="card-body">
              <h3 className="card-title">Billing Address</h3>
              <p>
                <strong>Fullname:</strong> {profile?.firstName || ""} <br />
                <strong>Email:</strong> {profile?.email || ""} <br />
                <strong>Phone number:</strong> {profile?.phone || ""} <br />
                <br />
                <Link to={PATHS.DASHBOARD.MY_ACCOUNT}>
                  Edit <i className="icon-edit" />
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card card-dashboard">
            <div className="card-body">
              <h3 className="card-title">Shipping Address</h3>
              <p>
                {address || ""} <br />
                <br />
                <Link to={PATHS.DASHBOARD.MY_ACCOUNT}>
                  Edit <i className="icon-edit" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAddress;
