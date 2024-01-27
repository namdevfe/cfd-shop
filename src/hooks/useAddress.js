import { customerService } from "@/services/customerService";
import useQuery from "./useQuery";
import { useState } from "react";

const useAddress = (defaultValue) => {
  const [provinceId, setProvinceId] = useState(defaultValue?.provinceId);
  const [districtId, setDistrictId] = useState(defaultValue?.districtId);
  const [wardId, setWardId] = useState(defaultValue?.wardId);

  const { data: provincesData } = useQuery(customerService.getDataProvince);
  const { data: districtsData } = useQuery(
    () => provinceId && customerService.getDataDistrict(provinceId),
    [provinceId]
  );
  const { data: wardsData } = useQuery(
    () => districtId && customerService.getDataWard(districtId),
    [districtId]
  );

  const handleProvinceChange = (changedId) => {
    setProvinceId(changedId);
    setDistrictId(undefined);
    setWardId(undefined);
  };

  const handleDistrictChange = (changedId) => {
    setDistrictId(changedId);
    setWardId(undefined);
  };

  const handleWardChange = (changedId) => {
    setWardId(changedId);
  };

  return {
    provinces: provincesData?.provinces?.map((province) => {
      return {
        value: province.id,
        label: province.name,
      };
    }),
    districts: districtsData?.districts?.map((district) => {
      return {
        value: district.id,
        label: district.name,
      };
    }),
    wards: wardsData?.wards?.map((ward) => {
      return {
        value: ward.id,
        label: ward.name,
      };
    }),
    provinceId,
    districtId,
    wardId,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
  };
};

export default useAddress;
