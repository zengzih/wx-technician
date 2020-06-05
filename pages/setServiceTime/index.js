import Dialog from '../../@vant/weapp/dist/dialog/dialog';

const app = getApp().globalData;
Page({
    data: {
        weekData: [],
        defaultDate: [],
        minDate: new Date().getTime(),
        maxDate: new Date().getTime(),
        init_week: true,
        year: '',
        month: '',
        day: '',
        checked: 1,
        minHour: 0,
        maxHour: 23,
        dateType: '',
        dateSelectShow: false,
        currentDate: {},
        isEdit: false
    },

    handleSave() {
        app.store.dispatch('updateWeek', this.data.currentDate).then(res=> {
            if (res.code == 200) {
                return Notify({ type: 'success', message: res.message });
            }
            Notify({ type: 'warning', message: res.message });
        });
    },

    editWorkTime(event) {
        const { type } = event.currentTarget.dataset;
        this.setData({ dateType: type, dateSelectShow: true })
    },

    calenderSelect(event) {
        const {detail} = event;
        const date = new Date(detail)
        const currentDate = this.getInterfaceDateItem(date.getDay());
        console.log(currentDate)
        this.setData({currentDate});
    },

    getInterfaceDateItem(day) {
        const {weekData} = this.data;
        let currentDate = {}
        weekData.forEach(week => {
            if (week.weekDay == day) {
                currentDate = week
            }
        });
        return currentDate;
    },

    dateSelectConfirm(event) {
        const { dateType, currentDate } = this.data;
        const { detail } = event;
        if (dateType == 'start') {
            currentDate.workStarTime = detail
        }
        if (dateType == 'end') {
            currentDate.workEndTime = detail
        }
        console.log(currentDate)
        this.setData({ currentDate, dateSelectShow: false, isEdit: true })
    },

    switchChange(event) {
        const {detail} = event;
        this.setData({'currentDate.workType': detail});
    },

    onLoad() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const defaultDate = new Date(year, month, day).getTime()
        this.setData({year, month, day, defaultDate})
        this.getWeekList();
    },

    initWeekList() {
        return new Promise((resolve) => {
            app.store.dispatch('initWeek').then(res => {
                this.setData({init_week: false})
                Dialog.alert({
                    message: '为了您能高效的工作，建议您设置7日内每日工作状态以及每日工作时间。\n如未设置，平台将以系统默认工作时间为准。\n默认工作时间：近7天每日为24小时工作制度。',
                })
                resolve();
            })
        })
    },

    getWeekList() {
        app.store.dispatch('getWeekList').then(res => {
            if (!res.length && this.data.init_week) {
                return this.initWeekList().then(() => {
                    this.getWeekList()
                })
            }
            const {defaultDate, year, month, day} = this.data;
            let max_day = 1;
            let min_day;
            let currentDate = res[0];
            res.forEach(elt => {
                const {weekDay} = elt;
                if (!min_day) {
                    min_day = weekDay
                }
                if (weekDay == day) {
                    currentDate = elt;
                }
                if (weekDay > max_day) {
                    max_day = weekDay
                }
                if (weekDay < min_day) {
                    min_day = weekDay
                }
                // const parseTime = new Date(year, month, +weekDay).getTime()
                // defaultDate.push(parseTime)
            });
            console.log(currentDate)
            this.setData({weekData: res, currentDate });
            this.setMaxMinDate(max_day, min_day)
        })
    },

    setMaxMinDate(max_day, min_day) {
        const {year, month} = this.data;
        const minDate = new Date(year, month, min_day).getTime();
        const maxDate = new Date(year, month, max_day).getTime();
        this.setData({minDate, maxDate});
    },

    onClose() {
        this.setData({show: false});
    },
    formatDate(date) {
        date = new Date(date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(event) {
        this.setData({
            show: false,
            date: this.formatDate(event.detail),
        });
    },
});