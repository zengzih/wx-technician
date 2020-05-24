// pages/service-order/index.js
Component({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {label: '全部', prop: 'all'},
            {label: '预约单', prop: 'all'},
            {label: '待服务', prop: 'all'},
            {label: '已完成', prop: 'all'},
        ],
        activeIndex: 0
    },

    methods: {
        handleTabEvent(event) {
            const { index, tab } = event.currentTarget.dataset;
            this.setData({
                activeIndex: index
            });
        }
    }
})