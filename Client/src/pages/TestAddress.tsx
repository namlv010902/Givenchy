import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Province {
  code: string;
  name: string;
}

interface District {
  code: string;
  name: string;
}

interface Commune {
  code: string;
  name: string;
}

const AddressForm: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedCommune, setSelectedCommune] = useState<string>('');

  useEffect(() => {
    axios.get<Province[]>('https://provinces.open-api.vn/api/')
      .then(response => setProvinces(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvinceId = event.target.value;
    setSelectedProvince(selectedProvinceId);
    setSelectedDistrict('');
    setSelectedCommune('');

    axios.get<District[]>(`https://provinces.open-api.vn/api/p/${selectedProvinceId}/d`)
      .then(response => setDistricts(response.data))
      .catch(error => console.error(error));
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrictId = event.target.value;
    setSelectedDistrict(selectedDistrictId);
    setSelectedCommune('');

    axios.get<Commune[]>(`https://provinces.open-api.vn/api/d/${selectedDistrictId}/w`)
      .then(response => setCommunes(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <label>
        Tỉnh/Thành phố:
        <select value={selectedProvince} onChange={handleProvinceChange}>
          <option value="">Chọn tỉnh thành</option>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>{province.name}</option>
          ))}
        </select>
      </label>

      {selectedProvince && (
        <label>
          Huyện/Quận:
          <select value={selectedDistrict} onChange={handleDistrictChange}>
            <option value="">Chọn huyện quận</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>{district.name}</option>
            ))}
          </select>
        </label>
      )}

      {selectedDistrict && (
        <label>
          Xã/Phường:
          <select value={selectedCommune} onChange={(event) => setSelectedCommune(event.target.value)}>
            <option value="">Chọn xã phường</option>
            {communes.map((commune) => (
              <option key={commune.code} value={commune.code}>{commune.name}</option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};

export default AddressForm;
