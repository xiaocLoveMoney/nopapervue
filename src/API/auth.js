import api from './index';

// 登录
export const login = (data) => {
    return api.post('/api/auth/login', data);
};

// 用户信息
export const info = () => {
    return api.get('/api/auth/info');
}

// 获取考勤记录
export const attendancelist = (pages) => {
    return api.get('/api/attendance/attendancelist?page=' + pages);
}

export const get_chart1 = () => {
    return api.get('/api/analysis/chart1');
}

export const get_chart2 = () => {
    return api.get('/api/analysis/chart2');
}

export const get_students = () => {
    return api.get('/api/attendance/getstudent');
}

export const get_todayAttendance = () => {
    return api.get('/api/attendance/todayattendancelist');
}

export const student_createLeaves = (data) => {
    return api.post('/api/leaves/studentcreateleaves', data)
}

export const upload_attendance = (data) => {
    return api.post('/api/attendance/addattendance', data);
}

export const getleaveserror = () => {
    return api.get('/api/analysis/getleaveserror');
}

export const teacheract = (data) => {
    return api.post('/api/attendance/teacheract', data);
}

export const leavelist = (data) => {
    return api.get('/api/leaves/leaveslist?page=' + data);
}

export const leaveslistfromdate = (date) => {
    return api.get('/api/leaves/leaveslistfromdate?date=' + date);
}

export const leavestextmaker = (data) => {
    return api.get(`/api/textmaker/makerLeavesContentFromResion?resion=${data.reason}&type=${data.type}`);
}

export const get_announcementlist = () => {
  return api.get('/api/announcement/announcementlist')
}

export const logout_token = () => {
    return api.get('/api/auth/logout')
}

export const leaveserrorfromuserid = (user_id) => {
  return api.get('/api/analysis/leaveserrorfromuserid?user_id=' + user_id);
}

export const leaveserrorfromclassordepartment = () => {
    return api.get('/api/analysis/leaveserrorfromclassordepartment');
}

export const checkleaves = (data) => {
    return api.put('/api/leaves/checkleaves', data);
}

export const slider = () => {
  return api.get('/api/other/swiperlist');
}

export const announcementlist = () => {
    return api.get('/api/announcement/announcementlist');
}