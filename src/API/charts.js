import api from './index';

export const get_chart1 = (date) => {
    return api.get('/api/analysis/tablehelper1?date=' + date);
};

export const get_chart2 = (date) => {
    return api.get('/api/analysis/tablehelper2?date=' + date);
}

export const get_chart3 = (date) => {
    return api.get('/api/analysis/tablehelper3?date=' + date);
}

export const get_chart4 = (date) => {
    return api.get('/api/analysis/tablehelper4?date=' + date);
}

export const get_chart5 = (date) => {
    return api.get('/api/analysis/tablehelper5?date=' + date);
}
