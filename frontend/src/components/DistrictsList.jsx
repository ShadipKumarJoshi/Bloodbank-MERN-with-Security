import React from "react";

const DistrictList = ({ onChange,label ,dynamicValue}) => {
  const getDistricts = () => {
    // List of districts
    const districts = [
      "Achham",
      "Arghakhanchi",
      "Baglung",
      "Baitadi",
      "Bajhang",
      "Bajura",
      "Banke",
      "Bara",
      "Bardiya",
      "Bhaktapur",
      "Bhojpur",
      "Chitwan",
      "Dadeldhura",
      "Dailekh",
      "Dang",
      "Darchula",
      "Dhading",
      "Dhankuta",
      "Dhanusa",
      "Dholkha",
      "Dolpa",
      "Doti",
      "Gorkha",
      "Gulmi",
      "Humla",
      "Ilam",
      "Jajarkot",
      "Jhapa",
      "Jumla",
      "Kailali",
      "Kalikot",
      "Kanchanpur",
      "Kapilvastu",
      "Kaski",
      "Kathmandu",
      "Kavrepalanchok",
      "Khotang",
      "Lalitpur",
      "Lamjung",
      "Mahottari",
      "Makwanpur",
      "Manang",
      "Morang",
      "Mugu",
      "Mustang",
      "Myagdi",
      "Nawalparasi",
      "Nuwakot",
      "Okhaldhunga",
      "Palpa",
      "Panchthar",
      "Parbat",
      "Parsa",
      "Pyuthan",
      "Ramechhap",
      "Rasuwa",
      "Rautahat",
      "Rolpa",
      "Rukum",
      "Rupandehi",
      "Salyan",
      "Sankhuwasabha",
      "Saptari",
      "Sarlahi",
      "Sindhuli",
      "Sindhupalchok",
      "Siraha",
      "Solukhumbu",
      "Sunsari",
      "Surkhet",
      "Syangja",
      "Tanahu",
      "Taplejung",
      "Terhathum",
      "Udayapur",
    ];

    return districts;
  };
  return (
    <div className="mb-1">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label ? label : "Select District:"}
      </label>
      <div className="relative">
        <select
          onChange={onChange}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring focus:border-gray-300"
        >
          <option value="all">{dynamicValue?? 'All'}</option>
          {getDistricts().map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DistrictList;
