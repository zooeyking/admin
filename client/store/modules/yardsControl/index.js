import * as types from '../../mutation-types';


const state = {
  systems: {
    //提示信息显示/隐藏
    infoShow: false,  

    //提示信息类型
    infoType: 1,

    //当前登录用户拥有的权限
    permission: [],

    //校园建筑/校区列表数据
    zoneList: [],

    //校园建筑/单个校区管理  
    currentZone: {},

    //单个校区信息
    currentZoneInfo: [],

    //校园建筑/建筑分类列表数据
    buildingTypeList: [],

    //校园建筑/单个类别
    currentType: {},

    //校园建筑/建筑实体列表数据
    buildingList: [],

    //校园建筑/单个建筑实体
    currentBuilding: {},

    //业务管理/服务分类列表数据
    serviceTypeList: [],

    //业务管理/当前操作服务分类
    currentServiceType: {},

    //业务管理/服务详情列表数据
    serviceInfoList: [],

    //业务管理/当前操作服务详情
    currentserviceInfo: {},

    //业务管理/信息管理列表数据
    informationList: [],

    //业务管理/当前操作信息
    currentInformation: {},

    //业务管理/引导管理列表数据
    guideList: [],

    //业务管理/当前操作引导
    currentGuide: {},

    //引导项关联信息
    linkInfoList: [],

    //引导项未关联信息
    unLinkInfoList: [],

    //业务管理/活动管理列表数据
    partyList: [],

    //业务管理/当前操作活动
    currentParty: {},

    //活动项关联引导
    linkGuideList: [],

    //活动项未关联引导
    unLinkGuideList: [],

    //业务管理/机构分类数据列表
    organizationList: [],

    //业务管理/当前操作机构类别  
    currentOrganization: {},

    //业务管理/校区机构组  
    agencyGroupList: [],

    //业务管理/校区当前机构组
    currentAgencyGroup: {},

    //机构类关联校区
    linkZoneList: [],

    //机构类未关联校区
    unLinkZoneList: [],

    //业务管理/机构管理数据列表
    agencyList: [],

    //业务管理/当前操作机构
    currentAgency: [],

  }
}

const getters = {

  //提示信息显示/隐藏
  messageShow (state) {
    return state.systems.infoShow;
  },  

  //提示信息类型
  messageType (state) {
    return state.systems.infoType;
  },

  //当前登录用户拥有的权限
  userPermission (state) {
    return state.systems.permission;
  },

  //校园建筑/校区列表数据
  zoneData (state) {
    return state.systems.zoneList;
  },

  //校园建筑/当前操作单个校区
  zone (state) {
    return state.systems.currentZone;
  },

  //校区管理单个校区信息
  zoneInfo (state) {
    return state.systems.currentZoneInfo;
  },

  //校园建筑/建筑分类列表数据
  buildingTypeData (state) {
    return state.systems.buildingTypeList;
  },

  //校园建筑/单个建筑类别
  buildingType (state) {
    return state.systems.currentType;
  },

  //校园建筑/建筑实体列表数据
  buildingData (state) {
    return state.systems.buildingList;
  },

  //校园建筑/单个建筑实体
  building(state) {
    return state.systems.currentBuilding;
  },

  //业务管理/服务分类列表数据
  serviceTypeData(state) {
    return state.systems.serviceTypeList;
  },

  //业务管理/单个服务分类
  serviceType(state) {
    return state.systems.currentServiceType;
  },

  //业务管理/服务详情列表数据
  serviceInfoData(state) {
    return state.systems.serviceInfoList;
  },

  //业务管理/单个服务详情
  serviceInfo(state) {
    return state.systems.currentServiceInfo;
  },

  //业务管理/服务详情列表数据
  informationData(state) {
    return state.systems.informationList;
  },

  //业务管理/单个服务详情
  information(state) {
    return state.systems.currentInformation;
  },

  //业务管理/引导管理列表数据
  guideData(state) {
    return state.systems.guideList;
  },

  //业务管理/单个引导
  guide(state) {
    return state.systems.currentGuide;
  },

  //业务管理/引导管理列表数据
  partyData(state) {
    return state.systems.partyList;
  },

  //业务管理/单个引导
  party(state) {
    return state.systems.currentParty;
  },

  //业务管理/机构分类列表数据
  organizationData(state) {
    return state.systems.organizationList;
  },

  //业务管理/当前操作机构类
  organization(state) {
    return state.systems.currentOrganization;
  },

  //业务管理/校区机构组
  agencyGroupData(state) {
    return state.systems.agencyGroupList;
  },

  //业务管理/校区当前机构组
  agencyGroup(state) {
    return state.systems.currentAgencyGroup;
  },

  //单个机构类关联校区
  linkZoneData(state) {
    return state.systems.linkZoneList;
  },

  //单个机构类未关联校区
  unLinkZoneData(state) {
    return state.systems.unLinkZoneList;
  },

  //单个引导项关联信息
  linkInfoData(state) {
    return state.systems.linkInfoList;
  },

  //单个引导项未关联信息
  unLinkInfoData(state) {
    return state.systems.unLinkInfoList;
  },

  //单个活动关联引导项
  linkGuideData(state) {
    return state.systems.linkGuideList;
  },

  //单个活动未关联引导项
  unLinkGuideData(state) {
    return state.systems.unLinkGuideList;
  },

  //业务管理/机构管理列表数据
  agencyData (state) {
    return state.systems.agencyList;
  },

  //业务管理/当前操作机构
  agency (state) {
    return state.systems.currentAgency;
  }

}

const mutations = {
  //设置提示信息显示/隐藏
  [types.SET_MESSAGESHOW] (state, flag) {
    state.systems.infoShow = flag;
  },

  //设置提示信息类型
  [types.SET_MESSAGETYPE] (state, type) {
    state.systems.infoType = type;
  },

  //设置当前登录用户拥有的权限
  [types.SET_PERMISSION] (state, list) {
    state.systems.permission = list;
  },

  //设置校区数据列表
  [types.SET_ZONELIST] (state, list) {
    state.systems.zoneList = list;
  },

  //设置单个操作校区
  [types.SET_CURRENTZONE] (state, zone) {
    state.systems.currentZone = zone;
  },

  //设置单个校区信息
  [types.SET_CURRENTZONEINFO] (state, info) {
    state.systems.currentZoneInfo = info;
  },

  //设置校区建筑类别列表
  [types.SET_BUILDINGTYPELIST] (state, list) {
    state.systems.buildingTypeList = list;
  },

  //设置单个建筑类别
  [types.SET_CURRENTTYPE] (state, type) {
    state.systems.currentType = type;
  },

  //设置建筑实体列表
  [types.SET_BUILDINGLIST] (state, list) {
    state.systems.buildingList = list;
  },

  //设置单个建筑实体
  [types.SET_CURRENTBUILDING] (state, building) {
    state.systems.currentBuilding = building;
  },

  //设置服务分类数据列表
  [types.SET_SERVICETYPELIST] (state, list) {
    state.systems.serviceTypeList = list;
  },

  //设置当前所操作服务分类
  [types.SET_CURRENTSERVICETYPE] (state, type) {
    state.systems.currentServiceType = type;
  },

  //设置服务详情数据列表
  [types.SET_SERVICEINFOLIST] (state, list) {
    state.systems.serviceInfoList = list;
  },

  //设置当前所操作服务详情
  [types.SET_CURRENTSERVICEINFO] (state, info) {
    state.systems.currentServiceInfo = info;
  },

  //设置信息管理数据列表
  [types.SET_INFORMATIONLIST] (state, list) {
    state.systems.informationList = list;
  },

  //设置当前所操作信息
  [types.SET_CURRENTINFORMATION] (state, info) {
    state.systems.currentInformation = info;
  },

  //设置引导管理数据列表
  [types.SET_GUIDELIST] (state, list) {
    state.systems.guideList = list;
  },

  //设置当前所操作引导
  [types.SET_CURRENTGUIDE] (state, guide) {
    state.systems.currentGuide = guide;
  },

  //设置活动管理数据列表
  [types.SET_PARTYLIST] (state, list) {
    state.systems.partyList = list;
  },

  //设置当前所操作活动
  [types.SET_CURRENTPARTY] (state, party) {
    state.systems.currentParty = party;
  },

  //设置机构类别数据列表
  [types.SET_ORGANIZATIONLIST] (state, list) {
    state.systems.organizationList = list;
  },

  //设置单个机构类别
  [types.SET_CURRENTORGANIZATION] (state, organization) {
    state.systems.currentOrganization = organization;
  },

  //设置校区机构组数据列表
  [types.SET_AGENCYGROUPLIST] (state, list) {
    state.systems.agencyGroupList = list;
  },

  //设置校区当前机构组
  [types.SET_CURRENTAGENCYGROUP] (state, agencyGroup) {
    state.systems.currentAgencyGroup = agencyGroup;
  },

  //设置单个机构类别所关联的校区
  [types.SET_LINKZONELIST] (state, list) {
    state.systems.linkZoneList = list;
  },

  //设置单个机构类别未关联的校区
  [types.SET_UNLINKZONELIST] (state, list) {
    state.systems.unLinkZoneList = list;
  },

  //设置单个引导所关联的信息
  [types.SET_LINKINFOLIST] (state, list) {
    state.systems.linkInfoList = list;
  },

  //设置单个引导未关联的信息
  [types.SET_UNLINKINFOLIST] (state, list) {
    state.systems.unLinkInfoList = list;
  },

  //设置单个活动所关联的引导
  [types.SET_LINKGUIDELIST] (state, list) {
    state.systems.linkGuideList = list;
  },

  //设置单个活动未关联的引导
  [types.SET_UNLINKGUIDELIST] (state, list) {
    state.systems.unLinkGuideList = list;
  },

  //设置机构管理数据列表
  [types.SET_AGENCYLIST] (state, list) {
    state.systems.agencyList = list;
  },

  //设置单个管理机构
  [types.SET_CURRENTAGENCY] (state, agency) {
    state.systems.currentAgency = agency;
  }
  
}

export default {
  state,
  mutations,
  getters
}
