const provinceList = [{
  'area_id': 110000,
  'area_name': '北京市',
  'city_list': [{
    'area_name': '市辖区',
    'area_id': 110100,
    'county_list': [{'area_name': '东城区', 'area_id': 110101}, {'area_name': '海淀区', 'area_id': 110106}]
  }, {
    'area_name': '县',
    'area_id': 110200,
    'county_list': [{'area_name': '密云县', 'area_id': 110228}, {'area_name': '延庆县', 'area_id': 110229}]
  }]
}, {
  'area_id': 440000,
  'area_name': '广东省',
  'city_list': [{
    'area_id': 440300,
    'area_name': '深圳市',
    'county_list': [{'area_name': '罗湖区', 'area_id': 440303}, {'area_name': '福田区', 'area_id': 440304}]
  }, {
    'area_id': 440100,
    'area_name': '广州市',
    'county_list': [{'area_name': '荔湾区', 'area_id': 440103}, {'area_name': '越秀区', 'area_id': 440104}]
  }]
}, {
  'area_id': 310000,
  'area_name': '上海市',
  'city_list': [{
    'area_id': 310100,
    'area_name': '市辖区',
    'county_list': [{'area_id': 310113, 'area_name': '宝山区'}, {'area_id': 310105, 'area_name': '长宁区'}]
  }, {'area_id': 310200, 'area_name': '县', 'county_list': [{'area_name': '崇明县', 'area_id': 310230}]}]
}]
export default provinceList
